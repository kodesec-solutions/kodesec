import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blogs");

export function estimateReadTime(content: string) {
  const words = content ? content.trim().split(/\s+/).length : 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// Get all posts (for summaries and lists)
export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      const readTime = estimateReadTime(content);

      return {
        title: data.title || "Untitled",
        date: data.date || "No date",
        excerpt: data.excerpt || "",
        slug: data.slug || fileName.replace(".mdx", ""),
        author: data.author || "KodeSec Research Team",
        featured: data.featured === true,
        image: data.image || null,
        readingTime: readTime,
      };
    });

  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();

    if (Number.isNaN(da) && Number.isNaN(db)) return 0;
    if (Number.isNaN(da)) return 1;
    if (Number.isNaN(db)) return -1;

    return db - da;
  });

  return posts;
}

// Get single post by slug (returns raw MDX content)
export async function getPostBySlug(slug: string) {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => {
    const fullPath = path.join(postsDirectory, name);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return data.slug === slug || name.replace(/\.mdx$/, "") === slug;
  });

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const readTime = estimateReadTime(content);

  return {
    title: data.title || "Untitled",
    date: data.date || "No date",
    content: content, // Raw MDX content to be processed by next-mdx-remote
    author: data.author || "KodeSec Research Team",
    excerpt: data.excerpt || "",
    image: data.image || null,
    slug: data.slug || fileName.replace(".mdx", ""),
    readingTime: readTime,
  };
}
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blogs");

// Get all posts
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      title: data.title || "Untitled",
      date: data.date || "No date",
      excerpt: data.excerpt || "",
      slug: data.slug || fileName.replace(".md", ""),
      author: data.author || "Unknown",
      featured: data.featured === true,
      image: data.image || null,
    };
  });

  // Sort posts by date (newest first) when dates are present to make ordering deterministic.
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

// Get single post
export async function getPostBySlug(slug: string) {
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => {
    const fullPath = path.join(postsDirectory, name);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return data.slug === slug || name.replace(/\.md$/, "") === slug;
  });

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(gfm).use(html).process(content);

  return {
    title: data.title,
    date: data.date,
    contentHtml: processedContent.toString(),
    author: data.author || "Unknown",
    excerpt: data.excerpt || "",
    image: data.image || null,
    slug: data.slug || fileName.replace(".md", ""),
  };
}
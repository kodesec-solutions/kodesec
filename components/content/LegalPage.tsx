import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/content/Prose";
import { getPage } from "@/lib/content/loaders";
import { renderMarkdown } from "@/lib/content/markdown";
import { formatDate } from "@/lib/format";

export async function LegalPage({ slug }: { slug: string }) {
  const page = getPage(slug);
  if (!page) notFound();
  const { html } = await renderMarkdown(page.body);
  return (
    <>
      <PageHero crumbs={[{ name: page.data.title }]} eyebrow="Legal" title={page.data.title} lead={`Last updated ${formatDate(page.data.updated)}`} />
      <div className="container-kd max-w-3xl pb-24">
        <Prose html={html} />
      </div>
    </>
  );
}

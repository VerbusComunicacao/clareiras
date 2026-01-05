import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | Clareiras",
  description: "Explore todas as reflexões, histórias e pensamentos do Clareiras.",
};

export default async function Page() {
  const client = createClient();
  
  // Fetch all posts ordered by date
  const posts = await client.getAllByType("blog_post" as any, {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  // Extract unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <div className="pt-10 pb-20">
      <Bounded as="section" yPadding="base" className="text-center">
        <div className="max-w-3xl mx-auto mb-4">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            Clareiras
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-earth-900">
            Blog
          </h1>
        </div>
      </Bounded>

      <Bounded as="section" yPadding="base">
        <BlogList allPosts={posts} allTags={allTags} />
      </Bounded>
    </div>
  );
}

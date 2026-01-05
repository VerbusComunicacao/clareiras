import type { Metadata } from "next";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { asText } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";

export const metadata: Metadata = {
  title: "Clareiras - Blog de Escrita",
  description: "Um espaço para reflexões, histórias e pensamentos",
};

export default async function Page() {
  const client = createClient();
  const posts = await client.getAllByType("blog_post" as any, {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <>
      {/* Hero Section */}
      <Bounded as="section" yPadding="lg" className="text-center">
        <div className="animate-fade-in-up">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            style={{ color: "var(--color-earth-900)" }}
          >
            Clareiras
          </h1>
          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-earth-700)" }}
          >
            Um espaço para reflexões, histórias e pensamentos
          </p>
        </div>
      </Bounded>

      {/* Posts Grid */}
      <Bounded as="section" yPadding="base">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post: any, index) => (
              <article
                key={post.id}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PrismicNextLink
                  document={post}
                  className="block h-full rounded-lg overflow-hidden border hover:shadow-lg blog-card"
                  style={{
                    backgroundColor: "var(--color-earth-50)",
                    borderColor: "rgba(232, 223, 208, 0.5)",
                  }}
                >
                  {post.data.featured_image?.url && (
                    <div
                      className="relative aspect-video overflow-hidden"
                      style={{ backgroundColor: "var(--color-earth-200)" }}
                    >
                      <PrismicNextImage
                        field={post.data.featured_image}
                        className="object-cover w-full h-full blog-card-image"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 blog-card-title">
                      {asText(post.data.title)}
                    </h2>
                    {post.data.excerpt && (
                      <div
                        className="mb-4 line-clamp-3"
                        style={{ color: "var(--color-earth-700)" }}
                      >
                        <PrismicRichText field={post.data.excerpt} />
                      </div>
                    )}
                    <div
                      className="flex items-center justify-between text-sm"
                      style={{ color: "var(--color-earth-600)" }}
                    >
                      {post.data.author && (
                        <span className="font-medium">{post.data.author}</span>
                      )}
                      {post.data.date && (
                        <time dateTime={post.data.date}>
                          {new Date(post.data.date).toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      )}
                    </div>
                  </div>
                </PrismicNextLink>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p
              className="text-lg"
              style={{ color: "var(--color-earth-700)" }}
            >
              Nenhum post publicado ainda. Volte em breve!
            </p>
          </div>
        )}
      </Bounded>
    </>
  );
}

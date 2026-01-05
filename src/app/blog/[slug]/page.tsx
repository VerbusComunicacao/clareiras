import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";

type Params = { slug: string };

async function getPostBySlug(slug: string): Promise<any> {
  const client = createClient();
  
  // Buscar por UID (que agora funciona como slug)
  return client
    .getByUID("blog_post" as any, slug)
    .catch(() => null) as any;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug) as any;

  if (!post) notFound();

  return {
    title: `${asText(post.data.title)} | Clareiras`,
    description: post.data.meta_description || asText(post.data.excerpt),
    openGraph: {
      title: post.data.meta_title || asText(post.data.title),
      description: post.data.meta_description || asText(post.data.excerpt),
      images: post.data.meta_image?.url
        ? [{ url: post.data.meta_image.url }]
        : post.data.featured_image?.url
          ? [{ url: post.data.featured_image.url }]
          : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug) as any;

  if (!post) notFound();

  return (
    <>
      <Bounded as="article" yPadding="lg">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Link de voltar */}
          <PrismicNextLink
            href="/"
            className="inline-flex items-center mb-6 group"
            style={{ color: "var(--color-earth-700)" }}
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-500 ease-in-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao blog
          </PrismicNextLink>

          {/* Título */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight"
            style={{ color: "var(--color-earth-900)" }}
          >
            {asText(post.data.title)}
          </h1>

          {/* Meta informações */}
          <div
            className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b"
            style={{
              color: "var(--color-earth-700)",
              borderColor: "rgba(232, 223, 208, 0.5)",
            }}
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

          {/* Imagem destacada */}
          {post.data.featured_image?.url && (
            <div
              className="relative aspect-video md:aspect-[21/9] mb-8 rounded-lg overflow-hidden"
              style={{ backgroundColor: "var(--color-earth-200)" }}
            >
              <PrismicNextImage
                field={post.data.featured_image}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          )}

          {/* Conteúdo do Post */}
          <div className="max-w-3xl mx-auto prose prose-lg animate-fade-in blog-prose">
            <PrismicRichText field={post.data.content} />
          </div>
        </div>
      </Bounded>

      {/* Footer do Post */}
      <Bounded as="footer" yPadding="sm">
        <div
          className="max-w-4xl mx-auto text-center pt-6 border-t"
          style={{ borderColor: "rgba(232, 223, 208, 0.5)" }}
        >
          <PrismicNextLink
            href="/"
            className="inline-flex items-center group"
            style={{ color: "var(--color-earth-700)" }}
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-500 ease-in-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao blog
          </PrismicNextLink>
        </div>
      </Bounded>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType("blog_post" as any);

  return posts.map((post: any) => {
    // Usar UID como slug
    return { slug: post.uid };
  });
}


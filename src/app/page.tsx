import type { Metadata } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { PostCard } from "@/components/PostCard";
import { PostCarousel } from "@/components/PostCarousel";
import { AboutPreview } from "@/components/AboutPreview";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Clareiras - Blog de Escrita",
  description: "Um espaço para reflexões, histórias e pensamentos",
};

export default async function Page() {
  const client = createClient();
  
  // Fetch favorites for carousel
  const favoritePosts = await client
    .getAllByType("blog_post", {
      filters: [prismic.filter.at("my.blog_post.favoritar", true)],
      orderings: [
        { field: "document.first_publication_date", direction: "desc" },
      ],
    })
    .catch(() => []); // Fallback if no favorites

  // Fetch 3 latest posts
  const latestPosts = await client.getByType("blog_post" as any, {
    pageSize: 3,
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <div className="pt-10 pb-20">
      {/* Search-like Header / Intro */}
      <Bounded as="section" yPadding="base" className="text-center pt-0">
        <div className="max-w-3xl mx-auto mb-12">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-earth-900"
          >
            Clareiras
          </h1>
          <p
            className="text-xl md:text-2xl text-earth-700 leading-relaxed font-serif italic"
          >
          Um espaço para reflexões, histórias e pensamentos
          </p>
        </div>
      </Bounded>

      {/* Hero Carousel */}
      {favoritePosts.length > 0 && <PostCarousel posts={favoritePosts} />}

      {/* About Section Preview */}
      <AboutPreview />

      {/* Latest Posts Grid */}
      <Bounded as="section" yPadding="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">
              Conteúdo Recente
            </span>
            <h2 className="text-4xl font-bold text-earth-900">
              Últimas Publicações
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-earth-700 font-bold hover:text-accent transition-colors underline decoration-earth-200 underline-offset-8 decoration-2 hover:decoration-accent"
          >
            Ver todo o blog <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {latestPosts.results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {latestPosts.results.map((post: any, index: number) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-earth-700">
              Nenhum post publicado ainda. Volte em breve!
            </p>
          </div>
        )}
      </Bounded>
    </div>
  );
}

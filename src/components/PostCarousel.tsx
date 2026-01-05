"use client";

import { useState, useEffect } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { asText } from "@prismicio/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PostCarousel({ posts }: { posts: any[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (posts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [posts.length]);

  if (!posts.length) return null;

  const next = () => setCurrent((prev) => (prev + 1) % posts.length);
  const prev = () => setCurrent((prev) => (prev - 1 + posts.length) % posts.length);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 mb-20">
      <div className="relative aspect-[21/9] md:aspect-[21/7] rounded-[2rem] overflow-hidden shadow-2xl glass-effect border border-white/20">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"
            }`}
          >
            {post.data.featured_image?.url && (
              <PrismicNextImage
                field={post.data.featured_image}
                className="object-cover w-full h-full"
                priority={index === 0}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-earth-950/80 via-earth-950/40 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4 w-fit animate-fade-in">
                Destaque
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                {asText(post.data.title)}
              </h2>
              <PrismicNextLink
                document={post}
                className="w-fit px-8 py-3 bg-white text-earth-900 rounded-full font-bold transition-all hover:bg-accent hover:text-white hover:scale-105 active:scale-95 shadow-lg"
              >
                Ler Postagem
              </PrismicNextLink>
            </div>
          </div>
        ))}

        {posts.length > 1 && (
          <>
            <div className="absolute bottom-8 right-8 flex gap-3">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-earth-900 transition-all"
                aria-label="Anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-earth-900 transition-all"
                aria-label="Próximo"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {posts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

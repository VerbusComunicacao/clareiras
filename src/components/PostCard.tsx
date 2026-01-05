import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { asText } from "@prismicio/client";

export function PostCard({ post, index }: { post: any; index: number }) {
  return (
    <article
      className="group animate-fade-in-up h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <PrismicNextLink
        document={post}
        className="flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          backgroundColor: "var(--color-earth-50)",
          borderColor: "rgba(232, 223, 208, 0.5)",
        }}
      >
        {post.data.featured_image?.url && (
          <div
            className="relative aspect-[16/10] overflow-hidden"
            style={{ backgroundColor: "var(--color-earth-200)" }}
          >
            <PrismicNextImage
              field={post.data.featured_image}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-earth-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        <div className="p-8 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag: string) => (
              <span 
                key={tag}
                className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-earth-200 text-earth-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4 leading-tight group-hover:text-accent transition-colors">
            {asText(post.data.title)}
          </h2>
          {post.data.excerpt && (
            <div
              className="mb-6 line-clamp-3 text-sm leading-relaxed"
              style={{ color: "var(--color-earth-700)" }}
            >
              <PrismicRichText field={post.data.excerpt} />
            </div>
          )}
          <div
            className="mt-auto pt-6 border-t flex items-center justify-between text-xs font-medium uppercase tracking-wider"
            style={{ 
              color: "var(--color-earth-600)",
              borderColor: "rgba(232, 223, 208, 0.3)"
            }}
          >
            {post.data.author && (
              <span>{post.data.author}</span>
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
  );
}

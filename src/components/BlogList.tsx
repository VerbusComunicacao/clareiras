"use client";

import { useState, useMemo } from "react";
import { PostCard } from "./PostCard";

export function BlogList({ allPosts, allTags }: { allPosts: any[]; allTags: string[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return allPosts;
    return allPosts.filter((post) => post.tags.includes(selectedTag));
  }, [allPosts, selectedTag]);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-6 py-2 rounded-full font-bold transition-all border ${
            selectedTag === null
              ? "bg-earth-900 text-white border-earth-900 shadow-lg scale-105"
              : "bg-white text-earth-700 border-earth-200 hover:border-accent hover:text-accent"
          }`}
        >
          Todos
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-6 py-2 rounded-full font-bold transition-all border ${
              selectedTag === tag
                ? "bg-earth-900 text-white border-earth-900 shadow-lg scale-105"
                : "bg-white text-earth-700 border-earth-200 hover:border-accent hover:text-accent"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-8 text-center">
        <p className="text-earth-600 text-sm font-medium uppercase tracking-widest">
          {filteredPosts.length} {filteredPosts.length === 1 ? "publicação encontrada" : "publicações encontradas"}
        </p>
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-earth-100/50 rounded-3xl border border-dashed border-earth-300">
          <p className="text-lg text-earth-700">
            Nenhum post encontrado nesta categoria.
          </p>
        </div>
      )}
    </div>
  );
}

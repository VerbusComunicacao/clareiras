import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { VideoCard } from "@/components/VideoCard";

export const metadata: Metadata = {
  title: "Vídeos | Clareiras",
  description: "Acompanhe o Clareiras BlogCast no YouTube.",
};

export default async function Page() {
  const client = createClient();
  
  // Fetch all video posts ordered by date
  // Note: 'video_post' type might not be in types yet, so we use string
  const videos = await client.getAllByType("video_post" as any, {
    orderings: [
      { field: "my.video_post.date", direction: "desc" },
    ],
  }).catch(() => []); // Fallback if type doesn't exist yet/nothing found

  return (
    <div className="pt-10 pb-20">
      <Bounded as="section" yPadding="base" className="text-center">
        <div className="max-w-3xl mx-auto mb-4">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            YouTube
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-earth-900">
            BlogCast
          </h1>
          <p className="text-lg text-earth-700 max-w-2xl mx-auto">
            Inscreva-se no canal para não perder nada.
          </p>
          <a 
            href="https://www.youtube.com/@ClareirasBlogCast" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-8 px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="text-white">Acessar Canal no YouTube</span>
          </a>
        </div>
      </Bounded>

      <Bounded as="section" yPadding="base">
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {videos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-earth-100 rounded-3xl border border-earth-200">
            <p className="text-lg text-earth-700">
              Estamos preparando nossos primeiros vídeos. <br />
              Em breve aparecerão aqui!
            </p>
          </div>
        )}
      </Bounded>
    </div>
  );
}

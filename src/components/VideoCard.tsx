import { asText } from "@prismicio/client";

export function VideoCard({ video, index }: { video: any; index: number }) {
  const { title, youtube_url, date } = video.data;
  
  // Extract YouTube ID from embed HTML or URL if possible
  const embedHtml = youtube_url?.html;

  return (
    <article
      className="group animate-fade-in-up h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          backgroundColor: "var(--color-earth-50)",
          borderColor: "rgba(232, 223, 208, 0.5)",
        }}
      >
        <div className="relative aspect-video overflow-hidden bg-earth-200">
          {embedHtml ? (
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: embedHtml.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"') }} 
            />
          ) : (
            <div className="flex items-center justify-center h-full text-earth-400 italic text-sm">
                Vídeo não disponível
            </div>
          )}
        </div>
        
        <div className="p-8 flex flex-col flex-1">
          <h2 className="text-2xl font-bold mb-4 leading-tight group-hover:text-accent transition-colors">
            {asText(title)}
          </h2>
          
          <div
            className="mt-auto pt-6 border-t flex items-center justify-between text-xs font-medium uppercase tracking-wider"
            style={{ 
              color: "var(--color-earth-600)",
              borderColor: "rgba(232, 223, 208, 0.3)"
            }}
          >
            {date && (
              <time dateTime={date}>
                {new Date(date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            <a 
              href={youtube_url?.embed_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Ver no YouTube
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

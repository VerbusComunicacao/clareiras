import { Bounded } from "./Bounded";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <Bounded as="section" yPadding="lg" className="bg-earth-100/50">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-earth-900">
          Apresentação 
        </h2>
        <div className="text-lg md:text-xl text-earth-700 leading-relaxed mb-10 space-y-4">
          <p>
           “Somos todos diálogo”. A frase de Novalis é do mesmo gênero da que encontramos em “Tecendo a Manhã”, poema de João Cabral de Melo Neto: “Um galo sozinho não tece uma manhã: ele precisa sempre de outros galos. De um que apanhe esse grito que ele e o lance a outro (...)”.
          </p>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-8 py-4 bg-earth-800 rounded-full font-bold transition-all hover:bg-earth-900 hover:gap-3 shadow-md"
        >
          <span className="text-white">Ler mais</span> <ArrowRight size={20} className="text-white" />
        </Link>
      </div>
    </Bounded>
  );
}

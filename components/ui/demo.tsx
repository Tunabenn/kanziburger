'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Flame, Cpu, Sparkles, ChevronRight, Thermometer } from "lucide-react";

export function SplineSceneBasic() {
  return (
    <Card className="w-full min-h-[560px] lg:h-[620px] bg-black border-zinc-800/80 relative overflow-hidden rounded-2xl shadow-2xl">
      <div className="flex flex-col lg:flex-row h-full relative z-10">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 lg:p-14 relative z-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest w-fit mb-6">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Mutfak Mühendisliği v4.2 // 850°C Sear</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-500">
            Cıss Burger
          </h1>

          <p className="mt-3 text-lg md:text-xl font-medium text-orange-400/90 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 shrink-0" />
            <span>Teknoloji Konseptli Yeni Nesil Gurme Burgerci</span>
          </p>

          <p className="mt-4 text-neutral-300 max-w-xl leading-relaxed text-sm md:text-base">
            Geleneksel odun ateşi lezzetini milimetrik ısı sensörleri, kızılötesi mühürleme
            teknolojisi ve moleküler sos reçeteleriyle birleştirdik. %100 dry-aged dana
            kaburga burgerlerimizle gerçek lezzetin en ileri versiyonunu keşfedin.
          </p>

          {/* Navigation Links (Showcase Only - No E-Commerce) */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#burgerler"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-sm hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20"
            >
              <span>Burger Koleksiyonunu İncele</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#teknoloji"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-neutral-200 font-medium text-sm hover:bg-zinc-800 hover:border-zinc-600 transition-all"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Nasıl Pişiriyoruz?</span>
            </a>
          </div>

          {/* Tech Telemetry Indicators */}
          <div className="mt-10 pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                <span>IZGARA ISISI</span>
              </div>
              <p className="text-xl font-bold text-white font-mono mt-0.5">235°C</p>
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-400">DRY-AGED SÜRESİ</div>
              <p className="text-xl font-bold text-white font-mono mt-0.5">28 GÜN</p>
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-400">ET KALİTESİ</div>
              <p className="text-xl font-bold text-orange-400 font-mono mt-0.5">%100 DANA</p>
            </div>
          </div>
        </div>

        {/* Right content - Interactive 3D Spline Scene */}
        <div className="flex-1 relative min-h-[340px] lg:min-h-full">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
          <div className="pointer-events-none absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-zinc-400">
            BURGER ÜZERİNDE SCROLL YAPIN // KATMANLARI HAVAYA KALDIRIN
          </div>
        </div>
      </div>
    </Card>
  )
}

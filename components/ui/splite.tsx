'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SplineSceneProps {
  scene: string
  className?: string
}

const BURGER_LAYERS = [
  {
    id: 'top-bun',
    src: '/assets/layer-1-top-bun.png',
    code: '01 // ÜST BRIOCHE',
    name: 'Susamlı Artizan Brioche',
    spec: 'Tereyağlı & Altın Fırınlama',
    closedY: -66,
    explodedY: -195,
    zIndex: 60,
    scale: 1.0,
    side: 'left',
  },
  {
    id: 'tomato',
    src: '/assets/layer-2-tomato.png',
    code: '02 // AROMA KATMANI',
    name: 'Domates & Kırmızı Soğan',
    spec: 'Taze Dilim & Karamelize Halkalar',
    closedY: -34,
    explodedY: -116,
    zIndex: 50,
    scale: 0.96,
    side: 'right',
  },
  {
    id: 'cheese',
    src: '/assets/layer-3-cheese.png',
    code: '03 // TERMAL ERİME',
    name: 'Yıllanmış İngiliz Cheddar',
    spec: '65°C Tam Erime & Akışkan Doku',
    closedY: -10,
    explodedY: -38,
    zIndex: 45,
    scale: 0.98,
    side: 'left',
  },
  {
    id: 'patty',
    src: '/assets/layer-4-patty.png',
    code: '04 // ANA ÇEKİRDEK',
    name: '180g Dry-Aged Dana Köfte',
    spec: '235°C Döküm Plakada Maillard Mühür',
    closedY: 14,
    explodedY: 40,
    zIndex: 40,
    scale: 1.0,
    side: 'right',
  },
  {
    id: 'lettuce',
    src: '/assets/layer-5-lettuce.png',
    code: '05 // TAZELİK & SOS',
    name: 'Kıvırcık Marul & Cıss Sos',
    spec: 'Tütsülü Özel Protokol Emülsiyonu',
    closedY: 42,
    explodedY: 118,
    zIndex: 30,
    scale: 1.02,
    side: 'left',
  },
  {
    id: 'bottom-bun',
    src: '/assets/layer-6-bottom-bun.png',
    code: '06 // ALT TABAN',
    name: 'Karamelize Alt Brioche',
    spec: 'Izgarada Tereyağıyla Mühürlenmiş',
    closedY: 68,
    explodedY: 194,
    zIndex: 20,
    scale: 0.98,
    side: 'right',
  },
]

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])
  const calloutRefs = useRef<Array<HTMLDivElement | null>>([])
  const kanziRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)

  const [loadedCount, setLoadedCount] = useState(0)
  const [uiProgress, setUiProgress] = useState(0)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let reqId = 0
    const startTime = performance.now()

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const delta = e.deltaY * 0.0018
      targetProgressRef.current = Math.max(
        0,
        Math.min(1, targetProgressRef.current + delta)
      )
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const normX = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1
      const normY = -(((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1)
      targetX = Math.max(-1, Math.min(1, normX))
      targetY = Math.max(-1, Math.min(1, normY))
    }

    const handleMouseLeave = () => {
      targetX = 0
      targetY = 0
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    let lastReportedProgress = -1

    const animate = (now: number) => {
      reqId = requestAnimationFrame(animate)
      const elapsed = (now - startTime) * 0.001

      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * 0.1
      const p = currentProgressRef.current

      if (Math.abs(p - lastReportedProgress) > 0.01) {
        lastReportedProgress = p
        setUiProgress(p)
      }

      curX += (targetX - curX) * 0.09
      curY += (targetY - curY) * 0.09

      const floatOffset = Math.sin(elapsed * 2.2) * 4

      BURGER_LAYERS.forEach((layer, idx) => {
        const el = layerRefs.current[idx]
        if (!el) return

        const y = layer.closedY + (layer.explodedY - layer.closedY) * p
        const waveY = Math.sin(elapsed * 2.4 - idx * 0.55) * (2.5 + p * 4.5)
        const layerDepthFactor = (2.5 - idx) * (4 + p * 8)
        const tx = curX * (10 + Math.abs(2.5 - idx) * 4)
        const ty = y + waveY + floatOffset * (1 - p * 0.4) - curY * 8

        const rotX =
          -curY * (10 + p * 6) + p * (idx === 0 ? -6 : idx === 5 ? 4 : 0)
        const rotY = curX * (18 + p * 8)
        const rotZ = -curX * 3 + p * (idx % 2 === 0 ? -1.5 : 1.5)
        const s = layer.scale * (1 + p * 0.03)

        el.style.transform = `perspective(1000px) translate3d(${tx}px, ${ty}px, ${layerDepthFactor}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${s})`

        const calloutEl = calloutRefs.current[idx]
        if (calloutEl) {
          const calloutOpacity = Math.max(0, Math.min(1, (p - 0.22) / 0.45))
          calloutEl.style.opacity = String(calloutOpacity)
          calloutEl.style.transform = `translate3d(0px, ${ty}px, 0px) scale(${0.92 + calloutOpacity * 0.08})`
        }
      })

      if (kanziRef.current) {
        const kp = Math.max(0, Math.min(1, (p - 0.04) / 0.75))
        const easeOut = 1 - Math.pow(1 - kp, 3)
        const popScale =
          kp === 0
            ? 0.15
            : 0.2 + easeOut * 0.88 + Math.sin(kp * Math.PI) * 0.12
        const slideX = easeOut * 148 + curX * 16
        const slideY =
          -4 - easeOut * 14 + Math.sin(elapsed * 3.2) * 3 - curY * 8
        const rotZ = (1 - easeOut) * -18 + 5

        kanziRef.current.style.opacity = String(Math.min(1, kp * 1.6))
        kanziRef.current.style.transform = `perspective(900px) translate3d(${slideX}px, ${slideY}px, 65px) rotateY(${curX * 15}deg) rotateX(${-curY * 10}deg) rotateZ(${rotZ}deg) scale(${popScale})`
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = String(p * 0.6)
        glowRef.current.style.transform = `scale(${0.85 + p * 0.45})`
      }

      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate3d(${curX * 12}px, ${145 + p * 95}px, 0px) scale(${1 - p * 0.25}, 0.28)`
        shadowRef.current.style.opacity = String(0.75 - p * 0.3)
      }
    }

    reqId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(reqId)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [scene])

  const isReady = loadedCount >= BURGER_LAYERS.length
  const percent = Math.round(uiProgress * 100)

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full min-h-[500px] lg:min-h-[620px] flex items-center justify-center overflow-hidden select-none bg-transparent cursor-ns-resize',
        className
      )}
      title="Katmanları açmak için burgerin üzerinde scroll yapın"
    >
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-50 bg-black">
          <span className="loader"></span>
          <span className="text-xs font-mono text-zinc-400">
            BURGER KATMANLARI YÜKLENİYOR...
          </span>
        </div>
      )}

      {/* Ambient glow removed */}

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md border border-orange-500/30 text-[11px] font-mono text-zinc-200 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
        <span>BURGER ÜZERİNDE SCROLL YAPIN // KATMAN AÇILIMI: %{percent}</span>
        <button
          type="button"
          onClick={() => {
            targetProgressRef.current = targetProgressRef.current > 0.5 ? 0 : 1
          }}
          className="ml-1 px-2 py-0.5 rounded bg-orange-500 text-black font-bold hover:bg-orange-400 transition-colors cursor-pointer"
        >
          {percent > 50 ? 'Birleştir' : 'Katmanları Aç'}
        </button>
      </div>

      <div className="hidden sm:flex flex-col items-center gap-2 absolute right-4 top-1/2 -translate-y-1/2 z-40">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <div className="w-1.5 h-32 rounded-full bg-zinc-800/90 overflow-hidden p-0.5">
          <div
            className="w-full bg-gradient-to-b from-orange-400 to-amber-500 rounded-full transition-all duration-75"
            style={{ height: `${Math.max(10, percent)}%` }}
          />
        </div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        <div
          ref={shadowRef}
          className="pointer-events-none absolute w-64 h-64 rounded-full bg-black/95 blur-2xl"
        />

        {BURGER_LAYERS.map((layer, idx) => (
          <div
            key={`callout-${layer.id}`}
            ref={(el) => {
              calloutRefs.current[idx] = el
            }}
            style={{ opacity: 0 }}
            className={cn(
              'pointer-events-none hidden md:flex items-center gap-2 absolute z-30',
              layer.side === 'left'
                ? 'left-3 lg:left-5 flex-row'
                : 'right-8 lg:right-10 flex-row-reverse text-right'
            )}
          >
            <div className="px-2.5 py-1.5 rounded-lg bg-zinc-950/90 backdrop-blur-md border border-zinc-800/90 shadow-xl">
              <div className="text-[9px] font-mono text-orange-400 tracking-wider">
                {layer.code}
              </div>
              <div className="text-xs font-bold text-white leading-tight">
                {layer.name}
              </div>
              <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                {layer.spec}
              </div>
            </div>
            <div className="w-6 lg:w-10 h-[1px] bg-gradient-to-r from-orange-500/80 to-orange-400/20" />
            <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]" />
          </div>
        ))}

        {/* "Cıss Kanzi!" Badge emerging from between the Cheddar & Patty layers out to the side */}
        <div
          ref={kanziRef}
          style={{ opacity: 0, zIndex: 55 }}
          className="pointer-events-none absolute flex items-center will-change-transform"
        >
          <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-amber-300 rounded-full mr-2 shadow-[0_0_10px_#f97316]" />
          <div className="relative px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-black text-lg sm:text-2xl tracking-tight shadow-[0_10px_30px_rgba(249,115,22,0.55)] border-2 border-amber-200 whitespace-nowrap flex items-center gap-1.5">
            <span>🔥 Cıss Kanzi!</span>
          </div>
        </div>

        {BURGER_LAYERS.map((layer, idx) => (
          <div
            key={layer.id}
            ref={(el) => {
              layerRefs.current[idx] = el
            }}
            style={{
              zIndex: layer.zIndex,
              filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.85))',
            }}
            className="pointer-events-none absolute w-[260px] sm:w-[300px] md:w-[320px] aspect-[2/1] flex items-center justify-center will-change-transform"
          >
            <img
              src={layer.src}
              alt={layer.name}
              onLoad={() => setLoadedCount((c) => c + 1)}
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

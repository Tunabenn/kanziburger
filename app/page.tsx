'use client'

import React, { useState } from "react";
import { SplineSceneBasic } from "@/components/ui/demo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import {
  Flame,
  Cpu,
  Zap,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  Layers,
  Gauge,
  Thermometer,
  Award,
  Phone,
  Compass,
  CheckCircle2,
  Utensils,
  Activity,
} from "lucide-react";

interface BurgerItem {
  id: string;
  code: string;
  name: string;
  category: "smash" | "steakhouse" | "spicy" | "vegan";
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  specs: {
    temp: string;
    weight: string;
    searTime: string;
  };
  ingredients: string[];
}

const BURGER_MENU: BurgerItem[] = [
  {
    id: "overclocked-smash",
    code: "CISS-01 // OVERCLOCK",
    name: "Overclocked Double Smash",
    category: "smash",
    categoryLabel: "Çift Smash Serisi",
    tagline: "Maksimum Maillard Kabuğu & Çift Kat Yıllanmış Cheddar",
    description:
      "235°C döküm plakada yüksek basınçla mühürlenen 2x90g dry-aged dana kaburga köftesi. Karamelize soğan matrisi, ev yapımı fermente turşu ve tütsülü Cıss protokol sosu ile tereyağlı brioche ekmeğinde.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    specs: {
      temp: "235°C Plaka",
      weight: "180g (2x90g)",
      searTime: "110 Saniye",
    },
    ingredients: [
      "2x90g Dry-Aged Dana Smash",
      "Çift Kat Yıllanmış İngiliz Cheddar",
      "Karamelize Soğan Matrisi",
      "Cıss v4 İmza Protokol Sosu",
      "Ev Yapımı Tereyağlı Brioche",
    ],
  },
  {
    id: "cyber-truffle",
    code: "CISS-02 // NEURAL TRUFFLE",
    name: "Cyber Truffle Burger",
    category: "steakhouse",
    categoryLabel: "Gurme Steak Serisi",
    tagline: "Siyah Trüf Emülsiyonu & Füme Scamorza Peyniri",
    description:
      "Kalın çekim 180g dinlendirilmiş dana antrikot & kaburga harmanı. Odun ateşinde sotelenmiş yabani mantarlar, siyah İtalyan trüf aioli, erimiş füme scamorza peyniri ve çıtır arpacık soğan halkaları.",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80",
    specs: {
      temp: "62°C İç Isı",
      weight: "180g Tek Kat",
      searTime: "4.5 Dakika",
    },
    ingredients: [
      "180g Antrikot & Kaburga Köfte",
      "Siyah Trüf Mantarlı Aioli",
      "Füme Scamorza & İsviçre Peyniri",
      "Sote Yabani Orman Mantarları",
      "Çıtır Arpacık Soğan Halkaları",
    ],
  },
  {
    id: "quantum-smokehouse",
    code: "CISS-03 // QUANTUM SMOKE",
    name: "Quantum Smokehouse Brisket",
    category: "steakhouse",
    categoryLabel: "12 Saat Tütsü Serisi",
    tagline: "Meşe Odununda 12 Saat Tütsülenmiş Dana Brisket & Burger",
    description:
      "Klasik 160g Cıss burger köftesinin üzerine 12 saat düşük ısıda meşe dumanıyla pişirilmiş lif lif dana brisket dilimleri, çıtır dana bacon, karamelize espresso-BBQ glazür ve erimiş cheddar.",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80",
    specs: {
      temp: "850°C Infrared",
      weight: "240g Toplam Et",
      searTime: "12 Saat Füme",
    },
    ingredients: [
      "160g Burger Köftesi + 80g Dana Brisket",
      "Odun Ateşinde Çıtır Dana Bacon",
      "Espresso & Meşe Tütsülü BBQ Sos",
      "Yıllanmış Cheddar Peyniri",
      "Susamlı Siyah Karbon & Brioche Ekmek",
    ],
  },
  {
    id: "thermal-jalapeno",
    code: "CISS-04 // THERMAL CORE",
    name: "Thermal Core Jalapeño",
    category: "spicy",
    categoryLabel: "Yüksek Isı / Acı Serisi",
    tagline: "Közlenmiş Jalapeño, Chipotle Emülsiyonu & Pepper Jack",
    description:
      "Acı severler için termal dengesi milimetrik ayarlanmış lezzet. Közlenmiş taze jalapeño biberleri, erimiş pepper jack peyniri, serinletici avokado kreması ve isli chipotle biber sosu.",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80",
    specs: {
      temp: "240°C Mühür",
      weight: "180g Kaburga",
      searTime: "3.5 Dakika",
    },
    ingredients: [
      "180g Baharat Zırhlı Dana Köfte",
      "Erimiş Pepper Jack Peyniri",
      "Ateşte Közlenmiş Jalapeño",
      "İsli Chipotle & Avokado Kreması",
      "Çıtır Mısır Gevrekli Soğan",
    ],
  },
  {
    id: "silicon-triple",
    code: "CISS-05 // SILICON STACK",
    name: "Triple Core Brioche",
    category: "smash",
    categoryLabel: "Üçlü Smash Serisi",
    tagline: "3 Kat Smash Köfte, 3 Kat Cheddar & Sarımsaklı Tereyağı",
    description:
      "Yüksek protein ve maksimum çıtırlık arayanlar için 3x75g incecik smash köfte. Her katmanda eriyen cheddar peyniri, kavrulmuş sarımsaklı tereyağı, salatalık turşusu ve hardal tohumlu özel sos.",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80",
    specs: {
      temp: "245°C Plaka",
      weight: "225g (3x75g)",
      searTime: "95 Saniye",
    },
    ingredients: [
      "3x75g Ultra-Crispy Smash Köfte",
      "3 Kat Erimiş Cheddar",
      "Kavrulmuş Sarımsaklı Tereyağı",
      "Tatlı-Ekşi Salatalık Turşusu",
      "Hardal Tohumlu Cıss Sos",
    ],
  },
  {
    id: "bio-plant-neural",
    code: "CISS-06 // BIO-SYNTH",
    name: "Bio-Plant Neural Burger",
    category: "vegan",
    categoryLabel: "%100 Bitkisel / Vegan",
    tagline: "Yeni Nesil Bitkisel Protein & Tütsülü Vegan Cheddar",
    description:
      "Bezelye proteini, pancar özü ve hindistan cevizi yağı ile gerçek burger dokusunda geliştirilen %100 bitkisel köfte. Tütsülü vegan cheddar, avokado dilimleri, karamelize soğan ve vegan brioche.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
    specs: {
      temp: "210°C Izgara",
      weight: "160g Bitkisel",
      searTime: "3 Dakika",
    },
    ingredients: [
      "160g Yeni Nesil Bitkisel Köfte",
      "Tütsülenmiş Vegan Cheddar",
      "Taze Avokado & Karamelize Soğan",
      "Bitkisel Trüf & Fesleğen Sosu",
      "%100 Vegan Burger Ekmeği",
    ],
  },
];

const TECH_PILLARS = [
  {
    icon: Flame,
    badge: "MODÜL 01 // 850°C",
    title: "Kızılötesi & Döküm Mühürleme",
    description:
      "Burgerlerimiz sıradan ızgaralarda değil; ısıyı milimetrik olarak sabit tutan yüksek iletkenlikli çelik-döküm plakalarda mühürlenir. Bu sayede dışı çıtır karamelize kabuk bağlarken etin tüm suyu içeride hapsolur.",
  },
  {
    icon: Cpu,
    badge: "MODÜL 02 // SENSÖR",
    title: "Çekirdek Isı Kalibrasyonu",
    description:
      "Her köftenin kalınlığına göre pişirme süresi ve iç sıcaklığı dijital termal problarla takip edilir. Her gelişinizde aynı kusursuz sululuk ve pişme derecesini standart olarak deneyimlersiniz.",
  },
  {
    icon: Sparkles,
    badge: "MODÜL 03 // EMÜLSİYON",
    title: "Moleküler Sos Laboratuvarı",
    description:
      "Cıss Burger'de hazır sos kullanılmaz. Siyah trüf aioli, fermente biber sosları ve meşe tütsülü barbekü glazürlerimiz mutfak laboratuvarımızda günlük taze malzemelerle emülsifiye edilir.",
  },
  {
    icon: ShieldCheck,
    badge: "MODÜL 04 // %100 DOĞAL",
    title: "28 Gün Dry-Aged Tek Çiftlik Eti",
    description:
      "Teknolojimiz pişirme tekniğimizde; doğallığımız ise kaynağımızda. Hiçbir katkı maddesi, koruyucu veya donuk ürün kullanmadan, 28 gün dinlendirilmiş %100 dana kaburga ve antrikot eti çekiyoruz.",
  },
];

const SIDE_MODULES = [
  {
    name: "Circuit Fries // Trüf & Parmesan",
    desc: "Çift aşamalı ultrasonik nişasta arındırma yöntemiyle dışı cam gibi çıtır, içi pamuk gibi patates kızartması; trüf yağı ve 24 aylık rendelenmiş parmesan ile.",
    tag: "ÇİFT KIZARTMA // 190°C",
  },
  {
    name: "Cıss Cajun Baharatlı Patates",
    desc: "Ev yapımı 9 baharatlı tütsülü Cajun harmanı ve yanında közlenmiş sarımsaklı Cıss dip sos ile servis edilen el kesimi çıtır patates.",
    tag: "ÖZEL BAHARAT HARMANI",
  },
  {
    name: "Crispy Onion Rings // Soğan Halkası",
    desc: "Maden suyu ve mısır unlu özel kaplamasıyla yağ çekmeden altın sarısı kıvamda kızartılan tam halka tatlı beyaz soğanlar.",
    tag: "TAM HALKA SOĞAN",
  },
  {
    name: "Nitro Cold Brew & Ev Yapımı Limonata",
    desc: "Taze sıkılmış naneli-zencefilli fermente limonata ve burger lezzetini dengeleyen buz gibi ev yapımı soğuk içecek koleksiyonu.",
    tag: "DOĞAL & TAZE ÜRETİM",
  },
];

export default function CissBurgerPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredBurgers =
    activeCategory === "all"
      ? BURGER_MENU
      : BURGER_MENU.filter((b) => b.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-black fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">
                  CISS BURGER
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  TECH-GRILL
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Yüksek Frekanslı Gurme Burgerci
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a
              href="#konsept"
              className="hover:text-orange-400 transition-colors"
            >
              Konseptimiz
            </a>
            <a
              href="#burgerler"
              className="hover:text-orange-400 transition-colors"
            >
              Burger Koleksiyonu
            </a>
            <a
              href="#teknoloji"
              className="hover:text-orange-400 transition-colors"
            >
              Mutfak Teknolojisi
            </a>
            <a
              href="#yan-lezzetler"
              className="hover:text-orange-400 transition-colors"
            >
              Yan Lezzetler
            </a>
            <a
              href="#subeler"
              className="hover:text-orange-400 transition-colors"
            >
              Lokasyon & Saatler
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>IZGARA AKTİF // 12:00 - 23:30</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with SplineSceneBasic */}
        <section id="konsept" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <SplineSceneBasic />
        </section>

        {/* Concept Strip / Telemetry Banner */}
        <section className="border-y border-zinc-800/80 bg-zinc-900/40 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <Thermometer className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400">MAILLARD REAKSİYONU</div>
                <div className="text-base font-bold text-white">235°C Hassas Mühür</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400">SIFIR DONUK ÜRÜN</div>
                <div className="text-base font-bold text-white">Günlük Taze Çekim Et</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400">ARTİZAN FIRIN</div>
                <div className="text-base font-bold text-white">Günlük Tereyağlı Brioche</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400">ÖZEL REÇETE</div>
                <div className="text-base font-bold text-white">Ev Yapımı İmza Soslar</div>
              </div>
            </div>
          </div>
        </section>

        {/* Burger Collection Section (Showcase Only - No Cart/Checkout) */}
        <section
          id="burgerler"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider mb-3">
                <Utensils className="w-3.5 h-3.5" />
                <span>CISS BURGER MENÜ KATALOĞU</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Teknoloji Konseptli Gurme Burgerler
              </h2>
              <p className="mt-3 text-zinc-400 max-w-2xl">
                Her bir burgerimiz gerçek bir burger ustalığıyla hazırlanır, ancak malzeme
                oranları ve pişirme süreleri bir mühendislik projesi titizliğiyle uygulanır.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "Tümü (6)" },
                { key: "smash", label: "Smash Serisi" },
                { key: "steakhouse", label: "Steak & Füme" },
                { key: "spicy", label: "Acı / Termal" },
                { key: "vegan", label: "Bitkisel" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                    activeCategory === tab.key
                      ? "bg-orange-500 text-black font-bold border-orange-400 shadow-lg shadow-orange-500/20"
                      : "bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBurgers.map((burger) => (
              <Card
                key={burger.id}
                className="bg-zinc-900/60 border-zinc-800/90 hover:border-orange-500/50 transition-all duration-300 flex flex-col overflow-hidden group relative"
              >
                <Spotlight size={240} />

                {/* Burger Photo */}
                <div className="relative h-60 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={burger.image}
                    alt={burger.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700/80 text-[11px] font-mono text-orange-400">
                    {burger.code}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-orange-500/90 text-black font-bold text-[11px] font-mono">
                    {burger.categoryLabel}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {burger.name}
                  </CardTitle>
                  <CardDescription className="text-orange-300/90 font-medium text-xs">
                    {burger.tagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {burger.description}
                  </p>

                  <div>
                    {/* Tech Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-zinc-950/90 border border-zinc-800/80 mb-4">
                      <div>
                        <span className="block text-[10px] font-mono text-zinc-500">
                          GRAMAJ
                        </span>
                        <span className="text-xs font-mono font-semibold text-zinc-200">
                          {burger.specs.weight}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono text-zinc-500">
                          TERMAL ISI
                        </span>
                        <span className="text-xs font-mono font-semibold text-orange-400">
                          {burger.specs.temp}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono text-zinc-500">
                          MÜHÜR SÜRESİ
                        </span>
                        <span className="text-xs font-mono font-semibold text-zinc-200">
                          {burger.specs.searTime}
                        </span>
                      </div>
                    </div>

                    {/* Ingredients List */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                        İçerik Katmanları:
                      </span>
                      <ul className="space-y-1">
                        {burger.ingredients.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-zinc-300 flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    Restoranda Taze Hazırlanır
                  </span>
                  <span className="text-orange-400 font-semibold">
                    CISS IMZA SERİSİ
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Culinary Tech Section */}
        <section
          id="teknoloji"
          className="py-20 border-y border-zinc-800/80 bg-zinc-900/30 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider mb-3">
                <Activity className="w-3.5 h-3.5" />
                <span>CISS LAB // LEZZET TEKNOLOJİSİ</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Gerçek Burger, İleri Mutfak Teknolojisi
              </h2>
              <p className="mt-4 text-zinc-400 text-base">
                Cıss Burger özünde geleneksel, dumanı üstünde bir mahalle gurme burgercisidir.
                Farkımız; eti işleme, dinlendirme ve pişirme aşamalarında kullandığımız
                hassas gastronomi teknolojisidir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TECH_PILLARS.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <Card
                    key={index}
                    className="bg-zinc-950/90 border-zinc-800/90 p-6 relative overflow-hidden group hover:border-orange-500/40 transition-colors"
                  >
                    <Spotlight size={260} />
                    <div className="flex items-start gap-5 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/5 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-orange-400 uppercase tracking-widest">
                          {pillar.badge}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1">
                          {pillar.title}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Side Modules / Fries & Drinks Showcase */}
        <section
          id="yan-lezzetler"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider">
                <Gauge className="w-3.5 h-3.5" />
                <span>YAN DONANIMLAR & EŞLİKÇİLER</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                Burger Deneyimini Tamamlayan Çıtır Modüller
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                İyi bir burgerin en güçlü tamamlayıcısı kusursuz kızarmış patates ve
                ev yapımı soslardır. Patateslerimizi çift aşamalı sıcaklık kontrolüyle
                kızartıyor, kendi baharat harmanlarımızla sıcak servis ediyoruz.
              </p>
              <div className="rounded-2xl overflow-hidden border border-zinc-800 relative h-64">
                <img
                  src="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=900&q=80"
                  alt="Cıss Burger Çıtır Patates ve Soslar"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <span className="text-xs font-mono text-orange-300">
                    // ÇİFT KIZARTMA PROTOKOLÜ İLE MAKSİMUM ÇITIRLIK
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SIDE_MODULES.map((side, i) => (
                <Card
                  key={i}
                  className="bg-zinc-900/50 border-zinc-800/90 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all"
                >
                  <div>
                    <span className="inline-block text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-800 text-orange-400 mb-3">
                      {side.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white">{side.name}</h3>
                    <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                      {side.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-800/70 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>CISS MUTFAK ÜRETİMİ</span>
                    <span className="text-orange-400">● TAZE SERVİS</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Hours Section (No E-Commerce, Pure Restaurant Showcase) */}
        <section
          id="subeler"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        >
          <Card className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-zinc-800 p-8 md:p-12 relative overflow-hidden">
            <Spotlight size={320} />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase">
                  <Compass className="w-3.5 h-3.5" />
                  <span>RESTORAN DENEYİMİ</span>
                </div>
                <h2 className="text-3xl font-black text-white">
                  Cıss Burger İstasyona Bekliyoruz
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Burgerlerimizin çıtırlığını ve 235°C mühür aromasını ilk saniyedeki
                  sıcaklığıyla yaşamanız için sizi restoranımıza davet ediyoruz.
                </p>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <MapPin className="w-6 h-6 text-orange-400 mb-3" />
                  <h3 className="text-sm font-mono uppercase text-zinc-400">
                    MERKEZ İSTASYON
                  </h3>
                  <p className="text-base font-bold text-white mt-1">
                    Kadıköy Moda & Beşiktaş Akaretler
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Açık Mutfak & Termal Izgara Barı
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <Clock className="w-6 h-6 text-orange-400 mb-3" />
                  <h3 className="text-sm font-mono uppercase text-zinc-400">
                    ÇALIŞMA SAATLERİ
                  </h3>
                  <p className="text-base font-bold text-white mt-1">
                    Her Gün 12:00 – 23:30
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Cuma & Cumartesi 01:00&apos;e Kadar
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <Phone className="w-6 h-6 text-orange-400 mb-3" />
                  <h3 className="text-sm font-mono uppercase text-zinc-400">
                    İLETİŞİM & BİLGİ
                  </h3>
                  <p className="text-base font-bold text-white mt-1">
                    0 (216) 555 24 77
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    merhaba@cissburger.com
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-zinc-300 font-bold">CISS BURGER</span>
            <span>// TEKNOLOJİ KONSEPTLİ GURME BURGER TANITIM SİTESİ</span>
          </div>
          <div>© {new Date().getFullYear()} Cıss Burger. Tüm hakları saklıdır.</div>
        </div>
      </footer>
    </div>
  );
}

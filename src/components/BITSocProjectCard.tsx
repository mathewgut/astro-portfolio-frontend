import React from 'react';

const BITSocProjectCard = () => {
  return (
    <article className="group relative h-[450px] w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-950 font-[jetbrains-mono] shadow-2xl">
      
      {/* 1. Background Image with "Hover-Zoom" */}
      <img 
        src="/bitsoc-screenshot.png" 
        alt="BITSoc Website" 
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-40"
      />

      {/* 2. Top "Status" Badge */}
      <div className="absolute left-6 top-6 z-30">
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-white">Live Project</span>
        </div>
      </div>

      {/* 3. The Content Overlay (Bento Bottom) */}
      <section className="absolute inset-x-0 bottom-0 z-20 flex flex-col p-8 pt-20 bg-gradient-to-t from-black via-black/90 to-transparent">
        
        <h2 className="mb-2 text-3xl font-black tracking-tighter text-white">BITSoc.ca</h2>
        
        <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-400">
          Engineered a secure <span className="text-cyan-400">PHP/cURL proxy</span> to bridge the Bludit API with React, enabling dynamic content delivery for Carleton's IT society.
        </p>

        {/* Bento-style Stats Grid */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Role</span>
            <span className="text-sm text-white">Fullstack Dev</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Stack</span>
            <span className="text-sm text-white">Astro / PHP / Redux</span>
          </div>
        </div>
      </section>

      {/* 4. Refined Aberration & Glass Border */}
      <div className="pointer-events-none absolute inset-0 z-40 rounded-2xl border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.7)]">
        {/* Left Edge Red Shift */}
        <div className="absolute inset-y-0 left-0 w-[2px] bg-red-500/40 blur-[1px]"></div>
        {/* Right Edge Cyan Shift */}
        <div className="absolute inset-y-0 right-0 w-[2px] bg-cyan-400/40 blur-[1px]"></div>
      </div>
    </article>
  );
};

export default BITSocProjectCard;
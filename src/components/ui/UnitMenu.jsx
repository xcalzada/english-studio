import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { TOOLS_CONFIG } from '../../toolsConfig';

export const UnitMenu = ({ unit, onSelectTab, onBack }) => (
  <div className="relative min-h-screen">
    <div className="relative z-10 max-w-5xl mx-auto px-5 pt-8 pb-24">

      {/* Back */}
      <button onClick={onBack} className="btn-ghost flex items-center gap-2 mb-8 text-xs">
        <ArrowLeft size={15} /> All Units
      </button>

      {/* Unit hero */}
      <div className="tool-grammar card-tool p-8 md:p-10 mb-10 relative overflow-hidden">
        {/* big background letter */}
        <div className="absolute -bottom-6 -right-4 select-none pointer-events-none"
          style={{ fontSize:200, lineHeight:1, color:'rgba(255,255,255,0.03)', fontFamily:'monospace' }}>
          U
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[.25em] px-3 py-1.5 rounded-full"
                style={{ background:'rgba(255,255,255,0.10)', border:'1px solid rgba(255,255,255,0.18)', color:'rgba(255,255,255,0.7)' }}>
                Grammar Focus
              </span>
              {unit.description && (
                <span className="text-[10px] font-semibold italic hidden md:block"
                  style={{ color:'var(--text-3)' }}>
                  {unit.description}
                </span>
              )}
            </div>
            <h1 className="display-font text-5xl md:text-6xl text-white leading-none"
              style={{ textShadow:'0 4px 40px rgba(0,0,0,0.6)' }}>
              {unit.grammarTitle}
            </h1>
            <p className="text-lg font-bold" style={{ color:'rgba(255,255,255,0.60)' }}>
              {unit.title}
            </p>
          </div>

          {/* mini stat pills */}
          <div className="flex gap-2 shrink-0">
            <div className="px-4 py-2 rounded-full card-inner text-center">
              <p className="text-lg font-black text-white">{TOOLS_CONFIG.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:'var(--text-3)' }}>Tools</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[.25em] mb-5" style={{ color:'var(--text-3)' }}>
          Choose a tool to start
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_CONFIG.map((tool, idx) => {
            const meta = tool.meta || {};
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTab(tool.id)}
                className={`tool-${tool.id} group relative overflow-hidden text-left p-6 rounded-2xl`}
                style={{
                  background: meta.bg,
                  border:'1px solid rgba(255,255,255,0.10)',
                  transition:'transform .25s var(--spring), box-shadow .2s ease',
                  boxShadow:'0 4px 24px rgba(0,0,0,0.35)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.45), 0 0 32px -8px var(--cg)`;
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                }}
              >
                {/* shine streak */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 60%)' }} />

                <div className="relative z-10">
                  {/* header row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3 rounded-xl"
                      style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.18)' }}>
                      <Icon size={20} style={{ color: meta.dot }} />
                    </div>
                    <span className="text-2xl">{tool.emoji}</span>
                  </div>

                  {/* text */}
                  <h3 className="display-font text-2xl text-white mb-1">{tool.label}</h3>
                  <p className="text-xs font-semibold leading-snug mb-4" style={{ color:'rgba(255,255,255,0.55)' }}>
                    {tool.desc}
                  </p>

                  {/* CTA row */}
                  <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest"
                    style={{ color: meta.dot }}>
                    Start <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default UnitMenu;

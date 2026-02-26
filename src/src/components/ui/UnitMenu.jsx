import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { TOOLS_CONFIG } from '../../toolsConfig';

export const UnitMenu = ({ unit, onSelectTab, onBack }) => (
  <div className="relative min-h-screen">
    <div className="relative z-10 max-w-5xl mx-auto px-5 pt-8 pb-24">

      <button onClick={onBack} className="btn-ghost flex items-center gap-2 mb-8 text-xs">
        <ArrowLeft size={15} /> All Units
      </button>

      <div className="tool-grammar card-tool p-8 md:p-10 mb-10 relative overflow-hidden">
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
                <span className="text-[10px] font-semibold italic hidden md:block" style={{ color:'var(--text-3)' }}>
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
          <div className="flex gap-2 shrink-0">
            <div className="px-4 py-2 rounded-full card-inner text-center">
              <p className="text-lg font-black text-white">{TOOLS_CONFIG.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:'var(--text-3)' }}>Tools</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-black uppercase tracking-[.25em] mb-5" style={{ color:'var(--text-3)' }}>
          Choose a tool to start
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_CONFIG.map((tool) => {
            const meta = tool.meta || {};
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTab(tool.id)}
                className={`tool-${tool.id} group relative overflow-hidden text-left p-6 rounded-2xl
                  transition-all duration-200 hover:-translate-y-1.5 hover:scale-[1.02]
                  hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)]`}
                style={{
                  background: meta.bg,
                  border:'1px solid rgba(255,255,255,0.10)',
                  boxShadow:'0 4px 24px rgba(0,0,0,0.35)',
                }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3 rounded-xl"
                      style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.18)' }}>
                      <Icon size={20} style={{ color: meta.dot }} />
                    </div>
                    <span className="text-2xl">{tool.emoji}</span>
                  </div>
                  <h3 className="display-font text-2xl text-white mb-1">{tool.label}</h3>
                  <p className="text-xs font-semibold leading-snug mb-4" style={{ color:'rgba(255,255,255,0.55)' }}>
                    {tool.desc}
                  </p>
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

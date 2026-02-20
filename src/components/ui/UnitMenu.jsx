import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { TOOLS_CONFIG } from '../../toolsConfig';

/**
 * UnitMenu — colores 100% desde index.css.
 * Este componente NO define ningún color inline.
 * Para cambiar colores, edita index.css únicamente.
 */
export const UnitMenu = ({ unit, onSelectTab, onBack }) => {
  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: 'var(--page-bg)' }}>

      {/* ── Back ─────────────────────────────────────────────────────────── */}
      <button onClick={onBack} className="btn-ghost flex items-center gap-2 mb-8">
        <ArrowLeft size={16} /> All Units
      </button>

      {/* ── Header de la unidad ──────────────────────────────────────────── */}
      <div className="s-tool rounded-[2rem] p-8 md:p-10 mb-8 relative overflow-hidden">
        {/* glow decorativo — color viene de --c0 via CSS */}
        <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full blur-3xl"
          style={{ background: 'var(--c0)', opacity: .12 }} />

        <div className="relative z-10">
          <span className="unit-header-badge">Grammar Focus</span>
          <h1 className="unit-header-title">{unit.grammarTitle}</h1>
          <p className="unit-header-subtitle">{unit.title}</p>
          {unit.description && (
            <p className="unit-header-desc">{unit.description}</p>
          )}
        </div>
      </div>

      {/* ── Grid de herramientas ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS_CONFIG.map(tool => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => onSelectTab(tool.id)}
              className={`tool-${tool.id} home-card text-left p-6 rounded-[1.75rem]`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="tool-card-icon">
                  <Icon size={22} />
                </div>
                <span className="text-3xl">{tool.emoji}</span>
              </div>
              <h3 className="tool-card-title mb-1">{tool.label}</h3>
              <p className="tool-card-desc">{tool.desc}</p>
              <div className="tool-card-cta">
                Open <ChevronRight size={14} />
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default UnitMenu;
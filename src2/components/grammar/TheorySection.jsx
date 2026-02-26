import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RenderItem } from './TheoryRenderers';

const ACCENTS = ['#60a5fa','#34d399','#a78bfa','#f472b6','#fbbf24','#fb923c'];
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const BlockItem = React.memo(({ blockKey, block, idx, isOpen, onToggle }) => {
  const color = ACCENTS[idx % ACCENTS.length];
  return (
    <div className="overflow-hidden rounded-2xl transition-all duration-200"
      style={{
        background: isOpen
          ? `linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))`
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isOpen ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isOpen ? `0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset` : 'none',
      }}>

      {/* Header */}
      <button onClick={() => onToggle(blockKey)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 transition-colors hover:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 text-white"
            style={{ background:`${color}28`, border:`1.5px solid ${color}55`, color }}>
            {LETTERS[idx]}
          </div>
          <span className="font-black text-white text-sm md:text-base tracking-tight">{block.title}</span>
        </div>
        <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: isOpen ? `${color}22` : 'rgba(255,255,255,0.06)', color: isOpen ? color : 'rgba(255,255,255,0.4)' }}>
          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      {/* Body */}
      {isOpen && (
        <div className="px-5 pb-6 pt-2 space-y-3"
          style={{ borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          {/* color accent bar */}
          <div className="h-0.5 w-16 rounded-full mb-4" style={{ background: color, opacity:.6 }} />
          {(block.content || []).map((item, i) => (
            <RenderItem key={`${blockKey}-${i}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
});

export const TheorySection = React.memo(({ theory }) => {
  const blocks = Object.entries(theory || {});
  const [open, setOpen] = useState(() => Object.fromEntries(blocks.map(([k], i) => [k, i === 0])));
  const toggle = key => setOpen(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-2.5">
      {blocks.map(([key, block], idx) => (
        <BlockItem key={key} blockKey={key} block={block} idx={idx}
          isOpen={open[key] !== false} onToggle={toggle} />
      ))}
    </div>
  );
});

export default TheorySection;

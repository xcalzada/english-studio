import React from 'react';
import { CheckCircle, AlertTriangle, ChevronRight, ArrowRight } from 'lucide-react';

export const Ex = React.memo(({ en, es }) => (
  <div className="card-inner p-4 space-y-1">
    <p className="font-bold text-white text-base leading-snug" dangerouslySetInnerHTML={{ __html: en }} />
    {es && <p className="text-sm italic" style={{ color: 'var(--text-3)' }}>{es}</p>}
  </div>
));

export const Rule = React.memo(({ text, warn }) => (
  <div className={`flex gap-3 p-3 rounded-2xl border-2 text-sm font-semibold ${warn ? 'badge-wrong' : 'badge-correct'}`}>
    <span className="text-xl shrink-0">{warn ? '⚠️' : '✅'}</span>
    <span dangerouslySetInnerHTML={{ __html: text }} />
  </div>
));

export const Grid = React.memo(({ items }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {items.map((it, i) => (
      <div key={`${it.base}-${i}`} className="card-inner p-3 text-center hover:scale-105 transition-transform">
        {it.emoji && <p className="text-3xl mb-2">{it.emoji}</p>}
        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--text-3)' }}>{it.base}</p>
        <p className="font-black text-lg text-white">→ {it.comp}</p>
      </div>
    ))}
  </div>
));

export const Teacher = React.memo(({ text }) => (
  <div className="flex gap-3 p-3 rounded-2xl badge-warn">
    <span className="text-2xl shrink-0">👨‍🏫</span>
    <p className="text-sm font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
  </div>
));

export const Tip = React.memo(({ emoji, text }) => (
  <div className="flex gap-3 p-3 rounded-2xl card-inner">
    <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>
    <p className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--text-2)' }} dangerouslySetInnerHTML={{ __html: text }} />
  </div>
));

export const Table = React.memo(({ rows, headers }) => (
  <div className="overflow-x-auto rounded-2xl border-2 border-white/20 overflow-hidden">
    <table className="w-full text-sm">
      {headers && (
        <thead>
          <tr className="border-b-2 border-white/20" style={{ background: 'rgba(255,255,255,0.08)' }}>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-black uppercase text-[11px] tracking-widest" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-white/10" style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 text-white font-semibold" dangerouslySetInnerHTML={{ __html: cell }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

export const Compare = React.memo(({ left, right, label }) => {
  const sizeMap = { xs: 44, sm: 56, md: 72, lg: 92, xl: 116 };
  const getEmojiSize = (s) => sizeMap[s] || sizeMap.md;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
      {label && (
        <div className="px-4 pt-3 pb-1">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--c0)' }}>{label}</p>
        </div>
      )}
      <div className="flex items-end justify-center gap-6 px-6 pb-5 pt-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-end justify-center" style={{ height: getEmojiSize(left.size) + 16 }}>
            <span style={{ fontSize: getEmojiSize(left.size || 'sm'), lineHeight: 1 }}>{left.emoji}</span>
          </div>
          <div className="text-center">
            <p className="font-black text-white text-sm leading-tight">{left.label}</p>
            {left.sub && <p className="text-[11px] font-semibold mt-0.5" style={{ color: 'var(--text-3)' }}>{left.sub}</p>}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 pb-6">
          <ArrowRight size={20} style={{ color: 'var(--c0)' }} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-end justify-center" style={{ height: getEmojiSize(right.size) + 16 }}>
            <span style={{ fontSize: getEmojiSize(right.size || 'lg'), lineHeight: 1 }}>{right.emoji}</span>
          </div>
          <div className="text-center">
            <div className="inline-block px-2 py-0.5 rounded-lg mb-1" style={{ background: 'var(--c0)', opacity: 0.9 }}>
              <p className="font-black text-white text-sm leading-tight">{right.label}</p>
            </div>
            {right.sub && <p className="text-[11px] font-semibold" style={{ color: 'var(--text-3)' }}>{right.sub}</p>}
          </div>
        </div>
      </div>
    </div>
  );
});

export const CompareBar = React.memo(({ items, adjective }) => {
  const maxVal = Math.max(...items.map(i => i.value));
  const colors = ['var(--c0)', '#34d399', '#f472b6', '#fbbf24'];
  return (
    <div className="rounded-2xl overflow-hidden p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
      {adjective && <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c0)' }}>{adjective}</p>}
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xl w-8 shrink-0">{item.emoji}</span>
          <div className="flex-1">
            <div className="h-6 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div className="h-full rounded-full flex items-center pl-3 transition-all duration-700"
                style={{ width: `${Math.round((item.value / maxVal) * 100)}%`, background: colors[i % colors.length], minWidth: 40 }}>
                <span className="text-[10px] font-black text-white whitespace-nowrap">{item.label}</span>
              </div>
            </div>
          </div>
          <span className="text-xs font-black text-white w-12 text-right shrink-0">{item.unit}{item.value}</span>
        </div>
      ))}
    </div>
  );
});

export const RenderItem = React.memo(({ item }) => {
  if (typeof item === 'string') return (
    <div className="item-surface px-4 py-3 flex gap-3">
      <span style={{ color: 'var(--c0)', flexShrink: 0, marginTop: 2 }}>
        {item.includes('❌') ? <AlertTriangle size={15} /> : item.includes('✅') ? <CheckCircle size={15} /> : <ChevronRight size={15} />}
      </span>
      <span className="text-sm leading-relaxed font-semibold" style={{ color: 'var(--text-2)' }} dangerouslySetInnerHTML={{ __html: item }} />
    </div>
  );
  switch (item.type) {
    case 'example':    return <Ex         en={item.en} es={item.es} />;
    case 'rule':       return <Rule       text={item.text} warn={item.warn} />;
    case 'grid':       return <Grid       items={item.items} />;
    case 'teacher':    return <Teacher    text={item.text} />;
    case 'tip':        return <Tip        emoji={item.emoji} text={item.text} />;
    case 'table':      return <Table      rows={item.rows} headers={item.headers} />;
    case 'compare':    return <Compare    left={item.left} right={item.right} label={item.label} />;
    case 'comparebar': return <CompareBar items={item.items} adjective={item.adjective} />;
    case 'subtitle':   return <p className="text-xs font-black uppercase tracking-widest pt-1" style={{ color: 'var(--c0)' }}>● {item.text}</p>;
    case 'text':       return <p className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--text-2)' }} dangerouslySetInnerHTML={{ __html: item.text }} />;
    default:           return null;
  }
});

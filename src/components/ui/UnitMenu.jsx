import React from 'react';
import { BookOpen, Sofa, Headphones, FileText, PenTool, ArrowLeft, Lightbulb } from 'lucide-react';

export const UnitMenu = ({ unit, onSelectTab, onBack }) => {
  
  const menuItems = [
    { id: 'grammar',   label: 'Grammar Lab',   icon: <BookOpen size={32}/>,   color: 'bg-blue-600',   border: 'border-blue-800' },
    { id: 'vocab',     label: 'Vocabulary',    icon: <Sofa size={32}/>,       color: 'bg-pink-600',   border: 'border-pink-800' },
    { id: 'listening', label: 'Audio Room',    icon: <Headphones size={32}/>, color: 'bg-purple-600', border: 'border-purple-800' },
    { id: 'reading',   label: 'Reading',       icon: <FileText size={32}/>,   color: 'bg-emerald-600', border: 'border-emerald-800' },
    { id: 'writing',   label: 'Project',       icon: <PenTool size={32}/>,    color: 'bg-orange-600', border: 'border-orange-800' },
  ];

  if (unit.activeRules) {
    menuItems.push({
        id: 'discovery', 
        label: 'Discovery', 
        icon: <Lightbulb size={32}/>, 
        color: 'bg-amber-500', 
        border: 'border-amber-700',
        special: true 
    });
  }

  return (
    // CAMBIO AQUI: max-w-7xl
    <div className="max-w-7xl mx-auto pt-10 px-6 animate-in zoom-in-95 duration-500 pb-20">
      
      <div className="flex flex-col items-center mb-12 text-center">
        <button onClick={onBack} className="self-start mb-6 flex items-center gap-2 font-black text-slate-400 uppercase tracking-widest text-xs hover:text-slate-900 transition-colors">
            <ArrowLeft size={16}/> Back to Units
        </button>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-2">
            {unit.title}
        </h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">{unit.grammarTitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`
                relative group overflow-hidden
                bg-white border-4 border-slate-900 rounded-[2.5rem] p-8 
                shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]
                hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] 
                active:translate-y-1 active:shadow-[0_0_0_0_rgba(15,23,42,1)]
                transition-all duration-200 text-left flex flex-col items-center justify-center gap-4 h-64
                ${item.special ? 'ring-4 ring-amber-300' : ''}
            `}
          >
            {item.special && <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">Bonus</div>}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className={`
                ${item.color} text-white p-6 rounded-2xl 
                border-4 border-slate-900
                shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]
                group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]
                transition-all
            `}>
                {item.icon}
            </div>
            <span className="font-black text-2xl uppercase italic tracking-tighter text-slate-800 group-hover:text-slate-900">
                {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
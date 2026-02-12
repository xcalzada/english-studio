import React from 'react';
import { ArrowLeft } from 'lucide-react';

/* ==========================================================================
   COMPONENTES UI REUTILIZABLES (Estilo Neubrutalista)
   PROMPT IA: "Crea un componente UI en este archivo que siga el estilo de bordes gruesos y sombras duras de Tailwind."
   ========================================================================== */

export const Card = ({ 
  children, 
  className = "", 
  color = "border-slate-900",       // Borde por defecto neubrutalista
  background = "bg-white"           // Permite cambiar el fondo si hace falta
}) => (
  <div className={`
    ${background} border-4 ${color} rounded-[2.5rem]
    shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]
    p-6 md:p-8
    ${className}
  `}>
    {children}
  </div>
);

export const Button3D = ({ 
  children, 
  onClick, 
  active = false, 
  className = "", 
  color = "bg-slate-900 text-white" 
}) => (
  <button 
    onClick={onClick}
    className={`
      inline-flex items-center justify-center gap-2
      px-6 py-4 rounded-2xl font-black uppercase tracking-widest transition-all
      border-4 border-slate-900 border-b-[8px]
      shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]
      hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]
      active:translate-y-1 active:border-b-4 active:shadow-[0_0_0_0_rgba(15,23,42,1)]
      ${active ? 'translate-y-1 border-b-4' : ''}
      ${color} ${className}
    `}
  >
    {children}
  </button>
);

export const InputField = ({ value, onChange, placeholder, correct, error, disabled }) => {
  let statusColor = "border-slate-300 bg-slate-50 focus:border-indigo-600 text-indigo-700";
  if (correct) statusColor = "border-emerald-600 bg-emerald-100 text-emerald-900";
  if (error) statusColor = "border-rose-600 bg-rose-100 text-rose-900";

  return (
    <input 
      disabled={disabled}
      value={value} 
      onChange={onChange}
      placeholder={placeholder || "..."}
      className={`border-b-4 w-32 md:w-48 mx-1 p-1 text-center font-black text-lg outline-none transition-all uppercase ${statusColor}`} 
    />
  );
};

export const SectionHeader = ({ title, color = "border-slate-800", onBack }) => (
  <div className="flex items-center gap-5 mb-10 animate-in slide-in-from-left duration-500">
      <button 
        onClick={onBack} 
        className="
          p-3 bg-white border-4 border-slate-900 rounded-2xl 
          shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]
          hover:-translate-y-1 hover:shadow-[9px_9px_0px_0px_rgba(15,23,42,1)]
          active:translate-y-1 active:shadow-[0_0_0_0_rgba(15,23,42,1)]
          transition-all
        "
      >
        <ArrowLeft size={24} />
      </button>
      <h2 className={`text-2xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter border-l-[12px] ${color} pl-6 leading-none`}>
        {title}
      </h2>
  </div>
);
import React from 'react';

// Tarjeta sencilla para mostrar una frase de ejemplo
// Usa el mismo estilo neubrutalista que el resto de la app.
const ExampleSentenceCard = ({ 
  sentence = "This is an example sentence.",
  label = "Example sentence"
}) => {
  return (
    <div className="bg-white border-4 border-slate-200 rounded-[1.75rem] p-6 shadow-md">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
        {label}
      </h3>
      <p className="text-lg md:text-xl font-semibold text-slate-900">
        {sentence}
      </p>
    </div>
  );
};

export default ExampleSentenceCard;


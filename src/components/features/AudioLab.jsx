import React, { useState } from 'react';
import { Play, Pause, Headphones } from 'lucide-react';
import { Card, Button3D } from '../ui/Neubrutal';

const AudioLab = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (opt) => {
    if (selectedOptions.includes(opt)) {
        setSelectedOptions(selectedOptions.filter(o => o !== opt));
    } else {
        setSelectedOptions([...selectedOptions, opt]);
    }
  };

  const speak = () => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(data.listening.text);
    utt.lang = 'en-GB';
    utt.rate = 0.9;
    utt.onstart = () => setIsPlaying(true);
    utt.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utt);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Player Card */}
      <Card color="border-purple-600" className="bg-purple-600 text-white text-center py-12">
        <Headphones size={48} className="mx-auto mb-4 text-purple-200" />
        <h3 className="text-3xl font-black italic uppercase mb-8">Audio Lab</h3>
        <button 
            onClick={speak}
            className={`p-8 rounded-full transition-all shadow-2xl border-4 border-white/20 hover:border-white ${isPlaying ? 'bg-white text-purple-600 scale-110' : 'bg-purple-500 text-white hover:scale-105'}`}
        >
            {isPlaying ? <Pause size={40} strokeWidth={3}/> : <Play size={40} strokeWidth={3} className="ml-1"/>}
        </button>
      </Card>

      {/* Interactive Quiz */}
      <Card>
         <h4 className="font-black text-slate-900 uppercase mb-6 text-center">Select items mentioned in the audio:</h4>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.listening.options.map(opt => {
                const isSelected = selectedOptions.includes(opt);
                // Lógica visual simple: si está seleccionado, se pone morado.
                // En una v2 podrías validar contra data.listening.correctItems
                return (
                    <button 
                        key={opt}
                        onClick={() => toggleOption(opt)}
                        className={`p-4 rounded-xl border-4 font-bold transition-all ${isSelected ? 'border-purple-600 bg-purple-100 text-purple-900' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300'}`}
                    >
                        {opt}
                    </button>
                );
            })}
         </div>
      </Card>
      
      {/* Transcript (Spoiler) */}
      <div className="text-center">
        <details className="inline-block">
            <summary className="text-slate-400 text-xs font-black uppercase tracking-widest cursor-pointer hover:text-purple-600">Show Transcript</summary>
            <p className="mt-4 p-6 bg-white border-2 border-slate-100 rounded-2xl italic text-slate-600 max-w-lg mx-auto shadow-inner">
                "{data.listening.text}"
            </p>
        </details>
      </div>
    </div>
  );
};

export default AudioLab;
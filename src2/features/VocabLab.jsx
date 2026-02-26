import React, { useState, useEffect } from 'react';
import { Eye, Layers, Keyboard, Zap } from 'lucide-react';
import { Gallery }                    from '../components/vocab/Gallery';
import { Flashcards }                 from '../components/vocab/Flashcards';
import { WriteTest } from '../components/vocab/WriteTest';
import { MatchGame } from '../components/vocab/MatchGame';

const MODES = [
  { id: 'gallery', label: 'Study',      icon: Eye     },
  { id: 'flash',   label: 'Flashcards', icon: Layers  },
  { id: 'write',   label: 'Write',      icon: Keyboard },
  { id: 'match',   label: 'Match',      icon: Zap     },
];

const VocabLab = ({ data }) => {
  const [mode, setMode] = useState('gallery');
  useEffect(() => setMode('gallery'), [data.id]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-center">
        <div className="p-2 rounded-2xl flex gap-1.5 flex-wrap justify-center item-surface">
          {MODES.map(m => {
            const Icon = m.icon;
            return (
              <button key={m.id} onClick={() => setMode(m.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all border-2 ${mode === m.id ? 'btn-tool' : 'btn-ghost'}`}>
                <Icon size={15} /> {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div key={mode} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {mode === 'gallery' && <Gallery    vocab={data.vocabulary} />}
        {mode === 'flash'   && <Flashcards vocab={data.vocabulary} />}
        {mode === 'write'   && <WriteTest  vocab={data.vocabulary} />}
        {mode === 'match'   && <MatchGame  vocab={data.vocabulary} />}
      </div>
    </div>
  );
};

export default VocabLab;

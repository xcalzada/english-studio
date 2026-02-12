import React, { useState } from 'react';
import { PenTool, Save } from 'lucide-react';
import { Card, Button3D } from '../ui/Neubrutal';

const WritingDraft = ({ data }) => {
  const [text, setText] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
        <div className="bg-orange-600 p-8 rounded-[2rem] text-white shadow-xl border-b-8 border-orange-800 flex items-center justify-between">
            <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Project Draft</h3>
                <p className="text-orange-200 text-xs font-bold uppercase mt-1">Topic: {data.title}</p>
            </div>
            <PenTool size={32} className="opacity-50"/>
        </div>

        <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-80 p-8 rounded-[2rem] border-4 border-slate-200 shadow-inner bg-white text-xl font-bold text-slate-700 outline-none focus:border-orange-500 transition-all resize-none"
            placeholder="Start writing here..."
        />
        
        <div className="flex justify-end">
            <Button3D color="bg-orange-600 text-white" onClick={() => alert('Saved to local storage (Simulated)')}>
                <Save size={20} /> Save Draft
            </Button3D>
        </div>
    </div>
  );
};

export default WritingDraft;
import React, { useState } from 'react';
import { PenTool, Save } from 'lucide-react';
import { Card, Button3D } from '../ui/Neubrutal';

const WritingDraft = ({ data }) => {
  const [text, setText] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
        <div className="bg-orange-600 p-8 rounded-[2.5rem] text-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex items-center justify-between">
            <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Project Draft</h3>
                <p className="text-orange-200 text-xs font-bold uppercase mt-1">Topic: {data.title}</p>
            </div>
            <PenTool size={32} className="opacity-50"/>
        </div>

        <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-80 p-8 rounded-[2.5rem] border-4 border-slate-900 shadow-inner bg-white text-xl font-bold text-slate-700 outline-none focus:border-orange-500 transition-all resize-none"
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
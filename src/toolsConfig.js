// toolsConfig.js — colócalo en: src/toolsConfig.js
// Fuente única de verdad. Importado por App.jsx y UnitMenu.jsx.

import { BookOpen, Lightbulb, Headphones, FileText, PenTool, Hammer } from 'lucide-react';

export const TOOLS_CONFIG = [
  { id: 'grammar',   label: 'Grammar',   icon: BookOpen,   emoji: '📖', desc: 'Theory + interactive exercises'  },
  { id: 'vocab',     label: 'Vocab',     icon: Lightbulb,  emoji: '💡', desc: 'Flashcards, matching & writing'  },
  { id: 'listening', label: 'Listening', icon: Headphones, emoji: '🎧', desc: 'Audio comprehension practice'    },
  { id: 'reading',   label: 'Reading',   icon: FileText,   emoji: '📄', desc: 'Read and answer questions'       },
  { id: 'writing',   label: 'Writing',   icon: PenTool,    emoji: '✏️', desc: 'Free writing with prompts'      },
  { id: 'discovery', label: 'Discovery', icon: Hammer,     emoji: '🔨', desc: 'Study rules then practice'       },
];
import { BookOpen, Lightbulb, Headphones, FileText, PenTool, Hammer } from 'lucide-react';

export const TOOLS_CONFIG = [
  {
    id:    'grammar',
    label: 'Grammar',
    icon:  BookOpen,
    emoji: '📖',
    desc:  'Theory + interactive exercises',
    meta: {
      bg:  'linear-gradient(135deg,rgba(37,99,235,.45),rgba(96,165,250,.15))',
      dot: '#60a5fa',
    },
  },
  {
    id:    'vocab',
    label: 'Vocab',
    icon:  Lightbulb,
    emoji: '💡',
    desc:  'Flashcards, matching & writing',
    meta: {
      bg:  'linear-gradient(135deg,rgba(180,83,9,.45),rgba(251,191,36,.15))',
      dot: '#fbbf24',
    },
  },
  {
    id:    'listening',
    label: 'Listening',
    icon:  Headphones,
    emoji: '🎧',
    desc:  'Audio comprehension practice',
    meta: {
      bg:  'linear-gradient(135deg,rgba(6,78,59,.45),rgba(52,211,153,.15))',
      dot: '#34d399',
    },
  },
  {
    id:    'reading',
    label: 'Reading',
    icon:  FileText,
    emoji: '📄',
    desc:  'Read and answer questions',
    meta: {
      bg:  'linear-gradient(135deg,rgba(131,24,67,.45),rgba(244,114,182,.15))',
      dot: '#f472b6',
    },
  },
  {
    id:    'writing',
    label: 'Writing',
    icon:  PenTool,
    emoji: '✏️',
    desc:  'Free writing with prompts',
    meta: {
      bg:  'linear-gradient(135deg,rgba(29,78,216,.45),rgba(96,165,250,.15))',
      dot: '#60a5fa',
    },
  },
  {
    id:    'discovery',
    label: 'Discovery',
    icon:  Hammer,
    emoji: '🔨',
    desc:  'Study rules then practise',
    meta: {
      bg:  'linear-gradient(135deg,rgba(146,64,14,.45),rgba(251,146,60,.15))',
      dot: '#fb923c',
    },
  },
];

export const TOOLS_BY_ID = Object.fromEntries(TOOLS_CONFIG.map(t => [t.id, t]));

import { useState, useEffect } from 'react';

// ─── Accent map: BCP-47 locale → display info ────────────────────────────────
const ACCENT_MAP = {
  'en-US': { label: 'American',       flag: '🇺🇸', shortCode: 'US' },
  'en-GB': { label: 'British',        flag: '🇬🇧', shortCode: 'UK' },
  'en-AU': { label: 'Australian',     flag: '🇦🇺', shortCode: 'AU' },
  'en-IE': { label: 'Irish',          flag: '🇮🇪', shortCode: 'IE' },
  'en-IN': { label: 'Indian',         flag: '🇮🇳', shortCode: 'IN' },
  'en-ZA': { label: 'South African',  flag: '🇿🇦', shortCode: 'ZA' },
  'en-CA': { label: 'Canadian',       flag: '🇨🇦', shortCode: 'CA' },
  'en-NZ': { label: 'New Zealand',    flag: '🇳🇿', shortCode: 'NZ' },
  'en-NG': { label: 'Nigerian',       flag: '🇳🇬', shortCode: 'NG' },
  'en-SG': { label: 'Singaporean',    flag: '🇸🇬', shortCode: 'SG' },
  'en-HK': { label: 'Hong Kong',      flag: '🇭🇰', shortCode: 'HK' },
};

// ─── Known female voice name fragments (case-insensitive) ────────────────────
const FEMALE_NAMES = new Set([
  'samantha','victoria','karen','moira','fiona','veena','nicky','tessa',
  'serena','hazel','susan','allison','ava','zira','eva','alice','anna',
  'daria','heather','jenny','joanna','kendra','kimberly','ivy','salli',
  'nicole','emma','amy','aria','natasha','raveena','kate','elizabeth',
  'linda','lisa','mary','patricia','barbara','helen','claire','laura',
  'rachel','jessica','sarah','chloe','charlotte','grace','isabella',
  'olivia','sophia','mia','hannah','abigail','emily','madison','ella',
  'zoe','natalie','leah','aubrey','layla','lily','lucy',
]);

const MALE_NAMES = new Set([
  'daniel','alex','fred','tom','lee','gordon','bruce','oliver','george',
  'arthur','matthew','james','david','mark','paul','andrew','john',
  'robert','michael','william','brian','joey','justin','stephan','rishi',
  'xander','liam','noah','ethan','mason','logan','lucas','aiden','henry',
  'ryan','jack','nathan','aaron','elijah','ben','samuel','dylan',
]);

/**
 * Infer gender from voice name using explicit keywords + name matching.
 * Returns 'female' | 'male' | 'unknown'
 */
function inferGender(voiceName) {
  const n = voiceName.toLowerCase();
  if (/\bfemale\b/.test(n)) return 'female';
  if (/\bmale\b/.test(n))   return 'male';

  // Extract first name-like segment (e.g., "Google UK English Female" → already caught above)
  // "Microsoft Zira Desktop" → "zira"
  const words = n.replace(/[^a-z\s]/g, '').split(/\s+/);
  for (const w of words) {
    if (FEMALE_NAMES.has(w)) return 'female';
    if (MALE_NAMES.has(w))   return 'male';
  }
  return 'unknown';
}

/**
 * Map a SpeechSynthesisVoice to its accent bucket.
 * Falls back gracefully for partial matches like "en-US-Wavenet-A".
 */
function resolveAccent(voice) {
  if (ACCENT_MAP[voice.lang]) return ACCENT_MAP[voice.lang];
  const base = voice.lang.split('-').slice(0, 2).join('-');
  return ACCENT_MAP[base] ?? { label: voice.lang, flag: '🌐', shortCode: '??' };
}

/**
 * useVoices()
 *
 * Loads English speech synthesis voices, enriches them with gender + accent,
 * and returns both a flat list and a grouped-by-accent map.
 *
 * The grouped map is:  { 'American': { flag, label, shortCode, voices: [...] }, … }
 * Each voice entry:   { voice (native), name, lang, gender, accent }
 */
export function useVoices() {
  const [voices,  setVoices]  = useState([]);
  const [grouped, setGrouped] = useState({});

  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!supported) return;

    const load = () => {
      const raw = window.speechSynthesis
        .getVoices()
        .filter((v) => v.lang.startsWith('en'));

      // De-duplicate by name (some browsers list the same voice twice)
      const seen = new Set();
      const enriched = [];
      for (const v of raw) {
        if (seen.has(v.name)) continue;
        seen.add(v.name);
        enriched.push({
          voice:        v,
          name:         v.name,
          lang:         v.lang,
          gender:       inferGender(v.name),
          accent:       resolveAccent(v),
          default:      v.default,
          localService: v.localService, // true = OS local voice → fires onboundary in Chrome
        });
      }

      // Sort: local voices first (onboundary reliable), then default, then accent
      enriched.sort((a, b) => {
        if (a.localService !== b.localService) return a.localService ? -1 : 1;
        if (a.default      !== b.default)      return a.default      ? -1 : 1;
        if (a.accent.label !== b.accent.label)
          return a.accent.label.localeCompare(b.accent.label);
        return a.name.localeCompare(b.name);
      });

      // Group by accent
      const byAccent = {};
      for (const v of enriched) {
        const key = v.accent.label;
        if (!byAccent[key]) byAccent[key] = { ...v.accent, voices: [] };
        byAccent[key].voices.push(v);
      }

      setVoices(enriched);
      setGrouped(byAccent);
    };

    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () =>
      window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, [supported]);

  return { voices, grouped, supported };
}
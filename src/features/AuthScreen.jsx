import React, { useState } from 'react';
import { supabase } from '../hooks/useSession';
import { Layers, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Zap, Crown } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36.5 24 36.5c-5.2 0-9.7-3.5-11.2-8.3l-6.5 5C9.5 39.3 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
  </svg>
);

const GUEST_PERKS = [
  '3 ejercicios por unidad',
  'Grammar + Discovery',
  'Sin guardar progreso',
];
const AUTH_PERKS = [
  'Ejercicios ilimitados',
  'Todos los labs',
  'XP, streaks y progreso',
  'Error DNA + calendario',
];

export default function AuthScreen({ onGuest, onSuccess }) {
  const [mode,     setMode]     = useState('landing'); // landing | login | register | verify | reset
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [info,     setInfo]     = useState('');

  const clearMessages = () => { setError(''); setInfo(''); };

  const handleGoogle = async () => {
    setLoading(true); clearMessages();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  const handleLogin = async () => {
    if (!email || !password) return setError('Rellena email y contraseña.');
    setLoading(true); clearMessages();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message === 'Invalid login credentials'
      ? 'Email o contraseña incorrectos.' : error.message); }
    else { onSuccess?.(); }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!email || !password) return setError('Rellena email y contraseña.');
    if (password.length < 6)  return setError('La contraseña debe tener al menos 6 caracteres.');
    setLoading(true); clearMessages();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    setMode('confirm');
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!code) return setError('Introduce el código.');
    setLoading(true); clearMessages();
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
    if (error) setError('Código incorrecto o expirado.');
    setLoading(false);
  };

  const handleReset = async () => {
    if (!email) return setError('Introduce tu email.');
    setLoading(true); clearMessages();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}?reset=1`,
    });
    if (error) setError(error.message);
    else setInfo('Te hemos enviado un email para restablecer la contraseña.');
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key !== 'Enter') return;
    if (mode === 'login')    handleLogin();
    if (mode === 'register') handleRegister();
    if (mode === 'reset')    handleReset();
  };

  // ── Landing ───────────────────────────────────────────────────────────────
  if (mode === 'landing') return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="w-full max-w-sm space-y-5">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-3xl mb-4"
            style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.12)' }}>
            <Layers size={32} style={{ color: 'var(--c0)' }} />
          </div>
          <h1 className="display-font text-4xl text-white mb-1">English Studio</h1>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>Aprende inglés de verdad</p>
        </div>

        {/* Opción cuenta completa */}
        <div className="card-tool p-5"
          style={{ border: '2px solid var(--c0)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Crown size={15} style={{ color: 'var(--c0)' }} />
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--c0)' }}>Cuenta completa</p>
          </div>
          <ul className="space-y-1.5 mb-4">
            {AUTH_PERKS.map(p => (
              <li key={p} className="flex items-center gap-2 text-xs font-semibold text-white">
                <CheckCircle size={12} style={{ color: '#4ade80' }} /> {p}
              </li>
            ))}
          </ul>
          <button onClick={() => setMode('register')}
            className="btn-tool w-full py-3 font-black mb-2">
            Crear cuenta gratis
          </button>
          <button onClick={() => setMode('login')}
            className="w-full text-xs font-black uppercase tracking-widest py-2 transition-colors"
            style={{ color: 'var(--text-3)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
            Ya tengo cuenta → Entrar
          </button>
        </div>

        {/* Opción invitado */}
        <div className="card-tool p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={15} style={{ color: 'var(--text-3)' }} />
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Modo invitado</p>
          </div>
          <ul className="space-y-1.5 mb-4">
            {GUEST_PERKS.map(p => (
              <li key={p} className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }} /> {p}
              </li>
            ))}
          </ul>
          <button onClick={onGuest}
            className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-3)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-3)'; }}>
            Entrar sin cuenta
          </button>
        </div>
      </div>
    </div>
  );

  // ── Auth forms ────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="w-full max-w-sm">

        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-3xl mb-4"
            style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.12)' }}>
            <Layers size={28} style={{ color: 'var(--c0)' }} />
          </div>
          <h1 className="display-font text-3xl text-white mb-1">English Studio</h1>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
            {mode === 'login'    && 'Bienvenido de nuevo'}
            {mode === 'register' && 'Crea tu cuenta gratis'}
            {mode === 'confirm'  && 'Confirma tu email'}
            {mode === 'reset'    && 'Recupera tu contraseña'}
          </p>
        </div>

        <div className="card-tool p-6 space-y-4">

          {mode === 'verify' ? (
            <>
              {info && <InfoMsg msg={info} />}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>
                  Código de verificación
                </label>
                <input type="text" inputMode="numeric" maxLength={6} placeholder="123456"
                  value={code} onChange={e => setCode(e.target.value)} onKeyDown={handleKey}
                  className="w-full px-4 py-3 rounded-xl text-center text-2xl font-black tracking-[0.5em] text-white outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.12)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--c0)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
              </div>
              {error && <ErrorMsg msg={error} />}
              <button onClick={handleVerify} disabled={loading} className="btn-tool w-full py-3 font-black">
                {loading ? 'Verificando...' : 'Verificar cuenta'}
              </button>
              <button onClick={() => { setMode('login'); clearMessages(); }}
                className="w-full text-xs font-black uppercase tracking-widest py-2 transition-colors"
                style={{ color: 'var(--text-3)' }}>← Volver al login</button>
            </>
          ) : (
            <>
              {mode !== 'reset' && (
                <>
                  <button onClick={handleGoogle} disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-black text-sm text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.12)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                    <GoogleIcon /> Continuar con Google
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>o</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
                  <input type="email" placeholder="tu@email.com"
                    value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-semibold text-white outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.12)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--c0)'}
                    onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                </div>
              </div>

              {mode !== 'reset' && (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>Contraseña</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
                    <input type={showPwd ? 'text' : 'password'} placeholder="••••••••"
                      value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKey}
                      className="w-full pl-10 pr-10 py-3 rounded-xl text-sm font-semibold text-white outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.12)' }}
                      onFocus={e => e.target.style.borderColor = 'var(--c0)'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                    <button type="button" onClick={() => setShowPwd(s => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>
                      {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              )}

              {info  && <InfoMsg  msg={info}  />}
              {error && <ErrorMsg msg={error} />}

              <button
                onClick={mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : handleReset}
                disabled={loading} className="btn-tool w-full py-3 font-black">
                {loading ? 'Un momento...' :
                  mode === 'login'    ? 'Entrar' :
                  mode === 'register' ? 'Crear cuenta' : 'Enviar email'}
              </button>

              <div className="flex flex-col items-center gap-2 pt-1">
                {mode === 'login' && (
                  <>
                    <button onClick={() => { setMode('register'); clearMessages(); }}
                      className="text-xs font-black uppercase tracking-widest transition-colors"
                      style={{ color: 'var(--text-3)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                      ¿No tienes cuenta? Regístrate
                    </button>
                    <button onClick={() => { setMode('reset'); clearMessages(); }}
                      className="text-xs font-semibold transition-colors"
                      style={{ color: 'var(--text-3)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                      ¿Olvidaste la contraseña?
                    </button>
                  </>
                )}
                {(mode === 'register' || mode === 'reset') && (
                  <button onClick={() => { setMode('login'); clearMessages(); }}
                    className="text-xs font-black uppercase tracking-widest transition-colors"
                    style={{ color: 'var(--text-3)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                    ← Volver al login
                  </button>
                )}
                <button onClick={() => setMode('landing')}
                  className="text-xs font-semibold transition-colors mt-1"
                  style={{ color: 'var(--text-3)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
                  ← Volver al inicio
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modo invitado */}
        {mode === 'login' && (
          <div className="mt-4 text-center">
            <button onClick={onGuest}
              className="text-xs font-semibold transition-colors"
              style={{ color: 'var(--text-3)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}>
              Continuar como invitado →
            </button>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-3)', opacity: 0.6 }}>
              Acceso limitado · Sin guardar progreso
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const ErrorMsg = ({ msg }) => (
  <div className="flex items-start gap-2 px-4 py-3 rounded-xl"
    style={{ background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.25)' }}>
    <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: '#f87171' }} />
    <p className="text-xs font-semibold" style={{ color: '#f87171' }}>{msg}</p>
  </div>
);

const InfoMsg = ({ msg }) => (
  <div className="flex items-start gap-2 px-4 py-3 rounded-xl"
    style={{ background: 'rgba(74,222,128,0.10)', border: '1px solid rgba(74,222,128,0.25)' }}>
    <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: '#4ade80' }} />
    <p className="text-xs font-semibold" style={{ color: '#4ade80' }}>{msg}</p>
  </div>
);
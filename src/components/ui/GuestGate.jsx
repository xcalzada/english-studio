import React from 'react';
import { Lock } from 'lucide-react';

/**
 * GuestGate — muestra un banner de registro cuando el invitado
 * intenta acceder a contenido bloqueado.
 *
 * Uso en labs bloqueados completos:
 *   <GuestGate onRegister={onRegister} />
 *
 * Uso inline (tras 3 ejercicios):
 *   <GuestGate inline onRegister={onRegister} />
 */
export const GuestGate = ({ onRegister, inline = false }) => {
  if (inline) return (
    <div className="mt-6 p-5 rounded-2xl text-center animate-in slide-in-from-bottom-2"
      style={{ background: 'rgba(99,102,241,0.12)', border: '2px solid rgba(99,102,241,0.30)' }}>
      <p className="text-2xl mb-2">🔒</p>
      <p className="font-black text-white text-sm mb-1">¿Quieres continuar?</p>
      <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-3)' }}>
        Regístrate gratis para acceder a todos los ejercicios y guardar tu progreso.
      </p>
      <button onClick={onRegister}
        className="btn-tool px-6 py-2.5 text-sm font-black">
        Regístrate gratis →
      </button>
    </div>
  );

  return (
    <div className="card-tool p-12 flex flex-col items-center gap-4 text-center">
      <div className="p-4 rounded-2xl" style={{ background: 'rgba(99,102,241,0.12)', border: '2px solid rgba(99,102,241,0.25)' }}>
        <Lock size={28} style={{ color: '#818cf8' }} />
      </div>
      <p className="font-black text-white text-lg uppercase tracking-tight">Contenido exclusivo</p>
      <p className="text-sm font-semibold max-w-xs" style={{ color: 'var(--text-3)' }}>
        Esta sección solo está disponible para usuarios registrados. Es gratis y tarda menos de un minuto.
      </p>
      <button onClick={onRegister} className="btn-tool px-8 py-3 font-black">
        Regístrate gratis →
      </button>
    </div>
  );
};

export default GuestGate;
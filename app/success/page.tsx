'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [totalPaid, setTotalPaid] = useState<string>('34.50');
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');

  useEffect(() => {
    const amount = searchParams.get('amount');
    if (amount) {
      setTotalPaid(amount);
    }
  }, [searchParams]);

  const googleMapsUrl = "https://maps.google.com";

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  return (
    <main className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 font-sans text-slate-800 flex flex-col justify-between">
      
      {/* Cabecera & Recibo Digital */}
      <div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center mb-6 mt-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✓
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-1">¡Pago completado!</h1>
          <p className="text-xs text-slate-500 mb-4">Transacción #TX-94021 • Mesa 04</p>
          
          <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 flex justify-between items-center mb-2">
            <span>Total pagado:</span>
            <span className="font-bold text-slate-900 text-base">{totalPaid} €</span>
          </div>
          <p className="text-[11px] text-slate-400">Hemos enviado el recibo digital a tu banco / Apple Pay.</p>
        </div>

        {/* Módulo de Reseñas Inteligente (Smart Review Gate) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <h2 className="font-extrabold text-slate-900 mb-1">¿Qué tal estuvo tu experiencia?</h2>
          <p className="text-xs text-slate-500 mb-4">Tu opinión ayuda mucho a nuestro equipo</p>

          {/* Selector de Estrellas */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition-transform active:scale-125 ${
                  rating && rating >= star ? 'scale-110 opacity-100' : 'opacity-30 grayscale'
                }`}
              >
                ⭐
              </button>
            ))}
          </div>

          {/* CASO 1: 4 ó 5 Estrellas (Redirección a Google Maps) */}
          {rating && rating >= 4 && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl animate-fade-in">
              <p className="text-xs text-emerald-800 font-bold mb-2">
                ¡Nos alegra muchísimo! 🎉
              </p>
              <p className="text-xs text-emerald-700 mb-3">
                ¿Nos apoyarías dejando una breve reseña pública en Google?
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all"
              >
                <span>⭐ Dejar reseña en Google Maps</span>
              </a>
            </div>
          )}

          {/* CASO 2: 1 a 3 Estrellas (Feedback privado interno) */}
          {rating && rating <= 3 && !feedbackSent && (
            <form onSubmit={handleFeedbackSubmit} className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-left animate-fade-in">
              <p className="text-xs text-amber-900 font-bold mb-1">
                Lamentamos que tu experiencia no fuera perfecta. 🙏
              </p>
              <p className="text-xs text-amber-800 mb-3">
                Cuéntanos qué podemos mejorar (mensajes leídos directamente por la gerencia):
              </p>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Escribe tus comentarios aquí..."
                className="w-full p-2.5 border border-amber-300 rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:border-amber-500 mb-3"
                rows={3}
                required
              />
              <button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 rounded-lg text-xs transition-colors"
              >
                Enviar feedback privado
              </button>
            </form>
          )}

          {/* Confirmación de envío de feedback privado */}
          {feedbackSent && (
            <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-700">
              <p className="font-bold text-slate-900 mb-1">¡Gracias por tus comentarios!</p>
              <p>Hemos notificado al encargado de turno para corregirlo de inmediato.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pie de página */}
      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 underline">
          Volver a la pantalla principal
        </Link>
      </div>

    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-xs text-slate-500">Cargando comprobante...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
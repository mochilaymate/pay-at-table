'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Diccionario multilingüe para la pantalla de éxito
const successTranslations: Record<string, any> = {
  es: {
    successTitle: '¡Pago completado!',
    transaction: 'Transacción #TX-94021 • Mesa 04',
    totalPaid: 'Total pagado:',
    receiptNote: 'Hemos enviado el recibo digital a tu banco / Apple Pay.',
    expTitle: '¿Qué tal estuvo tu experiencia?',
    expSubtitle: 'Tu opinión ayuda mucho a nuestro equipo',
    greatJoy: '¡Nos alegra muchísimo! 🎉',
    googlePrompt: '¿Nos apoyarías dejando una breve reseña pública en Google?',
    googleButton: '⭐ Dejar reseña en Google Maps',
    apology: 'Lamentamos que tu experiencia no fuera perfecta. 🙏',
    feedbackPrompt: 'Cuéntanos qué podemos mejorar (mensajes leídos directamente por la gerencia):',
    placeholder: 'Escribe tus comentarios aquí...',
    sendButton: 'Enviar feedback privado',
    thanksFeedback: '¡Gracias por tus comentarios!',
    notified: 'Hemos notificado al encargado de turno para corregirlo de inmediato.',
    backHome: 'Volver a la pantalla principal',
  },
  en: {
    successTitle: 'Payment successful!',
    transaction: 'Transaction #TX-94021 • Table 04',
    totalPaid: 'Total paid:',
    receiptNote: 'We have sent the digital receipt to your bank / Apple Pay.',
    expTitle: 'How was your experience?',
    expSubtitle: 'Your feedback helps our team a lot',
    greatJoy: 'We are thrilled! 🎉',
    googlePrompt: 'Would you mind leaving a brief public review on Google?',
    googleButton: '⭐ Leave review on Google Maps',
    apology: 'We are sorry your experience wasn’t perfect. 🙏',
    feedbackPrompt: 'Tell us how we can improve (messages read directly by management):',
    placeholder: 'Write your comments here...',
    sendButton: 'Send private feedback',
    thanksFeedback: 'Thank you for your feedback!',
    notified: 'We have notified the shift manager to fix it right away.',
    backHome: 'Back to main screen',
  },
  fr: {
    successTitle: 'Paiement réussi !',
    transaction: 'Transaction #TX-94021 • Table 04',
    totalPaid: 'Total payé :',
    receiptNote: 'Nous avons envoyé le reçu numérique à votre banque / Apple Pay.',
    expTitle: 'Comment s\'est passée votre expérience ?',
    expSubtitle: 'Votre avis aide beaucoup notre équipe',
    greatJoy: 'Nous sommes ravis ! 🎉',
    googlePrompt: 'Pourriez-vous laisser un bref avis public sur Google ?',
    googleButton: '⭐ Laisser un avis sur Google Maps',
    apology: 'Nous sommes désolés si votre expérience n\'a pas été parfaite. 🙏',
    feedbackPrompt: 'Dites-nous ce que nous pouvons améliorer (messages lus par la direction) :',
    placeholder: 'Écrivez vos commentaires ici...',
    sendButton: 'Envoyer un commentaire privé',
    thanksFeedback: 'Merci pour vos commentaires !',
    notified: 'Nous avons prévenu le responsable pour corriger cela immédiatement.',
    backHome: 'Retour à l\'écran principal',
  },
  de: {
    successTitle: 'Zahlung erfolgreich!',
    transaction: 'Transaktion #TX-94021 • Tisch 04',
    totalPaid: 'Gesamtbetrag:',
    receiptNote: 'Wir haben den digitalen Beleg an Ihre Bank / Apple Pay gesendet.',
    expTitle: 'Wie war Ihre Erfahrung?',
    expSubtitle: 'Ihr Feedback hilft unserem Team sehr',
    greatJoy: 'Das freut uns sehr! 🎉',
    googlePrompt: 'Würden Sie uns eine kurze öffentliche Bewertung auf Google hinterlassen?',
    googleButton: '⭐ Bewertung auf Google Maps abgeben',
    apology: 'Es tut uns leid, dass Ihre Erfahrung nicht perfekt war. 🙏',
    feedbackPrompt: 'Sagen Sie uns, was wir verbessern können (wird direkt von der Leitung gelesen):',
    placeholder: 'Schreiben Sie hier Ihre Kommentare...',
    sendButton: 'Privates Feedback senden',
    thanksFeedback: 'Vielen Dank für Ihr Feedback!',
    notified: 'Wir haben den Schichtleiter benachrichtigt, um dies sofort zu beheben.',
    backHome: 'Zurück zum Hauptbildschirm',
  }
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const [totalPaid, setTotalPaid] = useState<string>('34.50');
  const [lang, setLang] = useState<string>('es');
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');

  useEffect(() => {
    const amount = searchParams.get('amount');
    const urlLang = searchParams.get('lang');
    if (amount) setTotalPaid(amount);
    if (urlLang && successTranslations[urlLang]) {
      setLang(urlLang);
    }
  }, [searchParams]);

  const t = successTranslations[lang] || successTranslations.es;
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
          <h1 className="text-2xl font-black text-slate-900 mb-1">{t.successTitle}</h1>
          <p className="text-xs text-slate-500 mb-4">{t.transaction}</p>
          
          <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 flex justify-between items-center mb-2">
            <span>{t.totalPaid}</span>
            <span className="font-bold text-slate-900 text-base">{totalPaid} €</span>
          </div>
          <p className="text-[11px] text-slate-400">{t.receiptNote}</p>
        </div>

        {/* Módulo de Reseñas Inteligente (Smart Review Gate) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <h2 className="font-extrabold text-slate-900 mb-1">{t.expTitle}</h2>
          <p className="text-xs text-slate-500 mb-4">{t.expSubtitle}</p>

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
                {t.greatJoy}
              </p>
              <p className="text-xs text-emerald-700 mb-3">
                {t.googlePrompt}
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all"
              >
                <span>{t.googleButton}</span>
              </a>
            </div>
          )}

          {/* CASO 2: 1 a 3 Estrellas (Feedback privado interno) */}
          {rating && rating <= 3 && !feedbackSent && (
            <form onSubmit={handleFeedbackSubmit} className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-left animate-fade-in">
              <p className="text-xs text-amber-900 font-bold mb-1">
                {t.apology}
              </p>
              <p className="text-xs text-amber-800 mb-3">
                {t.feedbackPrompt}
              </p>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder={t.placeholder}
                className="w-full p-2.5 border border-amber-300 rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:border-amber-500 mb-3"
                rows={3}
                required
              />
              <button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 rounded-lg text-xs transition-colors"
              >
                {t.sendButton}
              </button>
            </form>
          )}

          {/* Confirmación de envío de feedback privado */}
          {feedbackSent && (
            <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-700">
              <p className="font-bold text-slate-900 mb-1">{t.thanksFeedback}</p>
              <p>{t.notified}</p>
            </div>
          )}
        </div>
      </div>

      {/* Pie de página */}
      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 underline">
          {t.backHome}
        </Link>
      </div>

    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-xs text-slate-500">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
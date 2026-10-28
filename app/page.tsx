'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const translations = {
  es: {
    restaurantName: 'MIA CAFE',
    table: 'Mesa',
    splitTitle: '¿Cómo quieres pagar?',
    splitFull: 'Cuenta completa',
    splitEqual: 'Dividir en partes iguales',
    splitCustom: 'Pagar por consumos',
    peopleLabel: 'Personas:',
    selectItemsLabel: 'Selecciona lo que consumiste:',
    itemsTitle: 'Detalle de la cuenta',
    subtotal: 'Subtotal a tu cargo',
    tipLabel: 'Propina',
    tipTitle: '¿Quieres dejar propina al equipo?',
    tipSubtitle: 'Tu propina se reparte 100% entre cocina y sala.',
    customTipPlaceholder: 'Otro importe (€)',
    noTipText: 'Prefiero continuar sin propina',
    totalToPay: 'Total a pagar',
    payButton: 'Pagar con Tarjeta / Apple Pay',
    securePayment: 'Pago 100% seguro y encriptado',
    successTitle: '¡Pago realizado con éxito!',
    successSubtitle: 'Muchas gracias por tu visita a MIA CAFE.',
    ratingTitle: '¿Cómo ha sido tu experiencia?',
    ratingSubtitle: 'Tu opinión nos ayuda a mejorar cada día.',
    reviewPublicTitle: '¡Nos alegra muchísimo!',
    reviewPublicText: '¿Te importaría dejarnos una reseña positiva en Google para ayudarnos a crecer?',
    reviewPublicBtn: 'Dejar reseña en Google ⭐',
    reviewPrivateTitle: 'Lamentamos que tu experiencia no haya sido perfecta',
    reviewPrivateText: 'Cuéntanos qué ha fallado. Este mensaje va directo al dueño del local para solucionarlo.',
    reviewPrivatePlaceholder: 'Escribe tus comentarios aquí...',
    sendFeedbackBtn: 'Enviar comentario al dueño',
    feedbackSentTitle: '¡Gracias por tus comentarios!',
    feedbackSentText: 'El dueño ha recibido tu mensaje directamente. ¡Esperamos verte pronto de nuevo!',
    items: [
      { id: 1, name: '2x Gambas Pil Pil', price: 15.00 },
      { id: 2, name: '1x Coca Cola', price: 2.50 },
      { id: 3, name: '1x Pan', price: 1.50 }
    ]
  },
  en: {
    restaurantName: 'MIA CAFE',
    table: 'Table',
    splitTitle: 'How would you like to pay?',
    splitFull: 'Full bill',
    splitEqual: 'Split equally',
    splitCustom: 'Pay by item',
    peopleLabel: 'People:',
    selectItemsLabel: 'Select what you had:',
    itemsTitle: 'Bill details',
    subtotal: 'Your subtotal',
    tipLabel: 'Tip',
    tipTitle: 'Would you like to tip the team?',
    tipSubtitle: 'Tips are shared 100% among kitchen and front-of-house staff.',
    customTipPlaceholder: 'Custom amount (€)',
    noTipText: 'I prefer to continue without tipping',
    totalToPay: 'Total to pay',
    payButton: 'Pay with Card / Apple Pay',
    securePayment: '100% secure & encrypted payment',
    successTitle: 'Payment successful!',
    successSubtitle: 'Thank you very much for visiting MIA CAFE.',
    ratingTitle: 'How was your experience?',
    ratingSubtitle: 'Your feedback helps us improve every day.',
    reviewPublicTitle: 'We are thrilled!',
    reviewPublicText: 'Would you mind leaving us a positive review on Google to help us grow?',
    reviewPublicBtn: 'Leave a Google Review ⭐',
    reviewPrivateTitle: 'We are sorry your experience wasn’t perfect',
    reviewPrivateText: 'Tell us what went wrong. This message goes directly to the owner to fix it.',
    reviewPrivatePlaceholder: 'Write your feedback here...',
    sendFeedbackBtn: 'Send feedback to the owner',
    feedbackSentTitle: 'Thank you for your feedback!',
    feedbackSentText: 'The owner has received your message directly. We hope to see you again soon!',
    items: [
      { id: 1, name: '2x Gambas Pil Pil', price: 15.00 },
      { id: 2, name: '1x Coca Cola', price: 2.50 },
      { id: 3, name: '1x Pan', price: 1.50 }
    ]
  },
  fr: {
    restaurantName: 'MIA CAFE',
    table: 'Table',
    splitTitle: 'Comment souhaitez-vous payer ?',
    splitFull: 'Note complète',
    splitEqual: 'Diviser également',
    splitCustom: 'Payer par article',
    peopleLabel: 'Personnes :',
    selectItemsLabel: 'Sélectionnez vos consommations :',
    itemsTitle: 'Détail de la note',
    subtotal: 'Votre sous-total',
    tipLabel: 'Pourboire',
    tipTitle: 'Souhaitez-vous laisser un pourboire ?',
    tipSubtitle: 'Les pourboires sont partagés à 100% entre l’équipe.',
    customTipPlaceholder: 'Autre montant (€)',
    noTipText: 'Je préfère continuer sans pourboire',
    totalToPay: 'Total à payer',
    payButton: 'Payer par Carte / Apple Pay',
    securePayment: 'Paiement 100% sécurisé et crypté',
    successTitle: 'Paiement réussi !',
    successSubtitle: 'Merci beaucoup d’avoir visité MIA CAFE.',
    ratingTitle: 'Comment s’est passée votre expérience ?',
    ratingSubtitle: 'Votre avis nous aide à nous améliorer chaque jour.',
    reviewPublicTitle: 'Nous sommes ravis !',
    reviewPublicText: 'Auriez-vous l’amabilité de nous laisser un avis positif sur Google ?',
    reviewPublicBtn: 'Laisser un avis Google ⭐',
    reviewPrivateTitle: 'Nous sommes désolés que votre expérience n’ait pas été parfaite',
    reviewPrivateText: 'Dites-nous ce qui n’a pas fonctionné. Ce message va directement au propriétaire.',
    reviewPrivatePlaceholder: 'Écrivez vos commentaires ici...',
    sendFeedbackBtn: 'Envoyer au propriétaire',
    feedbackSentTitle: 'Merci pour vos commentaires !',
    feedbackSentText: 'Le propriétaire a bien reçu votre message. À bientôt !',
    items: [
      { id: 1, name: '2x Gambas Pil Pil', price: 15.00 },
      { id: 2, name: '1x Coca Cola', price: 2.50 },
      { id: 3, name: '1x Pan', price: 1.50 }
    ]
  },
  de: {
    restaurantName: 'MIA CAFE',
    table: 'Tisch',
    splitTitle: 'Wie möchten Sie bezahlen?',
    splitFull: 'Gesamte Rechnung',
    splitEqual: 'Gleichmäßig teilen',
    splitCustom: 'Nach Einzelposten bezahlen',
    peopleLabel: 'Personen:',
    selectItemsLabel: 'Wählen Sie Ihre Bestelldetails:',
    itemsTitle: 'Rechnungsdetails',
    subtotal: 'Ihr Zwischensumme',
    tipLabel: 'Trinkgeld',
    tipTitle: 'Möchten Sie Trinkgeld geben?',
    tipSubtitle: 'Trinkgelder werden zu 100% an das Team verteilt.',
    customTipPlaceholder: 'Anderer Betrag (€)',
    noTipText: 'Ohne Trinkgeld fortfahren',
    totalToPay: 'Gesamtbetrag',
    payButton: 'Mit Karte / Apple Pay bezahlen',
    securePayment: '100% sichere und verschlüsselte Zahlung',
    successTitle: 'Zahlung erfolgreich!',
    successSubtitle: 'Vielen Dank für Ihren Besuch im MIA CAFE.',
    ratingTitle: 'Wie war Ihre Erfahrung?',
    ratingSubtitle: 'Ihr Feedback hilft uns, jeden Tag besser zu werden.',
    reviewPublicTitle: 'Es freut uns sehr!',
    reviewPublicText: 'Würden Sie uns eine positive Google-Bewertung hinterlassen?',
    reviewPublicBtn: 'Google-Bewertung hinterlassen ⭐',
    reviewPrivateTitle: 'Es tut uns leid, dass Ihre Erfahrung nicht perfekt war',
    reviewPrivateText: 'Teilen Sie uns mit, was schiefgelaufen ist. Diese Nachricht geht direkt an den Inhaber.',
    reviewPrivatePlaceholder: 'Schreiben Sie hier Ihr Feedback...',
    sendFeedbackBtn: 'Feedback an den Inhaber senden',
    feedbackSentTitle: 'Vielen Dank für Ihr Feedback!',
    feedbackSentText: 'Der Inhaber hat Ihre Nachricht direkt erhalten. Bis bald!',
    items: [
      { id: 1, name: '2x Gambas Pil Pil', price: 15.00 },
      { id: 2, name: '1x Coca Cola', price: 2.50 },
      { id: 3, name: '1x Pan', price: 1.50 }
    ]
  }
};

type Lang = 'es' | 'en' | 'fr' | 'de';
type SplitMode = 'full' | 'equal' | 'custom';

function PaymentPage() {
  const searchParams = useSearchParams();
  const mesa = searchParams.get('mesa') || '01';
  const baseTotalParam = parseFloat(searchParams.get('total') || '19.00');

  const [lang, setLang] = useState<Lang>('es');
  const [splitMode, setSplitMode] = useState<SplitMode>('full');
  const [splitPeople, setSplitPeople] = useState<number>(2);
  const [selectedItems, setSelectedItems] = useState<number[]>([1, 2, 3]);

  const [tipType, setTipType] = useState<'percent' | 'custom' | 'none'>('percent');
  const [tipValue, setTipValue] = useState<number>(15);
  const [customInput, setCustomInput] = useState<string>('');

  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [privateComment, setPrivateComment] = useState<string>('');
  const [submittedPrivate, setSubmittedPrivate] = useState<boolean>(false);

  const t = translations[lang];

  // Cálculo de Subtotal según modo de división
  let userSubtotal = baseTotalParam;
  if (splitMode === 'equal') {
    userSubtotal = baseTotalParam / (splitPeople || 1);
  } else if (splitMode === 'custom') {
    userSubtotal = t.items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((acc, item) => acc + item.price, 0);
  }

  // Cálculo de Propina sobre el Subtotal del cliente
  let tipAmount = 0;
  if (tipType === 'percent') {
    tipAmount = (userSubtotal * tipValue) / 100;
  } else if (tipType === 'custom') {
    tipAmount = parseFloat(customInput) || 0;
  }

  const finalTotal = (userSubtotal + tipAmount).toFixed(2);

  const toggleItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        
        {/* Selector de Idiomas */}
        <div className="flex justify-end space-x-2 mb-4">
          {(['es', 'en', 'fr', 'de'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase transition ${
                lang === l
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Cabecera */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.restaurantName}
          </h1>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {t.table} {mesa}
          </p>
        </div>

        {!isPaid ? (
          <>
            {/* Opciones de División de Cuenta */}
            <div className="bg-gray-100 p-1.5 rounded-2xl mb-4 flex text-[11px] font-bold">
              <button
                onClick={() => setSplitMode('full')}
                className={`flex-1 py-2 rounded-xl transition ${
                  splitMode === 'full' ? 'bg-white text-black shadow-sm' : 'text-gray-500'
                }`}
              >
                {t.splitFull}
              </button>
              <button
                onClick={() => setSplitMode('equal')}
                className={`flex-1 py-2 rounded-xl transition ${
                  splitMode === 'equal' ? 'bg-white text-black shadow-sm' : 'text-gray-500'
                }`}
              >
                {t.splitEqual}
              </button>
              <button
                onClick={() => setSplitMode('custom')}
                className={`flex-1 py-2 rounded-xl transition ${
                  splitMode === 'custom' ? 'bg-white text-black shadow-sm' : 'text-gray-500'
                }`}
              >
                {t.splitCustom}
              </button>
            </div>

            {/* Ajuste según el modo de división */}
            {splitMode === 'equal' && (
              <div className="bg-amber-50/60 p-3 rounded-2xl mb-4 border border-amber-100 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700">{t.peopleLabel}</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSplitPeople(Math.max(2, splitPeople - 1))}
                    className="w-7 h-7 bg-white border border-gray-300 rounded-lg font-bold text-gray-700"
                  >
                    -
                  </button>
                  <span className="font-black text-sm">{splitPeople}</span>
                  <button
                    onClick={() => setSplitPeople(splitPeople + 1)}
                    className="w-7 h-7 bg-white border border-gray-300 rounded-lg font-bold text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Selector por ítems */}
            {splitMode === 'custom' && (
              <div className="bg-amber-50/60 p-3 rounded-2xl mb-4 border border-amber-100 text-left">
                <p className="text-[11px] font-bold text-gray-700 mb-2">{t.selectItemsLabel}</p>
                <div className="space-y-1.5">
                  {t.items.map((item) => {
                    const checked = selectedItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex justify-between items-center p-2 rounded-xl text-xs cursor-pointer border transition ${
                          checked ? 'bg-white border-black font-bold' : 'bg-transparent border-transparent opacity-60'
                        }`}
                      >
                        <span>{checked ? '✓ ' : ''}{item.name}</span>
                        <span>{item.price.toFixed(2)} €</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Detalle de consumos y subtotales */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100 text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                {t.itemsTitle}
              </p>
              
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between font-semibold text-gray-700">
                  <span>{t.subtotal}</span>
                  <span>{userSubtotal.toFixed(2)} €</span>
                </div>
                
                {tipAmount > 0 && (
                  <div className="flex justify-between font-semibold text-amber-600">
                    <span>+ {t.tipLabel} ({tipType === 'percent' ? `${tipValue}%` : 'Extra'})</span>
                    <span>+{tipAmount.toFixed(2)} €</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sección de Propinas Persuasiva */}
            <div className="mb-5 bg-amber-50/50 rounded-2xl p-4 border border-amber-100/60 text-left">
              <p className="text-xs font-bold text-gray-900 mb-0.5">{t.tipTitle}</p>
              <p className="text-[11px] text-gray-500 mb-3">{t.tipSubtitle}</p>

              <div className="grid grid-cols-3 gap-2 mb-2.5">
                {[10, 15, 20].map((percent) => {
                  const isSelected = tipType === 'percent' && tipValue === percent;
                  const isRecommended = percent === 15;

                  return (
                    <button
                      key={percent}
                      onClick={() => {
                        setTipType('percent');
                        setTipValue(percent);
                      }}
                      className={`relative py-2.5 rounded-xl text-xs font-bold transition border flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-md'
                          : isRecommended
                          ? 'bg-amber-100/80 text-amber-900 border-amber-300 hover:bg-amber-200/70'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {isRecommended && !isSelected && (
                        <span className="absolute -top-2 bg-black text-amber-300 text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-tighter">
                          ★ Top
                        </span>
                      )}
                      <span className="text-sm font-black">{percent}%</span>
                      <span className="text-[10px] opacity-80 font-normal">
                        {((userSubtotal * percent) / 100).toFixed(2)} €
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                <input
                  type="number"
                  placeholder={t.customTipPlaceholder}
                  value={tipType === 'custom' ? customInput : ''}
                  onChange={(e) => {
                    setTipType('custom');
                    setCustomInput(e.target.value);
                  }}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-black transition"
                />

                <div className="text-center pt-1">
                  <button
                    onClick={() => {
                      setTipType('none');
                      setCustomInput('');
                    }}
                    className={`text-[11px] font-medium transition underline underline-offset-2 ${
                      tipType === 'none'
                        ? 'text-gray-900 font-bold'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {t.noTipText}
                  </button>
                </div>
              </div>
            </div>

            {/* Total Final y Botón de Pago */}
            <div className="pt-2 mb-3">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase">{t.totalToPay}</span>
                <span className="text-2xl font-black text-gray-900">{finalTotal} €</span>
              </div>

              <button
                onClick={() => setIsPaid(true)}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition active:scale-95 text-sm"
              >
                {t.payButton}
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center">
              🔒 {t.securePayment}
            </p>
          </>
        ) : (
          /* PANTALLA DE ÉXITO Y VALORACIÓN / FEEDBACK */
          <div className="text-center py-2 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
              ✓
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-1">{t.successTitle}</h2>
            <p className="text-xs text-gray-500 mb-6">{t.successSubtitle}</p>

            {!submittedPrivate ? (
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left mb-4">
                <p className="text-xs font-bold text-gray-900 mb-1 text-center">{t.ratingTitle}</p>
                <p className="text-[11px] text-gray-500 mb-4 text-center">{t.ratingSubtitle}</p>

                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl transition transform hover:scale-110 ${
                        rating && rating >= star ? 'text-amber-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                {rating !== null && rating >= 4 && (
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100 animate-fadeIn">
                    <p className="text-xs font-bold text-emerald-900 mb-1">{t.reviewPublicTitle}</p>
                    <p className="text-[11px] text-emerald-700 mb-3">{t.reviewPublicText}</p>
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow transition"
                    >
                      {t.reviewPublicBtn}
                    </a>
                  </div>
                )}

                {rating !== null && rating <= 3 && (
                  <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200 animate-fadeIn space-y-2">
                    <p className="text-xs font-bold text-amber-900">{t.reviewPrivateTitle}</p>
                    <p className="text-[11px] text-amber-700">{t.reviewPrivateText}</p>
                    <textarea
                      rows={3}
                      placeholder={t.reviewPrivatePlaceholder}
                      value={privateComment}
                      onChange={(e) => setPrivateComment(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl p-2.5 text-xs text-gray-800 focus:outline-none focus:border-black"
                    />
                    <button
                      onClick={() => setSubmittedPrivate(true)}
                      className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl text-xs transition shadow"
                    >
                      {t.sendFeedbackBtn}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-center animate-fadeIn">
                <p className="text-sm font-bold text-emerald-900 mb-1">{t.feedbackSentTitle}</p>
                <p className="text-xs text-emerald-700">{t.feedbackSentText}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Cargando...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
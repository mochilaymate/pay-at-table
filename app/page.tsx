'use client';

import React, { useState, useEffect } from 'react';

// Diccionario i18n ultraligero sin dependencias externas
const translations: Record<string, any> = {
  es: {
    title: 'Resumen de la cuenta',
    table: 'Mesa',
    subtotal: 'Total consumo',
    tipPrompt: '¿Deseas añadir una propina para el equipo?',
    tipSubtext: 'El 100% va destinado directamente a los camareros y cocina',
    popular: 'Popular',
    customTip: 'Otro importe',
    noTip: 'Continuar sin propina',
    payButton: 'Pagar ahora',
    socialProof: '8 de cada 10 clientes dejan propina hoy',
  },
  en: {
    title: 'Bill summary',
    table: 'Table',
    subtotal: 'Subtotal',
    tipPrompt: 'Would you like to add a tip for the staff?',
    tipSubtext: '100% of tips go directly to the waiters and kitchen team',
    popular: 'Popular',
    customTip: 'Custom amount',
    noTip: 'Continue without tip',
    payButton: 'Pay now',
    socialProof: '8 out of 10 guests leave a tip',
  },
  fr: {
    title: "Résumé de l'addition",
    table: 'Table',
    subtotal: 'Total',
    tipPrompt: "Souhaitez-vous laisser un pourboire à l'équipe ?",
    tipSubtext: '100% des pourboires vont directement au personnel',
    popular: 'Populaire',
    customTip: 'Autre montant',
    noTip: 'Continuer sans pourboire',
    payButton: 'Payer maintenant',
    socialProof: '8 clients sur 10 laissent un pourboire',
  },
  de: {
    title: 'Rechnungsübersicht',
    table: 'Tisch',
    subtotal: 'Zwischensumme',
    tipPrompt: 'Möchten Sie dem Team ein Trinkgeld hinterlassen?',
    tipSubtext: '100% des Trinkgelds gehen direkt an das Service-Team',
    popular: 'Beliebt',
    customTip: 'Anderer Betrag',
    noTip: 'Ohne Trinkgeld fortfahren',
    payButton: 'Jetzt bezahlen',
    socialProof: '8 von 10 Gästen geben Trinkgeld',
  }
};

export default function Home() {
  const subtotalAmount = 30.00;
  const tableNumber = "04";

  const [lang, setLang] = useState('es');
  const [selectedTipPercent, setSelectedTipPercent] = useState<number | null>(15); // Nudge de neuromarketing (15% preseleccionado)
  const [customTip, setCustomTip] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Auto-detección del idioma del dispositivo/reloj
  useEffect(() => {
    const userLang = navigator.language.slice(0, 2).toLowerCase();
    if (translations[userLang]) {
      setLang(userLang);
    } else {
      setLang('en');
    }
  }, []);

  const t = translations[lang] || translations.es;

  const calculateTipAmount = (): number => {
    if (isCustom) {
      return parseFloat(customTip) || 0;
    }
    if (selectedTipPercent === null) return 0;
    return (subtotalAmount * selectedTipPercent) / 100;
  };

  const tipAmount = calculateTipAmount();
  const totalAmount = subtotalAmount + tipAmount;

  return (
    <main className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 font-sans text-slate-800 flex flex-col justify-between">
      
      {/* Cabecera e Idioma */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="bg-slate-200 text-slate-700 font-bold px-3 py-1 rounded-full text-sm">
            {t.table} {tableNumber}
          </span>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)} 
            className="bg-transparent border border-slate-300 rounded-md text-xs px-2 py-1"
          >
            <option value="es">🇪🇸 ES</option>
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="de">🇩🇪 DE</option>
          </select>
        </div>

        {/* Resumen de la cuenta */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 border border-slate-100">
          <h1 className="text-xl font-extrabold text-slate-900 mb-2">{t.title}</h1>
          <div className="flex justify-between items-center text-slate-600 border-b pb-3 mb-3">
            <span>{t.subtotal}</span>
            <span className="font-semibold text-lg">{subtotalAmount.toFixed(2)} €</span>
          </div>
          {tipAmount > 0 && (
            <div className="flex justify-between items-center text-emerald-600 font-medium text-sm">
              <span>Propina</span>
              <span>+{tipAmount.toFixed(2)} €</span>
            </div>
          )}
        </div>

        {/* Módulo de Propinas */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 border border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-slate-900">{t.tipPrompt}</h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">{t.tipSubtext}</p>

          <div className="bg-amber-50 text-amber-800 text-xs px-3 py-1.5 rounded-lg mb-4 flex items-center gap-1.5 font-medium">
            <span>✨</span> {t.socialProof}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            {[10, 15, 20].map((percent) => {
              const amount = (subtotalAmount * percent) / 100;
              const isSelected = !isCustom && selectedTipPercent === percent;
              const isPopular = percent === 15;

              return (
                <button
                  key={percent}
                  onClick={() => {
                    setSelectedTipPercent(percent);
                    setIsCustom(false);
                  }}
                  className={`relative p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-2.5 bg-indigo-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                      {t.popular}
                    </span>
                  )}
                  <span className="text-lg font-extrabold">{percent}%</span>
                  <span className="text-xs text-slate-500 font-medium">+{amount.toFixed(2)}€</span>
                </button>
              );
            })}
          </div>

          <div className="mb-4">
            {!isCustom ? (
              <button
                onClick={() => {
                  setIsCustom(true);
                  setSelectedTipPercent(null);
                }}
                className="w-full text-xs text-indigo-600 font-semibold py-2 hover:underline text-center"
              >
                ✏️ {t.customTip}
              </button>
            ) : (
              <div className="flex gap-2 items-center mt-2">
                <input
                  type="number"
                  placeholder="0.00"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-600"
                  autoFocus
                />
                <span className="text-sm font-bold">€</span>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setSelectedTipPercent(null);
              setIsCustom(false);
              setCustomTip('');
            }}
            className={`w-full py-2 text-xs transition-colors rounded-lg ${
              selectedTipPercent === null && !isCustom
                ? 'text-slate-900 font-bold bg-slate-100'
                : 'text-slate-400 hover:text-slate-600 font-normal'
            }`}
          >
            {t.noTip}
          </button>
        </div>
      </div>

      {/* Botón de Pago Principal */}
      <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 mt-auto">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-slate-500 font-medium">Total a pagar</span>
          <span className="text-2xl font-black text-slate-900">{totalAmount.toFixed(2)} €</span>
        </div>

        <button 
          onClick={() => alert('Simulación de pago iniciada')}
          className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>Pay / GPay / Bizum</span>
          <span>•</span>
          <span>{t.payButton}</span>
        </button>
      </div>

    </main>
  );
}
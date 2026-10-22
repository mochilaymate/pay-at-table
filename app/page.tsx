'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';

// Inicializar Stripe con la llave pública
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const translations: Record<string, any> = {
  es: {
    title: 'Resumen de la cuenta',
    consumption: 'Total consumo',
    tip: 'Propina',
    askTip: '¿Deseas añadir una propina para el equipo?',
    tipSub: 'El 100% va destinado directamente a los camareros y cocina',
    popular: 'POPULAR',
    socialProof: '8 de cada 10 clientes dejan propina hoy',
    customTip: 'Otro importe',
    noTip: 'Continuar sin propina',
    totalToPay: 'Total a pagar',
    payButton: 'Pagar ahora',
    table: 'Mesa 04',
  },
  en: {
    title: 'Bill summary',
    consumption: 'Subtotal',
    tip: 'Tip',
    askTip: 'Would you like to add a tip for the team?',
    tipSub: '100% goes directly to servers and kitchen staff',
    popular: 'POPULAR',
    socialProof: '8 out of 10 customers leave a tip today',
    customTip: 'Custom amount',
    noTip: 'Continue without tip',
    totalToPay: 'Total to pay',
    payButton: 'Pay now',
    table: 'Table 04',
  },
  fr: {
    title: 'Résumé de l\'addition',
    consumption: 'Total consommation',
    tip: 'Pourboire',
    askTip: 'Souhaitez-vous ajouter un pourboire pour l\'équipe ?',
    tipSub: '100% est directement versé aux serveurs et à la cuisine',
    popular: 'POPULAIRE',
    socialProof: '8 clients sur 10 laissent un pourboire aujourd\'hui',
    customTip: 'Autre montant',
    noTip: 'Continuer sans pourboire',
    totalToPay: 'Total à payer',
    payButton: 'Payer maintenant',
    table: 'Table 04',
  },
  de: {
    title: 'Rechnungsübersicht',
    consumption: 'Gesamtverbrauch',
    tip: 'Trinkgeld',
    askTip: 'Möchten Sie ein Trinkgeld für das Team hinzufügen?',
    tipSub: '100% gehen direkt an Kellner und Küche',
    popular: 'BELIEBT',
    socialProof: '8 von 10 Kunden geben heute Trinkgeld',
    customTip: 'Anderer Betrag',
    noTip: 'Ohne Trinkgeld fortfahren',
    totalToPay: 'Gesamtbetrag',
    payButton: 'Jetzt bezahlen',
    table: 'Tisch 04',
  }
};

export default function Home() {
  const [lang, setLang] = useState<string>('es');
  const [baseAmount] = useState<number>(30.00);
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  
  // Estado para gestionar Stripe Checkout
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState<boolean>(false);

  const t = translations[lang] || translations.es;

  const getTipAmount = (): number => {
    if (isCustom) {
      const parsed = parseFloat(customTip);
      return isNaN(parsed) ? 0 : parsed;
    }
    if (selectedPercentage !== null) {
      return (baseAmount * selectedPercentage) / 100;
    }
    return 0;
  };

  const tipAmount = getTipAmount();
  const totalAmount = baseAmount + tipAmount;

  // Iniciar proceso de pago con la API
  const handleStartPayment = async () => {
    setIsLoadingCheckout(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: baseAmount,
          tipAmount: tipAmount,
          tableId: t.table,
          lang: lang,
        }),
      });

      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        alert('Error al inicializar la pasarela de pago. Verifica tus claves de Stripe.');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor de pago.');
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  return (
    <main className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 font-sans text-slate-800 flex flex-col justify-between">
      <div>
        {/* Selector de idioma y mesa */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-1 rounded-full">
            {t.table}
          </span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg text-xs p-1.5 font-medium text-slate-600 focus:outline-none"
          >
            <option value="es">🇪🇸 ES</option>
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="de">🇩🇪 DE</option>
          </select>
        </div>

        {/* Card Resumen de Cuenta */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4">
          <h1 className="text-lg font-extrabold text-slate-900 mb-3">{t.title}</h1>
          <div className="flex justify-between items-center text-sm mb-2 text-slate-600">
            <span>{t.consumption}</span>
            <span className="font-semibold text-slate-900">{baseAmount.toFixed(2)} €</span>
          </div>
          {tipAmount > 0 && (
            <div className="flex justify-between items-center text-sm text-emerald-600 font-medium">
              <span>{t.tip}</span>
              <span>+{tipAmount.toFixed(2)} €</span>
            </div>
          )}
        </div>

        {/* Card Módulo de Propina */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <h2 className="text-sm font-bold text-slate-900 mb-1">{t.askTip}</h2>
          <p className="text-xs text-slate-500 mb-4">{t.tipSub}</p>

          <div className="bg-amber-50 text-amber-800 text-[11px] font-medium p-2.5 rounded-xl mb-4 text-center border border-amber-100">
            ✨ {t.socialProof}
          </div>

          {!isCustom ? (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[10, 15, 20].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setSelectedPercentage(pct)}
                  className={`relative p-3 rounded-xl border text-center transition-all ${
                    selectedPercentage === pct
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {pct === 15 && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {t.popular}
                    </span>
                  )}
                  <div className="text-base font-extrabold">{pct}%</div>
                  <div className="text-[10px] opacity-75">
                    +{(baseAmount * (pct / 100)).toFixed(2)}€
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-3">
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="w-full p-3 border border-indigo-500 rounded-xl text-center text-lg font-bold bg-white text-slate-900 focus:outline-none"
                  autoFocus
                />
                <span className="absolute right-4 top-3.5 text-slate-400 font-bold">€</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center text-xs pt-1">
            <button
              onClick={() => {
                setIsCustom(!isCustom);
                setSelectedPercentage(null);
              }}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isCustom ? 'Volver a %' : `✏️ ${t.customTip}`}
            </button>
            <button
              onClick={() => {
                setSelectedPercentage(null);
                setIsCustom(false);
                setCustomTip('');
              }}
              className="text-slate-400 hover:text-slate-600"
            >
              {t.noTip}
            </button>
          </div>
        </div>
      </div>

      {/* Pie con Total y Formulario Modal de Pago */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100">
        {!clientSecret ? (
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase">{t.totalToPay}</span>
              <span className="text-2xl font-black text-slate-900">{totalAmount.toFixed(2)} €</span>
            </div>

            <button
              onClick={handleStartPayment}
              disabled={isLoadingCheckout}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Pay / GPay / Bizum</span>
              <span>•</span>
              <span>{isLoadingCheckout ? 'Cargando pasarela...' : t.payButton}</span>
            </button>
          </div>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: 'stripe' },
            }}
          >
            <StripePaymentForm
              totalAmount={totalAmount}
              lang={lang}
              onCancel={() => setClientSecret(null)}
            />
          </Elements>
        )}
      </div>
    </main>
  );
}
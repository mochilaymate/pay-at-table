'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Idiomas soportados
const translations = {
  es: {
    restaurantName: 'MIA CAFE',
    table: 'Mesa',
    itemsTitle: 'Detalle de la cuenta',
    subtotal: 'Subtotal',
    tipTitle: 'Añadir propina',
    customTip: 'Otra',
    totalToPay: 'Total a pagar',
    payButton: 'Pagar con Tarjeta / Apple Pay',
    securePayment: 'Pago 100% seguro y encriptado',
    items: [
      { name: '2x Gambas Pil Pil', price: '15.00 €' },
      { name: '1x Coca Cola', price: '2.50 €' },
      { name: '1x Pan', price: '1.50 €' }
    ]
  },
  en: {
    restaurantName: 'MIA CAFE',
    table: 'Table',
    itemsTitle: 'Bill details',
    subtotal: 'Subtotal',
    tipTitle: 'Add a tip',
    customTip: 'Custom',
    totalToPay: 'Total to pay',
    payButton: 'Pay with Card / Apple Pay',
    securePayment: '100% secure & encrypted payment',
    items: [
      { name: '2x Gambas Pil Pil', price: '15.00 €' },
      { name: '1x Coca Cola', price: '2.50 €' },
      { name: '1x Pan', price: '1.50 €' }
    ]
  },
  fr: {
    restaurantName: 'MIA CAFE',
    table: 'Table',
    itemsTitle: 'Détail de la note',
    subtotal: 'Sous-total',
    tipTitle: 'Ajouter un pourboire',
    customTip: 'Autre',
    totalToPay: 'Total à payer',
    payButton: 'Payer par Carte / Apple Pay',
    securePayment: 'Paiement 100% sécurisé et crypté',
    items: [
      { name: '2x Gambas Pil Pil', price: '15.00 €' },
      { name: '1x Coca Cola', price: '2.50 €' },
      { name: '1x Pan', price: '1.50 €' }
    ]
  },
  de: {
    restaurantName: 'MIA CAFE',
    table: 'Tisch',
    itemsTitle: 'Rechnungsdetails',
    subtotal: 'Zwischensumme',
    tipTitle: 'Trinkgeld hinzufügen',
    customTip: 'Eigener',
    totalToPay: 'Gesamtbetrag',
    payButton: 'Mit Karte / Apple Pay bezahlen',
    securePayment: '100% sichere und verschlüsselte Zahlung',
    items: [
      { name: '2x Gambas Pil Pil', price: '15.00 €' },
      { name: '1x Coca Cola', price: '2.50 €' },
      { name: '1x Pan', price: '1.50 €' }
    ]
  }
};

type Lang = 'es' | 'en' | 'fr' | 'de';

function PaymentPage() {
  const searchParams = useSearchParams();
  const mesa = searchParams.get('mesa') || '01';
  const baseTotalParam = parseFloat(searchParams.get('total') || '19.00');

  const [lang, setLang] = useState<Lang>('es');
  const [tipPercentage, setTipPercentage] = useState<number>(0);

  const t = translations[lang];

  // Cálculo de propina y total final
  const tipAmount = (baseTotalParam * tipPercentage) / 100;
  const finalTotal = (baseTotalParam + tipAmount).toFixed(2);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        
        {/* Selector de Idiomas (4 idiomas) */}
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

        {/* Cabecera del Bar */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.restaurantName}
          </h1>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {t.table} {mesa}
          </p>
        </div>

        {/* Detalle de consumos */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100 text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            {t.itemsTitle}
          </p>
          <div className="space-y-2 text-sm text-gray-700">
            {t.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="font-medium text-gray-900">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-gray-200 my-3"></div>
          <div className="flex justify-between text-sm font-semibold text-gray-600">
            <span>{t.subtotal}</span>
            <span>{baseTotalParam.toFixed(2)} €</span>
          </div>
        </div>

        {/* Opciones de Propina */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-left">
            {t.tipTitle}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[0, 5, 10, 15].map((percent) => (
              <button
                key={percent}
                onClick={() => setTipPercentage(percent)}
                className={`py-2 rounded-xl text-xs font-bold transition border ${
                  tipPercentage === percent
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {percent === 0 ? '0%' : `${percent}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Total Final y Botón de Pago */}
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-gray-500">{t.totalToPay}</span>
            <span className="text-2xl font-black text-gray-900">{finalTotal} €</span>
          </div>

          <button
            onClick={() => alert(`Iniciando pago de ${finalTotal} € en MIA CAFE`)}
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-lg transition active:scale-95 text-sm"
          >
            {t.payButton}
          </button>
        </div>

        <p className="text-[10px] text-gray-400 text-center">
          🔒 {t.securePayment}
        </p>
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
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaymentContent() {
  const searchParams = useSearchParams();

  // Captura parámetros dinámicos de la URL
  const mesa = searchParams.get('mesa') || '01';
  const total = searchParams.get('total') || '19.00';

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
        
        {/* Nombre del local */}
        <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-1">
          MIA CAFE
        </h1>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Mesa {mesa}
        </p>

        {/* Desglose de Consumo */}
        <div className="bg-gray-50 rounded-2xl p-4 text-left mb-6 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
            Detalle de la cuenta
          </p>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between items-center">
              <span>2x Gambas Pil Pil</span>
              <span className="font-medium text-gray-900">15.00 €</span>
            </div>
            <div className="flex justify-between items-center">
              <span>1x Coca Cola</span>
              <span className="font-medium text-gray-900">2.50 €</span>
            </div>
            <div className="flex justify-between items-center">
              <span>1x Pan</span>
              <span className="font-medium text-gray-900">1.50 €</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 my-3"></div>

          <div className="flex justify-between items-center text-base font-bold text-gray-900">
            <span>Total a pagar</span>
            <span className="text-lg text-emerald-600">{total} €</span>
          </div>
        </div>

        {/* Botón de Pago */}
        <button
          onClick={() => alert(`Simulación de pago completada por ${total} €`)}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition active:scale-95"
        >
          Pagar {total} €
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Pago seguro por código QR
        </p>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Cargando datos...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
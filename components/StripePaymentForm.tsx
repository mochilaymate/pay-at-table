'use client';

import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
  totalAmount: number;
  lang: string;
  onCancel: () => void;
}

export default function StripePaymentForm({ totalAmount, lang, onCancel }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // Confirmar el pago con Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirección en caso de éxito guardando monto e idioma
        return_url: `${window.location.origin}/success?amount=${totalAmount.toFixed(2)}&lang=${lang}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Ocurrió un error al procesar el pago.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Elemento oficial de Stripe (Tarjeta, Apple Pay, Google Pay, Bizum) */}
      <PaymentElement />

      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-200">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-xs transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-2/3 bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-transform active:scale-[0.99] disabled:opacity-50"
        >
          {isProcessing ? 'Procesando pago...' : `Pagar ${totalAmount.toFixed(2)} €`}
        </button>
      </div>
    </form>
  );
}
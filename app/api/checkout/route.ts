import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, tipAmount, tableId } = body;

    const totalAmountCents = Math.round((amount + tipAmount) * 100);

    if (!totalAmountCents || totalAmountCents <= 0) {
      return NextResponse.json({ error: 'Importe no válido' }, { status: 400 });
    }

    // Creación del PaymentIntent compatible con la API moderna de Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountCents,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        tableId: tableId || 'Mesa 04',
        baseAmount: amount.toFixed(2),
        tipAmount: tipAmount.toFixed(2),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Error al crear PaymentIntent:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
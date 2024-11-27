import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN!
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const preference = {
      items: body.items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/payment/pending`,
      },
      auto_return: "approved",
      purpose: 'wallet_purchase',
    };

    const response = await mercadopago.preferences.create(preference);

    return NextResponse.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al crear la preferencia' },
      { status: 500 }
    );
  }
} 
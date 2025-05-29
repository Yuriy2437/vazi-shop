import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@app/lib/auth'; // Исправленный импорт
import { connect } from '@/lib/db';
import Order from '@/models/order';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await connect();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();

    // Валидация обязательных полей (address не обязателен)
    const { image, name, phone, mail, payment } = body;
    if (!image || !name || !phone || !mail || !payment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      ...body,
      paid: body.paid || 'NO',
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Create error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

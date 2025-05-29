import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@app/lib/auth'; // Исправленный импорт
import Order from '@/models/order';
import { connect } from '@/lib/db';
import mongoose from 'mongoose';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // params — Promise
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await connect();

    const { id } = await context.params; // await params

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      deletedId: id,
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

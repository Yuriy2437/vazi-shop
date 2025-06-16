import { authOptions } from '@app/lib/auth';
import NextAuth from 'next-auth';

// Экспортируем обработчики
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

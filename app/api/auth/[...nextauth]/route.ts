import NextAuth, { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Логин', type: 'text' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        // Исправлено: id должен быть строкой
        const user = { id: '1', name: 'admin', email: 'admin@example.com' };

        if (
          credentials?.username === 'Yuri2437' &&
          credentials?.password === 'Zaika13579246!'
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Явное указание типа
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

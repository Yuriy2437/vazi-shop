import './styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Vazi Souvenir Shop',
  description: 'Official souvenir shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

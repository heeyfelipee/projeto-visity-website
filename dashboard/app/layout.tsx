import './globals.css';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

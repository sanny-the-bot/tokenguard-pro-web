import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TokenGuard Pro - Stop Burning Tokens on OpenClaw',
  description: 'Analyze your OpenClaw logs, identify waste patterns, and save $300-2,000/month on AI costs. Free for up to 50K tokens.',
  keywords: ['OpenClaw', 'AI agents', 'token optimization', 'cost analysis', 'AI tools'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

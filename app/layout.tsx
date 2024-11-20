import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: '3D BUMPERS',
  description: 'High-quality 3D bumpers for helmets.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <div className="logo">3D BUMPERS</div>
          <nav>
            <Link href="">Home</Link>
            <a href="/partners">Partners</a>
          </nav>
        </header>
        {children}
        <footer className="footer">© 2024 3D BUMPERS. All rights reserved.</footer>
      </body>
    </html>
  );
};

export default RootLayout;

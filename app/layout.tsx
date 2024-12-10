import './styles/globals.css';
import { FormProvider } from '@/context/FormContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from '@mui/material/Link';

// MUI Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata = {
  title: '3D Bumpers',
  description: 'Customize your 3D sports helmet bumpers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ textAlign: 'center', padding: '1rem' }}>
          <div className="navbar">
            <div className="logo">
              <Link href="/">
                <Image
                style={{ float: 'left' }}
                  src="/bumpers_logo.png"
                  alt="3D BUMPERS Website Logo"
                  width={150}
                  height={100}
                  priority
                />
              </Link>
            </div>
            <div className="links">
              <Link href="#">Gallery</Link>
              <Link href="#">Become A Vendor</Link>
              <Link href="#">About Us</Link>
              <Link href="#">Contact Us</Link>
            </div>
          </div>
        </header>
        <main>
          <FormProvider>
            {children}
          </FormProvider>
        </main>
        <footer style={{ textAlign: 'center', padding: '1rem', background: '#f8f8f8' }}>
          <p>
            Official Site of 3D BUMPERS.™<br/>
            Trademark Protected. Statutory Damages for infringement of 3D BUMPERS.™
          </p>
        </footer>

        <ToastContainer />
      </body>
    </html>
  );
}

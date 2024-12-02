import './styles/globals.css';
import { FormProvider } from '@/context/FormContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <header style={{ textAlign: 'center', padding: '1rem', background: '#f8f8f8' }}>
          <h1>3D Bumpers App</h1>
        </header>
        <main>
          <FormProvider>
            {children}
          </FormProvider>
        </main>
        <footer style={{ textAlign: 'center', padding: '1rem', background: '#f8f8f8' }}>
          <p>© 2024 3D Bumpers</p>
        </footer>

        <ToastContainer />
      </body>
    </html>
  );
}

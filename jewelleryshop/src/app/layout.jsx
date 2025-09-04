
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Elegance Jewels - Premium Jewelry Collection',
  description: 'Discover exquisite gold, silver & platinum jewelry. Shop handcrafted luxury pieces.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

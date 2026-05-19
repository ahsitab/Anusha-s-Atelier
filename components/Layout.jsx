import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import { MessageCircle } from 'lucide-react';

export default function Layout({ children, title = "Anusha's Atelier | Luxury Fashion" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Premium luxury fashion for the modern woman in Bangladesh." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/8801557766933" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 hover:bg-green-600 transition-all z-50 hover:scale-110 flex items-center justify-center group"
          aria-label="Order on WhatsApp"
        >
          <MessageCircle size={32} />
          <span className="absolute right-16 bg-white text-gray-800 px-4 py-2 text-sm font-medium rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with us
          </span>
        </a>
      </div>
    </>
  );
}

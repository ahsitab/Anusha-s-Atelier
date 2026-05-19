import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4 bg-white p-2 inline-block rounded">
              <img src="/assets/Logo.png" alt="Anusha's Atelier" className="h-12 object-contain" />
            </div>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Elevating everyday elegance. Premium luxury fashion for the modern woman in Bangladesh.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 tracking-wider text-brand-gold">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/category/jewelry" className="hover:text-brand-gold transition-colors">Jewelry Collection</Link></li>
              <li><Link href="/category/three-piece" className="hover:text-brand-gold transition-colors">Three Piece Suits</Link></li>
              <li><Link href="/category/saree" className="hover:text-brand-gold transition-colors">Premium Sarees</Link></li>
              <li><Link href="/category/one-piece" className="hover:text-brand-gold transition-colors">One Piece Dresses</Link></li>
              <li><Link href="/category/sandals" className="hover:text-brand-gold transition-colors">Luxury Sandals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 tracking-wider text-brand-gold">Customer Care</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Delivery Information</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Payment Methods</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 tracking-wider text-brand-gold">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-gold" />
                <span>01557766933</span>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle size={18} className="text-green-500" />
                <span>WhatsApp: 01557766933</span>
              </li>
              <li className="mt-4">
                <p className="mb-2">Subscribe to our newsletter</p>
                <div className="flex">
                  <input type="email" placeholder="Your email address" className="bg-gray-800 text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                  <button className="bg-brand-gold text-brand-black px-4 py-2 font-medium hover:bg-brand-gold-hover transition-colors">
                    Join
                  </button>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Anusha's Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

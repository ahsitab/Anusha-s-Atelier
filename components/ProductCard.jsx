import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Phone } from 'lucide-react';

export default function ProductCard({ product }) {
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-beige-dark">
        {discount > 0 && (
          <div className="absolute top-4 left-4 z-20 bg-brand-pink text-red-800 text-xs font-bold px-3 py-1.5 tracking-wider uppercase shadow-sm">
            -{discount}% OFF
          </div>
        )}
        
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {/* Overlay Actions on Hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4 pointer-events-none">
          <a 
            href={`https://wa.me/8801557766933?text=Hello,%20I%20want%20to%20order:%0A%0AProduct%20Name:%20${encodeURIComponent(product.name)}%0AProduct%20ID:%20${product.id}%0APrice:%20%E0%A7%B3${product.price}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-brand-black p-3 rounded-full hover:bg-green-500 hover:text-white transition-all transform hover:scale-110 shadow-lg flex items-center justify-center pointer-events-auto"
            title="Order on WhatsApp"
          >
            <ShoppingBag size={20} />
          </a>
          <a 
            href="tel:01557766933"
            className="bg-white text-brand-black p-3 rounded-full hover:bg-brand-gold hover:text-white transition-all transform hover:scale-110 shadow-lg flex items-center justify-center pointer-events-auto"
            title="Call Now"
          >
            <Phone size={20} />
          </a>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow text-center bg-white">
        <span className="text-[11px] text-gray-400 uppercase tracking-widest mb-1.5">{product.category}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-serif font-medium text-brand-black hover:text-brand-gold transition-colors mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-center gap-3">
          <span className="font-medium text-brand-black">৳{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">৳{product.oldPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

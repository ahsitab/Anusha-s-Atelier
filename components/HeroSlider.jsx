import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: "/assets/Banner.png",
    title: "Elegance Redefined",
    subtitle: "DISCOVER THE NEW COLLECTION",
    buttonText: "Shop Now",
    link: "/category/saree"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600&auto=format&fit=crop",
    title: "Luxury Evening Wear",
    subtitle: "SHINE AT EVERY OCCASION",
    buttonText: "Explore Collection",
    link: "/category/one-piece"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1599643478514-4a11b154e2ee?q=80&w=1600&auto=format&fit=crop",
    title: "Bridal Heritage",
    subtitle: "TIMELESS KUNDAN JEWELRY",
    buttonText: "View Details",
    link: "/category/jewelry"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-brand-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={slides[current].image} alt="Hero Banner" className="w-full h-full object-cover opacity-70" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white text-sm md:text-base tracking-[0.3em] uppercase mb-4"
            >
              {slides[current].subtitle}
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif text-white mb-8 max-w-4xl leading-tight"
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link href={slides[current].link} className="inline-block bg-brand-gold text-brand-black font-medium tracking-widest uppercase text-sm px-8 py-4 hover:bg-brand-gold-hover transition-colors">
                {slides[current].buttonText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-10">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx ? 'bg-brand-gold w-8' : 'bg-white/50 hover:bg-white'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

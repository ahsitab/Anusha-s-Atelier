import { motion } from 'framer-motion';

const InstagramIcon = ({ size, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const IMAGES = [
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1627918361099-c6e7fc558e65?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599643478514-4a11b154e2ee?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610189014169-3a3399b70b55?q=80&w=400&auto=format&fit=crop",
];

export default function InstagramGallery() {
  return (
    <section className="py-20 bg-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-brand-black mb-4">Follow Us on Instagram</h2>
        <a href="#" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-hover transition-colors font-medium">
          <InstagramIcon size={20} /> @anushas.atelier
        </a>
      </div>

      <div className="flex w-full overflow-hidden">
        {IMAGES.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="relative w-1/2 md:w-1/5 aspect-square group overflow-hidden flex-shrink-0"
          >
            <img src={img} alt="Instagram Gallery Image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <InstagramIcon size={36} className="text-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

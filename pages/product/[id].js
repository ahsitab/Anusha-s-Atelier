import { useRouter } from 'next/router';
import { products } from '@/data/products';
import Head from 'next/head';
import { useState } from 'react';
import { ShoppingBag, Phone, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '@/src/sanity/lib/client';

export default function ProductPage({ product }) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [copied, setCopied] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  if (router.isFallback) {
    return <div className="flex h-screen items-center justify-center font-serif text-2xl text-brand-gold">Loading...</div>;
  }

  const bKashNumber = "01557766933";

  const handleCopy = () => {
    navigator.clipboard.writeText(bKashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = `Hello, I want to order:

Product Name: ${product.name}
Product ID: ${product.id}
Price: ৳${product.price}
Color: ${selectedColor}
Size: ${selectedSize}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-12 pb-24"
    >
      <Head>
        <title>{`${product.name} | Anusha's Atelier`}</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-brand-beige-dark overflow-hidden relative group">
              <img src={product.images?.[0] || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {product.oldPrice && (
                <div className="absolute top-4 left-4 z-10 bg-brand-pink text-red-800 text-xs font-bold px-3 py-1.5 tracking-wider uppercase shadow-sm">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">{product.category} / {product.subcategory}</p>
            <h1 className="text-3xl md:text-4xl font-serif text-brand-black mb-2 leading-tight">{product.name}</h1>
            <p className="text-gray-400 text-sm mb-6">Product ID: {product.id}</p>
            
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-gray-100">
              <span className="text-2xl md:text-3xl font-medium text-brand-black">৳{product.price}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">৳{product.oldPrice}</span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <span className="block text-sm font-medium text-brand-black uppercase tracking-wider mb-3">
                  Color: <span className="text-gray-500 font-normal ml-1">{selectedColor}</span>
                </span>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-sm transition-all ${selectedColor === color ? 'border-brand-black bg-brand-black text-white' : 'border-gray-300 text-gray-600 hover:border-brand-black'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="block text-sm font-medium text-brand-black uppercase tracking-wider">
                    Size: <span className="text-gray-500 font-normal ml-1">{selectedSize}</span>
                  </span>
                  <button className="text-xs text-gray-400 underline uppercase tracking-wider hover:text-brand-black transition-colors">Size Guide</button>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-4 py-2 border text-sm transition-all ${selectedSize === size ? 'border-brand-black bg-brand-black text-white' : 'border-gray-300 text-gray-600 hover:border-brand-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a 
                href={`https://wa.me/8801557766933?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-medium tracking-widest uppercase text-sm px-8 py-4 hover:bg-green-600 transition-colors shadow-md"
              >
                <ShoppingBag size={18} /> Order on WhatsApp
              </a>
              <a 
                href="tel:01557766933"
                className="flex-1 flex items-center justify-center gap-2 bg-brand-black text-white font-medium tracking-widest uppercase text-sm px-8 py-4 hover:bg-gray-800 transition-colors shadow-md"
              >
                <Phone size={18} /> Call Now
              </a>
            </div>

            {/* bKash Payment Info */}
            <div className="bg-brand-beige p-6 mb-8 border border-brand-beige-dark shadow-sm">
              <h3 className="font-serif text-lg font-medium text-brand-black mb-3">bKash Payment</h3>
              <p className="text-sm text-gray-600 mb-4">Send payment to our personal bKash number below, and share the transaction ID on WhatsApp.</p>
              
              <div className="flex items-center justify-between bg-white p-3 border border-gray-200">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest">bKash Personal</span>
                  <span className="font-medium text-lg text-brand-black">{bKashNumber}</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-sm font-medium text-brand-gold hover:text-brand-gold-hover transition-colors"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Collapsible Info */}
            <div className="border-t border-gray-200 pt-4">
              <button 
                onClick={() => setInfoOpen(!infoOpen)}
                className="w-full flex items-center justify-between py-4 text-left font-serif text-lg text-brand-black"
              >
                Delivery & Returns
                {infoOpen ? <ChevronUp size={20} className="text-brand-gold" /> : <ChevronDown size={20} className="text-brand-gold" />}
              </button>
              <AnimatePresence>
                {infoOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-sm text-gray-600 space-y-3 pt-2">
                      <p>• Standard delivery within Dhaka: 1-2 business days (৳70)</p>
                      <p>• Outside Dhaka delivery: 3-5 business days (৳130)</p>
                      <p>• Check product during delivery before paying.</p>
                      <p>• For any issues, contact us within 24 hours of receiving the product.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export async function getStaticPaths() {
  // Only pre-generate local product paths.
  // New Sanity products use fallback: 'blocking' — Next.js builds their page on first visit.
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const localProduct = products.find((p) => p.id === params.id);
  
  const sanityProduct = await client.fetch(`*[_type == "product" && id == $productId][0]{
    id, name, price, oldPrice, category, subcategory, colors, sizes, description, isNew, isTrending, isBestSeller,
    "images": images[].asset->url
  }`, { productId: params.id });

  return {
    props: {
      product: sanityProduct || localProduct,
    },
    revalidate: 10,
  };
}

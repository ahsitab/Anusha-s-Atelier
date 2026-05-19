import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import InstagramGallery from "@/components/InstagramGallery";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import Link from "next/link";
import { motion } from "framer-motion";

import { client } from "@/src/sanity/lib/client";

export default function Home({ sanityProducts, sanityCategories }) {
  const sanityProductIds = sanityProducts?.map(p => p.id) || [];
  const finalProducts = [...(sanityProducts || []), ...products.filter(p => !sanityProductIds.includes(p.id))];

  const sanityCategoryIds = sanityCategories?.map(c => c.id) || [];
  const finalCategories = [...(sanityCategories || []), ...categories.filter(c => !sanityCategoryIds.includes(c.id))];
  
  const trendingProducts = finalProducts.filter(p => p.isTrending || p.trending).slice(0, 4);
  const bestSellers = finalProducts.filter(p => p.isBestSeller || p.bestSeller).slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSlider />

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-black mb-4">Shop by Category</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {finalCategories.map((cat) => (
              <Link href={`/category/${cat.id}`} key={cat.id} className="group relative overflow-hidden block aspect-[4/5]">
                <img src={cat.image || cat.imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-lg md:text-xl font-serif font-medium tracking-wider">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-black mb-4">Trending Now</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/category/three-piece" className="inline-block border border-brand-black text-brand-black px-8 py-3 tracking-widest uppercase text-sm font-medium hover:bg-brand-black hover:text-white transition-colors">
              View All Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-24 relative bg-brand-black overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Promotional Banner" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <span className="text-brand-gold tracking-[0.3em] uppercase text-sm mb-4 block font-medium">Limited Time Offer</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">The Festive Collection</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">Embrace the season with our handpicked festive designs. Experience luxury like never before.</p>
          <Link href="/category/saree" className="inline-block bg-white text-brand-black font-medium tracking-widest uppercase text-sm px-8 py-4 hover:bg-brand-gold hover:text-white transition-colors">
            Shop The Collection
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-black mb-4">Best Sellers</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <InstagramGallery />
    </motion.div>
  );
}

export async function getServerSideProps() {
  const sanityProducts = await client.fetch(`*[_type == "product"]{
    id, name, price, oldPrice, category, subcategory, colors, sizes, description, isNew, isTrending, isBestSeller,
    "images": images[].asset->url
  }`);

  const sanityCategories = await client.fetch(`*[_type == "category"]{
    id, name, description,
    "image": image.asset->url
  }`);

  return {
    props: {
      sanityProducts,
      sanityCategories
    }
  };
}

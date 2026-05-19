import { useRouter } from 'next/router';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useState, useMemo } from 'react';
import Head from 'next/head';
import { Filter, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { client } from '@/src/sanity/lib/client';

export default function CategoryPage({ category, categoryProducts }) {
  const router = useRouter();
  
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (router.isFallback) {
    return <div className="flex h-screen items-center justify-center font-serif text-2xl text-brand-gold">Loading...</div>;
  }

  const toggleSubcategory = (sub) => {
    if (selectedSubcategories.includes(sub)) {
      setSelectedSubcategories(selectedSubcategories.filter(s => s !== sub));
    } else {
      setSelectedSubcategories([...selectedSubcategories, sub]);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];
    
    if (selectedSubcategories.length > 0) {
      result = result.filter(p => selectedSubcategories.includes(p.subcategory));
    }

    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discountA = a.oldPrice ? (a.oldPrice - a.price)/a.oldPrice : 0;
          const discountB = b.oldPrice ? (b.oldPrice - b.price)/b.oldPrice : 0;
          return discountB - discountA;
        });
        break;
      default:
        break;
    }
    
    return result;
  }, [categoryProducts, selectedSubcategories, sortOption]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-beige min-h-screen pb-20"
    >
      <Head>
        <title>{`${category.name} | Anusha's Atelier`}</title>
      </Head>

      {/* Category Hero */}
      <div className="relative h-[40vh] md:h-[50vh] bg-brand-black w-full overflow-hidden">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wider uppercase">{category.name}</h1>
          <p className="text-gray-300 mt-4 tracking-widest text-sm uppercase">Exclusive Collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center bg-white p-4 shadow-sm">
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 font-medium">
              <Filter size={20} />
              Filters
            </button>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent font-medium focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          {/* Sidebar */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white p-6 sticky top-32 shadow-sm">
              <div className="mb-8">
                <h3 className="font-serif text-xl border-b border-gray-100 pb-3 mb-4">Subcategories</h3>
                <div className="space-y-3">
                  {category.subcategories.map(sub => (
                    <label key={sub} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleSubcategory(sub)}>
                      <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedSubcategories.includes(sub) ? 'bg-brand-gold border-brand-gold' : 'border-gray-300 group-hover:border-brand-gold'}`}>
                        {selectedSubcategories.includes(sub) && <Check size={14} className="text-white" />}
                      </div>
                      <span className="text-gray-700">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="hidden lg:flex justify-between items-center mb-8 bg-white p-4 shadow-sm">
              <p className="text-gray-500">Showing {filteredProducts.length} products</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium text-sm">Sort by:</span>
                <select 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent font-medium focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center shadow-sm">
                <p className="text-gray-500 text-lg">No products found for the selected filters.</p>
                <button 
                  onClick={() => setSelectedSubcategories([])}
                  className="mt-4 text-brand-gold font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}

export async function getStaticPaths() {
  const paths = categories.map((category) => ({
    params: { id: category.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const category = categories.find((c) => c.id === params.id);
  
  const sanityProducts = await client.fetch(`*[_type == "product" && category == $catId]{
    id, name, price, oldPrice, category, subcategory, colors, sizes, description, isNew, isTrending, isBestSeller,
    "images": images[].asset->url
  }`, { catId: params.id });

  const localCategoryProducts = products.filter((p) => p.category === category.name);
  const categoryProducts = sanityProducts?.length > 0 ? sanityProducts : localCategoryProducts;

  return {
    props: {
      category,
      categoryProducts,
    },
    revalidate: 60
  };
}

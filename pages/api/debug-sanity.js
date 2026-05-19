import { client } from '@/src/sanity/lib/client';

export default async function handler(req, res) {
  const { catId } = req.query;

  const allProducts = await client.fetch(`*[_type == "product"]{
    _id, id, name, category, isTrending, isBestSeller
  }`);

  const catProducts = catId
    ? await client.fetch(`*[_type == "product" && category == $catId]{
        _id, id, name, category
      }`, { catId })
    : [];

  res.json({
    totalProducts: allProducts.length,
    allProducts,
    catId,
    catProducts,
  });
}

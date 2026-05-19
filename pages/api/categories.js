import { client } from '@/src/sanity/lib/client';
import { categories as localCategories } from '@/data/categories';

export default async function handler(req, res) {
  try {
    const sanityCategories = await client.fetch(`*[_type == "category"]{
      id, name
    }`);

    // Merge Sanity categories with local ones, keeping Sanity ones first
    const sanityIds = sanityCategories.map(c => c.id);
    const merged = [
      ...sanityCategories,
      ...localCategories.filter(c => !sanityIds.includes(c.id))
    ];

    res.status(200).json(merged);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json(localCategories);
  }
}

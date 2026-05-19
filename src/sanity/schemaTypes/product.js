export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Product ID (SKU)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (BDT)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'oldPrice',
      title: 'Old Price (BDT)',
      type: 'number',
      description: 'Used to show original price before discount'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'isNew',
      title: 'New Arrival',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'isTrending',
      title: 'Trending',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'isBestSeller',
      title: 'Best Seller',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
      media: 'images.0'
    }
  }
}

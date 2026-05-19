export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Category ID (slug)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}

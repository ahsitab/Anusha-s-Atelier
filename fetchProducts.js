// Native fetch in Node v22

const projectId = 'hsq4x5ka';
const dataset = 'production';
const query = encodeURIComponent('*[_type == "product"]{id, name, category, isTrending}');

fetch(`https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${query}`)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);

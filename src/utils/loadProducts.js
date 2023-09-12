export const loadProducts = async () => {
  const response = await fetch('http://localhost:3000/product/list-products');
  const data = await response.json();
  return data;
};

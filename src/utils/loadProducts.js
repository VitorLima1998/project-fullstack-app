export const loadProducts = async () => {
  const productsResponse = await fetch('/product/list-products');

  const products = await productsResponse.json();

  return products;
};

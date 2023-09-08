import React, { useState, useEffect, useCallback } from 'react';
import { loadProducts } from '../../utils/loadProducts';
import { Button } from '../Button';
import { ProdCard } from '../ProdCard';
import './styles.scss';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [productPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState('');

  // -------------------------------------------------------------------------------------

  const filteredProducts = !!searchValue
    ? allProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : products;

  // -------------------------------------------------------------------------------------

  const handleLoadProducts = useCallback(async (page, productPerPage) => {
    const data = await loadProducts();
    setProducts(data.products.slice(page, productPerPage));
    setAllProducts(data.products);
  }, []);

  // -------------------------------------------------------------------------------------

  const loadMoreProducts = () => {
    const nextPage = page + productPerPage;
    const nextProducts = allProducts.slice(nextPage, nextPage + productPerPage);

    setProducts([...products, ...nextProducts]);
    setPage(nextPage);
  };

  // -------------------------------------------------------------------------------------

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  // -------------------------------------------------------------------------------------

  useEffect(() => {
    handleLoadProducts(0, productPerPage);
  }, [handleLoadProducts, productPerPage]);

  // -------------------------------------------------------------------------------------

  return (
    <section className='container'>
      <div className='products'>
        {filteredProducts.map((product) => (
          <ProdCard key={product.id} product={product} />
        ))}
      </div>
      <Button text='Load More Products' action={loadMoreProducts} />
    </section>
  );
};

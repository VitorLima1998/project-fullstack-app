import React, { useState, useEffect, useCallback } from 'react';
import { loadProducts } from '../../utils/loadProducts';
import { Button } from '../Button';
import { ProdCard } from '../ProductCard';
import { Input } from '../Input';
import { logout } from '../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaRegPlusSquare, FaRunning } from 'react-icons/fa';

import './styles.scss';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [productPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  // -------------------------------------------------------------------------------------

  const filteredProducts = !!searchValue
    ? allProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : products;

  // -------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast.success('Logout successfully!');
      navigate('/');
    }
  };

  // -------------------------------------------------------------------------------------

  const handleLoadProducts = useCallback(async (page, productPerPage) => {
    const products = await loadProducts();
    setProducts(products.data.slice(page, productPerPage));
    setAllProducts(products.data);
  }, []);

  console.log(products);
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
      <div className='nav'>
        <Input
          type='text'
          name='txtSearch'
          placeholder='Search...'
          value={searchValue}
          onChange={handleSearch}
          id='inputOutline'
        />
        <Button text='Add Products' icon={<FaRegPlusSquare />} />
        <Button text='Logout' action={handleLogout} icon={<FaRunning />} />
      </div>
      <div className='products'>
        {filteredProducts.map((product) => (
          <ProdCard key={product.id} product={product} />
        ))}
      </div>
      <Button text='Load More Products' action={loadMoreProducts} />
    </section>
  );
};

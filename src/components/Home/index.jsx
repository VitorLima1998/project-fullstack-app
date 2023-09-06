import { Component } from 'react';
import { loadProducts } from '../../utils/loadProducts';
import { Button } from '../Button';
import { ProdCard } from '../ProdCard';

class Home extends Component {
  state = {
    products: [],
    allproducts: [],
    page: 0,
    productsPerPage: 6,
    searchValue: '',
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const { page, productsPerPage } = this.state;
    const products = await loadProducts();

    this.setState({
      products: products.slice(page, productsPerPage),
      allproducts: products,
    });
  };

  loadMoreProducts = () => {
    const { products, allproducts, page, productsPerPage } = this.state;
    const nextPage = page + productsPerPage;
    const nextProducts = allproducts.slice(
      nextPage,
      nextPage + productsPerPage
    );
    this.setState({ products: [...products, ...nextProducts], page: nextPage });
  };

  handleSearch = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { products, searchValue } = this.state;

    const filteredProducts = !!searchValue
      ? products.filter((prod) => {
          return prod.title
            .toLowerCase()
            .includes(searchValue.toLocaleLowerCase());
        })
      : products;

    return (
      <section className='container'>
        <div className='products'>
          {filteredProducts.map((prod) => (
            <ProdCard key={prod.id} product={prod} />
          ))}
        </div>
        <Button text='Load more products' action={this.loadMoreProducts} />
      </section>
    );
  }
}

export default Home;

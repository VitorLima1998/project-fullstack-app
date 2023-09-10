import { Image } from '../Image';
import './styles.scss';

export const ProdCard = ({ product }) => {
  return (
    <div className='product' key={product.id}>
      <Image src={product.thumbnail} alt={product.title} />
      <div className='text'>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h3>${product.price.toFixed(2)}</h3>
      </div>
    </div>
  );
};

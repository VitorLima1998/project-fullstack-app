import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Image } from '../Image';
import './styles.scss';

export const ProdCard = ({ product }) => {
  return (
    // const {onChange,onClickItem,onClickThumb} = this.props;
    <div className='product' key={product.id}>
      <Carousel useKeyboardArrows={true}>
        {product.images.map((image, index) => (
          <div key={index}>
            <Image src={image.url} alt={`Product ${index}`} />
          </div>
        ))}
      </Carousel>
      <div className='text'>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h3>${product.price.toFixed(2)}</h3>
      </div>
    </div>
  );
};

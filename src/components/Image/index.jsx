import './styles.scss';
export const Image = ({ src }) => {
  return (
    <div className='container-img'>
      <img src={src} alt='img' />
    </div>
  );
};

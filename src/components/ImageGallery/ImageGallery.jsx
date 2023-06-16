import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

const ImageGallery = ({ images, getLargeImage }) => {
  return (
    <ul className={style.imageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            description={tags}
            image={webformatURL}
            key={id}
            openModal={() => getLargeImage(largeImageURL)}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  getLargeImage: PropTypes.func.isRequired,
};

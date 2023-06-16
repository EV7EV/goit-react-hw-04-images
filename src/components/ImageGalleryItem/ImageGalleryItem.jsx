import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, openModal, description }) => {
  return (
    <>
      <li className={style.imageGalleryItem}>
        <img
          onClick={openModal}
          src={image}
          alt={description}
          className={style.imageGalleryItemImage}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

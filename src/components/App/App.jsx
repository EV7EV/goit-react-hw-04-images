import { useEffect, useState } from 'react';
import style from './App.module.css';
import { SearchBar } from 'components/Searchbar/SearchBar';
import { findImage } from '../../api/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  // state = {
  //   images: [],
  //   page: 1,
  //   query: '',
  //   showModal: false,
  //   largeImage: null,
  //   isLoading: false,
  //   showButton: false,
  // };

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // метод для отримання великого зображення

  const getLargeImage = image => {
    modalTogal();
    setLargeImage(image);
  };

  // const componentDidUpdate(_, prevState) {
  //   const { page, query } = this.state;

  //   if (prevState.query !== query || prevState.page !== page) {
  //     this.getImages(query, page);
  //   }
  // }

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await findImage(query, page);

        // setImages([...images, ...hits]);
        setImages(prevState => [...prevState, ...hits]);

        setShowButton(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [page, query]);

  const onHandleSubmit = value => {
    setImages([]);
    setQuery(value);
    setPage(1);
    setIsLoading(false);
    setShowButton(false);
  };

  const modalTogal = () => {
    setShowModal(!showModal);
  };
  // Функція яка завантажує додаткові зображення
  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={style.App}>
      <SearchBar onHandleSubmit={onHandleSubmit} />
      <ImageGallery images={images} getLargeImage={getLargeImage} />
      {showButton && <Button onClick={onLoadMore} />}
      {showModal && <Modal largeImage={largeImage} onClose={modalTogal} />}
      {isLoading && <Loader />}
    </div>
  );
};

import { Component } from 'react';
import style from './App.module.css';
import { SearchBar } from 'components/Searchbar/SearchBar';
import { findImage } from '../../api/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    showModal: false,
    largeImage: null,
    isLoading: false,
    showButton: false,
  };

  // метод для отримання великого зображення

  getLargeImage = image => {
    this.modalTogal();
    this.setState({ largeImage: image });
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }

  onHandleSubmit = value => {
    this.setState({ images: [], query: value, page: 1 });
  };

  getImages = async (name, page) => {
    if (!name) {
      return;
    }
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await findImage(name, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        showButton: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  modalTogal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };
  // Функція яка завантажує додаткові зображення
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, showModal, largeImage, isLoading, showButton } = this.state;

    return (
      <div className={style.App} onClick={this.handleBackdropClick}>
        <SearchBar onHandleSubmit={this.onHandleSubmit} />
        <ImageGallery images={images} getLargeImage={this.getLargeImage} />
        {showButton && <Button onClick={this.onLoadMore} />}
        {showModal && (
          <Modal largeImage={largeImage} onClose={this.modalTogal} />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}

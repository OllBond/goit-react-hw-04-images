import { Component } from 'react';
import { Notify } from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from '../../shared/components/Modal/Modal';
import ImageDetails from './ImageDetails/ImageDetails';
import Loader from './Loader/Loader';
import { searchImage } from '../../shared/components/Modal/services/img-serch-api';

class ImageSearch extends Component {
  state = {
    search: '',
    items: [],
    page: 1,
    loading: false,
    error: null,
    imageDetails: null,
    showModal: false,
    totalHits: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    // якщо попередня строка пошуку не дорівнює актуальній
    // і попередня строка не дорівнює новій сторінці
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }
  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      // айякс запит
      const data = await searchImage(search, page);
      data.hits.length === 0
        ? Notify.info('Sorry, nothing found')
        : //дописуємо новий items - це розпилений старий items і розпилений hits
          // те, що отримали з 2,3 сторінки дописуємо в те, що було
          this.setState(({ items }) => ({ items: [...items, ...data.hits] }));
      this.setState({ totalHits: data.totalHits });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }
  searchImage = ({ search }) => {
    // коли починається пошук page має бути з 1 сторінки а items - пустий
    this.setState({ search, items: [], page: 1 });
  };
  onLoadMore = () => {
    // передаємо call-back, бо змінюється state
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  showImage = ({ largeImageURL, tags }) => {
    this.setState({
      imageDetails: { largeImageURL, tags },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      imageDetails: null,
    });
  };

  render() {
    const { items, loading, error, showModal, imageDetails, totalHits } =
      this.state;
    const { searchImage, onLoadMore, showImage, closeModal } = this;
    return (
      <div>
        <Searchbar onSubmit={searchImage} />
        {items.length !== 0 && (
          <ImageGallery items={items} showImage={showImage} />
        )}
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {totalHits > items.length && !loading && (
          <Button onLoadMore={onLoadMore} />
        )}
        {showModal && (
          <Modal close={closeModal}>
            <ImageDetails {...imageDetails} />
          </Modal>
        )}
      </div>
    );
  }
}

export default ImageSearch;

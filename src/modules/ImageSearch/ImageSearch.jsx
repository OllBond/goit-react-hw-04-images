import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from '../../shared/components/Modal/Modal';
import ImageDetails from './ImageDetails/ImageDetails';
import Loader from './Loader/Loader';
import { searchImage } from '../../shared/components/Modal/services/img-serch-api';

const ImageSearch = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [imageDetails, setImageDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
    // якщо змінився search або page створюємо fetchImages
    // яка відправляє запит
    const fetchImages = async () => {
      try {
        setLoading(true);
        // айякс запит
        const data = await searchImage(search, page);
        data.hits.length === 0
          ? Notify.info('Sorry, nothing found')
          : // розпилюємо prevItems щоб дописати: старі картинки і додати нові
            setItems(prevItems => [...prevItems, ...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    // запустили ф-ю для запиту
    fetchImages();
  }, [search, page]);

  const onSearchImage = ({ search }) => {
    // коли починається пошук page має бути з 1 сторінки а items - пустий
    setSearch(search);
    setItems([]);
    setPage(1);
  };
  const showImage = ({ largeImageURL, tags }) => {
    setImageDetails({ largeImageURL, tags });
    setShowModal(true);
  };
  const onLoadMore = () => {
    // передаємо call-back, бо змінюється state
    setPage(prevPage => prevPage + 1);
  };
  const closeModal = () => {
    // закриває модалку
    setShowModal(false);
    // обнуляє ImageDetails
    setImageDetails(null);
  };
  return (
    <div>
      <Searchbar onSubmit={onSearchImage} />
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
};
export default ImageSearch;

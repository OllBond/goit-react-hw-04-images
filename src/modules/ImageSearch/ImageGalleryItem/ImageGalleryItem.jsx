import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
const ImageGalleryItem = ({ src, showImage, largeImageURL, tags }) => {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => showImage({ largeImageURL, tags })}
    >
      <img className={css.imageGalleryItemImage} src={src} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

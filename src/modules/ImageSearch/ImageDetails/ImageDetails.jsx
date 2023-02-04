import PropTypes from 'prop-types';
const ImageDetails = ({ tags, largeImageURL }) => {
  return <img src={largeImageURL} alt={tags} width="700" />;
};
export default ImageDetails;
ImageDetails.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

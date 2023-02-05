import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import initialState from './initialState';
import useForm from 'shared/components/Modal/hooks/useForm';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  // кастомний хук
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { search } = state;
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <BsSearch />
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
        <input
          onChange={handleChange}
          className={css.searchFormInput}
          value={search}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

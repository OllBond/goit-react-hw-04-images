import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import initialState from './initialState';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  // target - це деструктуризація event
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };
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

// class Searchbar extends Component {
//   state = {
//     search: '',
//   };
//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value });
//   };
//   handleSubmit = e => {
//     e.preventDefault();
//     const { onSubmit } = this.props;
//     onSubmit({ ...this.state });
//     this.reset();
//   };
//   reset() {
//     this.setState({
//       search: '',
//     });
//   }
//   render() {
//     const { search } = this.state;
//     const { handleChange, handleSubmit } = this;
//     return (
//       <header className={css.searchbar}>
//         <form className={css.searchForm} onSubmit={handleSubmit}>
//           <button type="submit" className={css.searchFormButton}>
//             <BsSearch />
//             <span className={css.searchFormButtonLabel}>Search</span>
//           </button>
//           <input
//             onChange={handleChange}
//             className={css.searchFormInput}
//             value={search}
//             name="search"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             required
//           />
//         </form>
//       </header>
//     );
//   }
// }

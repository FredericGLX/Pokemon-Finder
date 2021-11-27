import { useState } from 'react';
import { getPokemonData } from '../actions/pokemonAction';
import { useDispatch } from 'react-redux';
import '../styles/PokemonSearch.css';

const PokemonSearch = (props) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const FetchData = () => {
    dispatch(getPokemonData(search));
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    FetchData();
    props.history.push(`/pokemon/${search}`);
  };

  return (
    <div className="bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchInput"
          placeholder="Search a Pokemon"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default PokemonSearch;

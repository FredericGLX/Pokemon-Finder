import _ from 'lodash';
import { useState } from 'react';
import { getPokemonData } from '../actions/pokemonAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const history = useHistory();

  const SeachBarSmall = () => {
    const [search, setSearch] = useState();
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
      history.push(`/pokemon/${search}`);
    };
    return (
      <div className="bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="searchInput"
            placeholder="Search a Pokemon"
            onChange={handleChange}
            autoFocus="on"
          />
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1 className="pokemon-name">Poke App</h1>
      <SeachBarSmall />
    </div>
  );
};

export default Header;

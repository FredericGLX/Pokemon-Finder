import axios from 'axios';

export const getPokemonData = (pokemon) => async (dispatch) => {
  try {
    dispatch({
      type: 'POKEMON_DATA_LOADING',
    });

    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    dispatch({
      type: 'POKEMON_DATA_SUCCESS',
      payload: res.data,
      pokemonName: pokemon,
    });
  } catch (e) {
    dispatch({
      type: 'POKEMON_DATA_FAIL',
    });
  }
};

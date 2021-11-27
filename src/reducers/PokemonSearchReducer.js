const defaultState = {
  loading: false,
  data: {},
  errorMsg: '',
};

const PokemonSearchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'POKEMON_DATA_LOADING':
      return {
        ...state,
        loading: true,
        errorMsg: '',
      };
    case 'POKEMON_DATA_FAIL':
      return {
        ...state,
        loading: false,
        errorMsg: "Error: cannot find the pokemon you're looking for.",
      };
    case 'POKEMON_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        errorMsg: '',
        data: action.payload,
      };

    default:
      return state;
  }
};

export default PokemonSearchReducer;

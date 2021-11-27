import { combineReducers } from 'redux';
import PokemonSearchReducer from './PokemonSearchReducer';

const rootReducer = combineReducers({
  PokemonSearch: PokemonSearchReducer,
});

export default rootReducer;

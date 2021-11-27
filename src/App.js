import { Route, Redirect } from 'react-router-dom';
import Header from './container/Header';
import PokemonResult from './container/PokemonResult';
import PokemonSearch from './container/PokemonSearch';

function App() {
  return (
    <div className="App">
      <Route path={'/'} exact component={Header} />
      <Route path={'/pokemon/:pokemon'} exact component={PokemonResult} />
      <Redirect to={'/'} />
    </div>
  );
}

export default App;

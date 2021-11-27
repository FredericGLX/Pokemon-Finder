import _ from 'lodash';
import { useSelector } from 'react-redux';
import Header from './Header';
import spinner from '../img/spinner.svg';
import '../styles/PokemonResult.css';
import '../styles/PokemonInformation.css';
import '../styles/PokemonStats.css';
import '../styles/PokemonTypeEffectiveness.css';
import '../styles/Types.css';
import {
  capitalizeFirstLetter as capitalize,
  shortenStatName,
  changeStatBarColor,
} from '../helper/helper';
import types_data from '../data/all_types.json';

const PokemonResult = () => {
  const pokemonState = useSelector((state) => state.PokemonSearch.data);
  const pokemonLoading = useSelector((state) => state.PokemonSearch.loading);
  const pokemonError = useSelector((state) => state.PokemonSearch.errorMsg);

  const Loading = () => {
    if (pokemonLoading) {
      return <img className="spinner" src={spinner} alt="loading spinner" />;
    }

    if (pokemonError) {
      return <p>{pokemonError}</p>;
    }

    if (!_.isEmpty(pokemonState)) {
      <p>Error getting the pokemon</p>;
    }
  };

  const PokemonInformation = () => {
    if (!_.isEmpty(pokemonState)) {
      const sprite1 = pokemonState.sprites.front_default;
      const inGameSprites = pokemonState.sprites.other.home;

      return (
        <div className="info-container">
          <div className="info-title">
            <h1 className="info-main-title">Information</h1>
            <h1>{capitalize(pokemonState.name)}</h1>
          </div>
          <div className="info-subContainer-1">
            <div className="info-top-left">
              <img
                className="sprite-artwork"
                src={sprite1}
                alt={`Artwork of ${pokemonState.name}`}
              />
            </div>
            <div>
              <div className="main-types">
                {pokemonState.types.map((el, key) => {
                  return (
                    <div key={key} className={`${el.type.name}`}>
                      <b>{capitalize(el.type.name)}</b>
                    </div>
                  );
                })}
              </div>
              <br></br>
              <div>
                <p>
                  <b>Weight: </b>
                  {pokemonState.weight / 10}kg
                </p>
                <p>
                  <b>Height: </b>
                  {pokemonState.height / 10}m
                </p>
              </div>
            </div>
          </div>
          <div className="blue-div">
            <div className="abilites">
              {pokemonState.abilities.map((el, i) => {
                return (
                  <p key={i}>
                    <b>{i === 2 ? 'Hidden ability: ' : `Ability ${i + 1}: `}</b>
                    {capitalize(el.ability.name)}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="sprites-container">
            <h1 className="info-title">In-game sprites</h1>
            <div className="sprites-in-game">
              <div>
                <b>
                  <p>Normal</p>
                </b>
                <img
                  className="sprite-individual"
                  src={inGameSprites.front_default}
                  alt={`In-game artwork of ${pokemonState.name}`}
                />
              </div>
              <div>
                <b>
                  <p>Shiny</p>
                </b>
                <img
                  className="sprite-individual"
                  src={inGameSprites.front_shiny}
                  alt={`Shiny in-game artwork of ${pokemonState.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const pokemonStats = () => {
    if (!_.isEmpty(pokemonState)) {
      return (
        <div className="stats-container">
          <h1>Base stats</h1>
          <div className="stats-sub-container">
            <h3>
              {pokemonState.stats.map((el, key) => {
                return (
                  <div key={key} className="stats-table">
                    <table>
                      <tbody>
                        <tr>
                          <td className="stat-name">
                            {capitalize(shortenStatName(el.stat.name))}:
                          </td>
                          <td>{el.base_stat}</td>
                          <td>
                            <div className="loadbar">
                              <span
                                className="stat-bars"
                                style={{
                                  width: `${el.base_stat}%`,
                                  backgroundColor: `${changeStatBarColor(
                                    el.base_stat
                                  )}`,
                                }}
                              ></span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </h3>
          </div>
        </div>
      );
    }
  };

  const PokemonChart = () => {
    if (!_.isEmpty(pokemonState)) {
      const allTypes = Object.entries(types_data);
      allTypes.map(([key, value]) => {
        return pokemonState.types.map((el) => {
          if (el.type.name === key) {
            return <p key={el.type.name}>{el.type.name}</p>;
          }
        });
      });

      let weaknesses = {};
      pokemonState.types.forEach((item) => {
        let defense = types_data[item.type.name];
        Object.entries(defense).forEach(([key, value]) => {
          switch (key) {
            case 'double':
              value.forEach((i) => {
                weaknesses[i] ? (weaknesses[i] *= 2) : (weaknesses[i] = 2);
              });
              break;
            case 'half':
              value.forEach((i) => {
                weaknesses[i] ? (weaknesses[i] *= 0.5) : (weaknesses[i] = 0.5);
              });
              break;
            case 'zero':
              value.forEach((i) => {
                weaknesses[i] = 0;
              });
              break;
            default:
              return;
          }
        });
      });

      const weaknessDisplay = [];
      const strengthDisplay = [];
      const immunityDisplay = [];
      Object.entries(weaknesses).forEach(([key, value]) => {
        const renderType = (arr) => {
          return arr.push(
            <b className={`types ${key}`} key={key}>
              {capitalize(key)} x{value}
            </b>
          );
        };
        if (value > 1) renderType(weaknessDisplay);
        if (value > 0 && value < 1) renderType(strengthDisplay);
        if (value === 0) renderType(immunityDisplay);
      });

      return (
        <div className="type-effectiveness-container">
          <h1>Type Effectiveness</h1>
          <h2>Weaknesses</h2>
          <p className="type-coverage">{weaknessDisplay}</p>
          <h2>Strengths</h2>
          <p className="type-coverage">{strengthDisplay}</p>
          <h2>{!_.isEmpty(immunityDisplay) ? 'Immuned to' : ''}</h2>
          <p className="type-coverage">{immunityDisplay}</p>
        </div>
      );
    }
  };

  return (
    <div className="main-container">
      <Header />
      <div className="loading">{Loading()}</div>
      <div className="result-container">
        {PokemonInformation()}
        <div className="right-col">
          {pokemonStats()}
          {PokemonChart()}
        </div>
      </div>
    </div>
  );
};

export default PokemonResult;

import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react'
import Search from './Search'
import useCharacters from '../hooks/useCharacters'
import '../styles/Characters.css'

const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character';

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    default:
      return state;
  }
}
const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API)

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite})
  }
/*
  const handleSearch = () => {
    setSearch(searchInput.current.value)
  }
*/
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [])

/*
  const filteredUser = characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLocaleLowerCase());
  })*/

  const filteredUser = useMemo(() => (
    characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLocaleLowerCase());
    })),
    [characters, search]
  )

  return (
    <div className="container">
      <Search searchInput={searchInput} search={search} handleSearch={handleSearch} />
      <div className="favorites">
        <h3>Favoritos</h3>
        {favorites.favorites.map(favorite => (
          <li key={favorite.id}>
            {favorite.name}
          </li>
        ))}
      </div>
      <div className="Characters">
        {filteredUser.map(character => (
          <div key={character.id} className="Card">
            <img className='Card-img' src={character.image} alt={`imagen de ${character.name}`} />
            <h2>{character.name}</h2>
            <button type='button' onClick={() => handleClick(character)}>Agregar a favoritos</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Characters;

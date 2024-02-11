import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import searchIcon from './assets/search.svg';
import MovieCard from "./MovieCard";

function App() {
  const [input, setInput] = useState("");
  const [movie, setMovie] = useState([]);
  const ApiUrl = "https//www.omdbapi.com?apikey=31f0e378";

  const fetchMovies = (title) => {
    axios.get(`${ApiUrl}&s=${title}`)
      .then((response) => {
        setMovie(response.data.Search);
      });
  };

  const handleSearch = () => {
    if (input.trim() === '') {
      // Show notification using React Toastify
      toast.error('Please enter a movie name', {
        className: 'black-toast',
        bodyClassName: 'black-toast-body',
      });
    } else {
      fetchMovies(input);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    fetchMovies(input);
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder='Search for movies'
        />
        <img src={searchIcon} alt='search' onClick={handleSearch} />
      </div>

      {movie?.length > 0 ?
        <div className="container">
          {movie.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
        :
        <div className="empty">
          <h2>Enter movie nameeeee</h2>
        </div>
      }

      {/* Add ToastContainer at the end of your component */}
      <ToastContainer />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {

    async function fetchData() {

      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  const handleClick = (movie) => {
    console.log(movie)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
        // console.log(movie?.title || movie?.original_title|| movie?.original_name || "");
      movieTrailer(movie?.title || movie?.original_title|| movie?.original_name || "")
        .then(url => {
            // console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
    }
  }

  return (
        <div className='row'>
            <h3>{title}</h3>

            <div className="row__posters">
                {movies.map(elem => {
                    return <img
                    src={`${base_url}${isLargeRow ? elem?.poster_path : elem?.backdrop_path}`}
                    alt={elem.title} 
                    className={`poster ${isLargeRow && "largeposter"}`} 
                    key={elem.id}
                    onClick={() => handleClick(elem)} />
                })}
            </div>

            <div style={{ padding: "40px" }}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    )
}

export default Row;
import React , {useEffect, useState} from 'react';
import './Banner.css';
import axios from '../axios/axios';
import requests from '../request/request';
import { FaPlay, FaInfo } from 'react-icons/fa';

//SOME OTHER ICONS TRIED
// import {BsFillPlayFill} from 'react-icons/bs';
// BsFillPlayFill
// FaRegPlayCircle
// FaGooglePlay
// FaPlay
// FaPlaystation

const base_url = "https://image.tmdb.org/t/p/original";

function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    const banner_path = `${base_url}${movie?.backdrop_path}`
    console.log(movie?.backdrop_path);
    return (
        <header 
            className='header'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${banner_path})`,
                backgroundPosition: "center center",
            }}
        >
        <div className="banner_container">
            <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className="banner_buttons">
                <button className="banner_button">
                    <FaPlay className='space'/> 
                    Play
                </button>
                <button className="banner_button">
                    <FaInfo className='space'/>
                    More Info
                </button>
            </div>

            <h1 className="banner_description">
                {movie?.overview}
            </h1>
        </div>

        <div className="fade__bottom" />
        </header>
    );
}

export default Banner;

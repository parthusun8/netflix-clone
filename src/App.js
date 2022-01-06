import './App.css';
import Row from './Components/ROW/Row';
import requests from './Components/request/request';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/NavBar/Nav';

function App() {

  const fetch = [
    "NetflixOriginals",
    "TopRated",
    "ActionMovies",
    "ComedyMovies",
    "HorrorMovies",
    "RomanceMovies",
    "Documentaries",
  ];

  const title = [
    "Netflix Originals",
    "Top Rated",
    "Action Movies",
    "Comedy Movies",
    "Horror Movies",
    "Romance Movies",
    "Documentaries",
  ];

  return (
    <div className='app'>
      <Navbar />
      <Banner />
      <Row 
        title="Trending Now" 
        fetchUrl={requests["fetchTrendingNow"]}
        isLargeRow = {true}
      />
      {fetch.map((elem, i) => 
        <Row title={title[i]} fetchUrl={requests["fetch"+elem]} key={i}/>
      )}
    </div>
  );
}

export default App;

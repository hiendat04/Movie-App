import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState} from "react";

const FeatureMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2IzYWY4MzhmNTgxY2IyMTFlNmZlZWI5YjVhYWRkYyIsIm5iZiI6MTczNDMzOTQ5NC4yMTEsInN1YiI6IjY3NWZlYmE2OTZjZmRkYmYxOWNjZDJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X784ao5bLyFRagD_CJ-o705pamHW1jvk74yYQ4WPNr4",
      },
    }).then(async (res) => {
      const data = await res.json();
      console.log(data); 
      setMovies(data.results); 
    });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="relative text-white">
      {movies.length > 0 ? <Movie data={movies[0]} /> : <p>Loading...</p>}
      <PaginateIndicator />
    </div>
  );
};

export default FeatureMovies;

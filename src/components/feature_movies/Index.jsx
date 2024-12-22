import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import useFetch from "@hooks/useFetch";
import Loading from "@components/Loading";

const FeatureMovies = () => {
  const [activeMovieId, setActiveMovieId] = useState(); // We cannot set a default value for the activeMovieId because in the first render, the movies is an empty array

  const { data: popularMovieResponse, isLoading: isPopularMovieLoading } =
    useFetch({
      url: "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true",
    });

  const { data: videoResponse } = useFetch(
    {
      url: `/movie/${activeMovieId}/videos`,
    },
    { enabled: activeMovieId },
  ); // The video API depends on the activeMovieId API, so we only enable is useFetch function only when the activeMovieId is finished so that we can get the activeMovieId value and enable video API

  const movies = (popularMovieResponse.results || []).slice(0, 4);

  useEffect(() => {
    if (movies.length > 0 && !activeMovieId) {
      setActiveMovieId(movies[0].id); // Set the first movie as active
    }
  }, [movies, activeMovieId]); // Depend on movies and activeMovieId

  if (isPopularMovieLoading) return <Loading />;

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie
            key={movie.id}
            data={movie}
            trailerVideoKey={
              (videoResponse?.results || []).find(
                (video) => video.type === "Trailer" && video.site === "YouTube",
              )?.key
            }
            activeMovieId={activeMovieId}
          />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovies;

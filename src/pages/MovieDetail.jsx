import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Banner from "../components/media_details/Banner";
import Loading from "../components/Loading";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2IzYWY4MzhmNTgxY2IyMTFlNmZlZWI5YjVhYWRkYyIsIm5iZiI6MTczNDMzOTQ5NC4yMTEsInN1YiI6IjY3NWZlYmE2OTZjZmRkYmYxOWNjZDJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X784ao5bLyFRagD_CJ-o705pamHW1jvk74yYQ4WPNr4",
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();
        setMovieInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <Loading />;

  return <Banner mediaInfo={movieInfo} />;
};
export default MovieDetail;

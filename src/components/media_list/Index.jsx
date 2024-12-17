import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MediaList = () => {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/all/day", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2IzYWY4MzhmNTgxY2IyMTFlNmZlZWI5YjVhYWRkYyIsIm5iZiI6MTczNDMzOTQ5NC4yMTEsInN1YiI6IjY3NWZlYmE2OTZjZmRkYmYxOWNjZDJjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X784ao5bLyFRagD_CJ-o705pamHW1jvk74yYQ4WPNr4",
      },
    }).then(async (res) => {
      const data = await res.json();
      const trendingMediaList = data.results.slice(0, 12);
      setMediaList(trendingMediaList);
    });
  }, []);

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">Trending</p>
        <ul className="flex rounded border border-white">
          <li className="cursor-pointer rounded bg-white px-2 py-1 text-black">
            All
          </li>
          <li className="cursor-pointer rounded px-2 py-1">Movie</li>
          <li className="cursor-pointer rounded px-2 py-1">TV Show</li>
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {mediaList.map((media) => {
          return (
            <MovieCard
              key={media.id}
              title={media.title || media.name}
              releaseDate={media.release_date || media.first_air_date}
              poster={media.poster_path}
              point={media.vote_average}
              mediaType={media.media_type}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MediaList;

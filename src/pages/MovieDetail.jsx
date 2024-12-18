import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../components/CircularProgressBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";

const MovieDetail = () => {
  const { id } = useParams();

  const [movieInfo, setMovieInfo] = useState({});

  const certification = (
    (movieInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({
      id: crew.id,
      job: crew.job,
      name: crew.name,
    }));

  const groupedCrews = groupBy(crews, "job");
  console.log({ groupedCrews });

  useEffect(() => {
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
    ).then(async (res) => {
      const data = await res.json();
      setMovieInfo(data);
    });
  }, [id]);

  return (
    <div className="relative overflow-hidden text-white">
      <img
        className="absolute inset-0 brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`}
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-1">
          <img
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieInfo.poster_path}`}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{movieInfo.title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 py-1 px-2 text-gray-400 rounded-sm">
              {certification}
            </span>
            <p>{movieInfo.release_date}</p>
            <p>
              {(movieInfo.genres || []).map((genre) => genre.name).join(", ")}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(movieInfo.vote_average * 10)}
                size={3.5}
                strokeWidth={0.3}
              />
              Rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{movieInfo.overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map(crew => crew.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;

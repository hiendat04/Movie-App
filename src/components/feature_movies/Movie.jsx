import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Movie = () => {
  return (
    <div>
      <img
        src="https://wallpaperswide.com/download/game_of_thrones-wallpaper-2400x1350.jpg"
        alt=""
        className="aspect-video brightness-50"
      />
      <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
        <p className="mb-2 font-bold sm:text-[2vw]">Game of Thrones</p>
        <div>
          <p className="mb-1 inline-block border border-gray-400 p-1 text-gray-400">
            PG13
          </p>
          <p className="mt-2 text-[1.2vw]">2024-06-11</p>
        </div>
        <div>
          <div className="mt-4 hidden text-[1.2vw] sm:block">
            <p className="mb-2 font-bold">Overview</p>
            <p>
              Game of Thrones follows a large cast of characters and interwoven
              story arcs. It is primarily set on the fictional continent of
              Westeros, which is divided into the Seven Kingdoms and the lands
              in the far North beyond “the Wall,” an enormous wall of fortified
              ice
            </p>
          </div>
          <div className="mt-6">
            <button className="text-10 mr-3 rounded bg-white px-4 py-2 text-black lg:text-lg">
              <FontAwesomeIcon icon={faPlay} />
              Trailer
            </button>
            <button className="text-10 rounded bg-slate-300/35 px-4 py-2 text-black/50 lg:text-lg">
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;

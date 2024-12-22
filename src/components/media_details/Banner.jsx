import { groupBy } from "lodash";
import CircularProgressBar from "../CircularProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import ImageComponent from "@components/Image";
import { useAppContext } from "@context/AppProvider";

const Banner = ({
  title,
  backdropPath,
  posterPath,
  certification,
  crews,
  genres,
  releaseDate,
  point = 0,
  overview,
  trailerVideoKey,
}) => {
  const { openPopup } = useAppContext();

  const groupedCrews = groupBy(crews, "job");
  return (
    <div className="relative overflow-hidden bg-black text-white shadow-sm shadow-slate-700">
      <ImageComponent
        width={1903}
        height={1070}
        className="absolute inset-0 brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-8 py-10 lg:gap-8">
        <div className="flex-1">
          <ImageComponent
            width={300}
            height={450}
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${posterPath}`}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{title}</p>
          <div className="flex items-center gap-4">
            <span className="rounded-sm border border-gray-400 px-2 py-1 text-gray-400">
              {certification}
            </span>
            <p>{releaseDate}</p>
            <p>{(genres || []).map((genre) => genre.name).join(", ")}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round((point || 0) * 10)}
                size={3.5}
                strokeWidth={0.3}
              />
              Rating
            </div>
            <button
              onClick={() => {
                openPopup(
                  <iframe
                    title="Trailer"
                    src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                    className="aspect-video w-[50vw]"
                  />,
                );
              }}
            >
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map((crew) => crew.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

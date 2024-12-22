import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/Image";
import { useState } from "react";

const SeasonList = ({ seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  console.log({ seasons });
  return (
    <div className="mt-8 text-[1vw]">
      <p className="mb-4 text-[1.4vw] font-bold">Seasons</p>
      {(isShowMore ? seasons.slice(0, 3) : seasons.slice()).map((season) => {
        return (
          <div
            key={season.id}
            className="mb-7 flex gap-4 rounded-lg border border-slate-200 p-3 shadow-md"
          >
            <ImageComponent
              width={130}
              height={195}
              src={`https://media.themoviedb.org/t/p/w300${season.poster_path}`}
              className={"w-1/4 rounded-lg"}
            />
            <div className="ml-5 space-y-2">
              <p className="text-[1.1vw] font-bold">
                Season {season.season_number}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-bold">Rating</p>
                <CircularProgressBar
                  percent={season.vote_average * 10}
                  size={2.3}
                  strokeWidth={0.2}
                />
              </div>
              <div className="flex gap-2">
                <p>
                  <span className="font-bold">Release Date:</span>{" "}
                  {season.air_date}
                </p>
                <p>|</p>
                <p>{season.episode_count} Episodes</p>
              </div>
              <p>{season.overview}</p>
            </div>
          </div>
        );
      })}
      <button
      onClick={() => setIsShowMore(!isShowMore)} 
      className="font-bold">{isShowMore ? 'Show More' : 'Show Less'}</button>
    </div>
  );
};
export default SeasonList;

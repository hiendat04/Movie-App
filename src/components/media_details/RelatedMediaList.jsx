import Loading from "@components/Loading";
import MovieCard from "@components/MovieCard";
import { useState } from "react";

const RelatedMediaList = ({ mediaList = [], isLoading, title }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  if (!isShowMore) mediaList = mediaList.slice(0, 8);
  else mediaList = mediaList.slice(0);

  return (
    <div className="mt-6">
      <p className="mb-6 text-[1.4vw] font-bold">{title}</p>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {mediaList.map((media) => (
            <MovieCard
              key={media.id}
              id={media.id}
              title={media.title || media.name}
              releaseDate={media.release_date || media.first_air_date}
              point={Math.round(media.vote_average)}
              mediaType={media.media_type}
              poster={media.poster_path}
            />
          ))}
        </div>
      )}
      <button
        className="mt-5 font-bold"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};
export default RelatedMediaList;

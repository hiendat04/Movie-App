import Loading from "@components/Loading";
import MovieCard from "@components/MovieCard";

const RelatedMediaList = ({ mediaList = [], isLoading, title }) => {
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
    </div>
  );
};
export default RelatedMediaList;

import MovieCard from "@components/MovieCard";

const RelatedMediaList = ({ mediaList }) => {
  return (
    <div className="mt-6">
      <p className="mb-6 text-[1.4vw] font-bold">More Like This</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            id={media.id}
            title={media.title}
            releaseDate={media.release_date}
            point={Math.round(media.vote_average)}
            mediaType={media.media_type}
            poster={media.poster_path}
          />
        ))}
      </div>
    </div>
  );
};
export default RelatedMediaList;

import { useParams } from "react-router-dom";
import Banner from "@components/media_details/Banner";
import Loading from "@components/Loading";
import ActorList from "@components/media_details/ActorList";
import RelatedMediaList from "@components/media_details/RelatedMediaList";
import MovieInfo from "@components/media_details/MovieInfo";
import useFetch from "@hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits,videos`,
  });

  const { data: recommendationResponse, isLoading: isRelatedMediaListLoading } =
    useFetch({
      url: `/movie/${id}/recommendations`,
    });

  const relatedMovies = (recommendationResponse.results || []).slice(0, 12);

  if (isLoading) return <Loading />;
  if (isRelatedMediaListLoading) return <Loading />;

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

  return (
    <div>
      <Banner
        title={movieInfo.title}
        backdropPath={movieInfo.backdrop_path}
        posterPath={movieInfo.poster_path}
        certification={certification}
        crews={crews}
        genres={movieInfo.genres}
        releaseDate={movieInfo.release_date}
        point={movieInfo.vote_average}
        overview={movieInfo.overview}
        trailerVideoKey={
          (movieInfo.videos?.results || []).find(
            (video) => video.type === "Trailer",
          )?.key}
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast || []} />
            <RelatedMediaList mediaList={relatedMovies} />
          </div>
          <div className="flex-1">
            <MovieInfo movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;

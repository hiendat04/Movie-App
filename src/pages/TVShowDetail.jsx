import { useParams } from "react-router-dom";
import Banner from "@components/media_details/Banner";
import Loading from "@components/Loading";
import ActorList from "@components/media_details/ActorList";
import RelatedMediaList from "@components/media_details/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import MovieInfo from "@components/media_details/MovieInfo";

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: showInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits`,
  });
  const { data: recommendationResponse, isLoading: isRelatedShowListLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
    });

  const relatedShow = (recommendationResponse.results || []).slice(0, 12);

  const certification = (showInfo.content_ratings?.results || []).find(
    (show) => show.iso_3166_1 === "US",
  )?.rating;
  console.log({showInfo})
  const crews = (showInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .map((crew) => ({
      id: crew.id,
      job: crew.jobs[0].job,
      name: crew.name,
    }));

  if (isLoading) return <Loading />;
  if (isRelatedShowListLoading) return <Loading />;
  console.log({ showInfo });

  return (
    <div>
      <Banner
        title={showInfo.name}
        backdropPath={showInfo.backdrop_path}
        posterPath={showInfo.poster_path}
        certification={certification}
        crews={crews}
        genres={showInfo.genres}
        releaseDate={showInfo.first_air_date}
        point={showInfo.vote_average}
        overview={showInfo.overview}
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={showInfo.credits?.cast || []} />
            <RelatedMediaList mediaList={relatedShow} />
          </div>
          <div className="flex-1">
            <MovieInfo movieInfo={showInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TVShowDetail;

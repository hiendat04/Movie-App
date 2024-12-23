import { useParams } from "react-router-dom";
import Banner from "@components/media_details/Banner";
import Loading from "@components/Loading";
import ActorList from "@components/media_details/ActorList";
import RelatedMediaList from "@components/media_details/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import ShowInfo from "@components/media_details/ShowInfo";
import SeasonList from "@components/media_details/SeasonList";

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: showInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
  });
  const { data: recommendationResponse, isLoading: isRelatedShowListLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
    });

  const relatedShow = (recommendationResponse.results || []).slice(0, 12);

  const certification = (showInfo.content_ratings?.results || []).find(
    (show) => show.iso_3166_1 === "US",
  )?.rating;

  const crews = (showInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .slice(0, 5)
    .map((crew) => ({
      id: crew.id,
      job: crew.jobs[0].job,
      name: crew.name,
    }));

  if (isLoading) return <Loading />;

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
        trailerVideoKey={
          (showInfo.videos?.results || []).find(
            (video) => video.type === "Trailer",
          )?.key
        }
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="container">
          <div className="flex-[2]">
            <ActorList
              actors={(showInfo.aggregate_credits?.cast || []).map((cast) => ({
                ...cast,
                character: cast.roles[0]?.character,
                episodeCount: cast.roles[0]?.episode_count,
              }))}
            />
            <SeasonList seasons={showInfo.seasons?.reverse()} />
            <RelatedMediaList
              mediaList={relatedShow}
              isLoading={isRelatedShowListLoading}
              title="More Like This"
            />
          </div>
          <div className="flex-1">
            <ShowInfo showInfo={showInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TVShowDetail;

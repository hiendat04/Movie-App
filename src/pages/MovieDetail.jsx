import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Banner from "@components/media_details/Banner";
import Loading from "@components/Loading";
import ActorList from "@components/media_details/ActorList";
import RelatedMediaList from "@components/media_details/RelatedMediaList";
import MovieInfo from "@components/media_details/MovieInfo";
import useFetch from "@hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();
  const [relatedMovies, setRelatedMovies] = useState([]);

  const { data : movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits`,
  });

  console.log({movieInfo, isLoading})

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        const currentRelatedMovies = (data.results || []).slice(0, 12);
        setRelatedMovies(currentRelatedMovies);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Banner mediaInfo={movieInfo} />
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

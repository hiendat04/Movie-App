import ImageComponent from "@components/Image";
import RelatedMediaList from "@components/media_details/RelatedMediaList";
import { GENDER_MAPPING } from "@libs/constants";
import { useLoaderData } from "react-router-dom";

const ActorPage = () => {
  const actorInfo = useLoaderData();
  return (
    <div className="bg-black text-[1.2vw] text-white">
      <div className="container">
        <div className="flex gap-6">
          <div className="flex-1">
            <ImageComponent
              src={
                actorInfo.profile_path &&
                `https://media.themoviedb.org/t/p/w500${actorInfo.profile_path}`
              }
              width={600}
              height={900}
              className="mb-6 rounded-sm border border-slate-700"
            />
            <div>
              <p className="mb-6 text-[1.3vw] font-bold">Personal Info</p>
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Known for</p>
                  <p>{actorInfo.known_for_department}</p>
                </div>
                <div>
                  <p className="font-bold">Gender</p>
                  <p>{GENDER_MAPPING[actorInfo.gender]}</p>
                </div>
                <div>
                  <p className="font-bold">Place of birth</p>
                  <p>{actorInfo.place_of_birth}</p>
                </div>
                <div>
                  <p className="font-bold">Birthday</p>
                  <p>{actorInfo.birthday}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[2]">
            <p className="mb-6 text-[2vw] font-bold">{actorInfo.name}</p>
            <div className="mb-6">
              <p className="mg-4 text-[1.4vw] font-bold">Biography</p>
              <p className="whitespace-pre-line">{actorInfo.biography}</p>
            </div>
            <RelatedMediaList
              mediaList={actorInfo.combined_credits?.cast || []}
              title="Known For"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActorPage;

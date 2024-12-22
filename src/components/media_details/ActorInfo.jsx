import ImageComponent from "@components/Image";

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <div className="m-4 rounded-lg border border-slate-300 bg-black shadow-sm">
      <ImageComponent
        className="rounded-t-lg"
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_bestv2${profilePath}`
            : "/actor_no_image.svg"
        }
        width={276}
        height={350}
        alt={`${name}`}
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {episodeCount && <p>{episodeCount} {episodeCount > 1 ? "Episodes" : "Episode"}</p>}
      </div>
    </div>
  );
};
export default ActorInfo;

const ActorInfo = ({  name, character, profilePath }) => {
  return (
    <div className="m-4 rounded-lg border border-slate-300 bg-black shadow-sm">
      <img
        className="rounded-t-lg"
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_bestv2${profilePath}`
            : '/actor_no_image.svg'
        }
        alt={`${name}`}
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {/* <p>18</p> */}
      </div>
    </div>
  );
};
export default ActorInfo;

import ImageComponent from "@components/Image";

const ShowInfo = ({ showInfo }) => {
  console.log({ showInfo });
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Information</p>
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{showInfo.original_name}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        <p>
          {(showInfo.origin_country || []).map((countryCode) => (
            <ImageComponent
              className="mr-1 mt-1 w-[1.4vw]"
              key={countryCode}
              src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
            />
          ))}
        </p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{showInfo.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Network</p>
        {(showInfo.networks || []).map((network) => {
          return <img
          className="invert"
            key={network.id}
            src={`https://media.themoviedb.org/t/p/h30${network.logo_path}`}
            alt={`${network.name}`}
          />;
        })}
      </div>
    </div>
  );
};
export default ShowInfo;

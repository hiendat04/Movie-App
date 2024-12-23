import ImageComponent from "@components/Image";
import { currencyFormatter } from "@libs/utils";

const MovieInfo = ({ movieInfo }) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Information</p>
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{movieInfo.original_title}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        <p>
          {(movieInfo.origin_country || []).map((countryCode) => (
            <ImageComponent
              className="mr-1 mt-1 w-[1.4vw]"
              key={countryCode}
              src={
                countryCode.toLowerCase() &&
                `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`
              }
            />
          ))}
        </p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{movieInfo.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Budget</p>
        <p>{currencyFormatter(movieInfo.budget) || "Not Available"}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Revenue</p>
        <p>{currencyFormatter(movieInfo.revenue) || "Not Available"}</p>
      </div>
    </div>
  );
};
export default MovieInfo;

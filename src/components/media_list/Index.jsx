import MovieCard from "@components/MovieCard";

const MediaList = ({
  title,
  tabs,
  currentActiveTabId,
  setCurrentActiveTabId,
  mediaList,
}) => {
  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => {
            return (
              <li
                key={tab.id}
                onClick={() => {
                  setCurrentActiveTabId(tab.id);
                }}
                className={`cursor-pointer rounded px-2 py-1 ${
                  tab.id === currentActiveTabId ? "bg-white text-black" : ""
                }`}
              >
                {tab.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-8">
        {mediaList.map((media) => {
          return (
            <MovieCard
              id={media.id}
              key={media.id}
              title={media.title || media.name}
              releaseDate={media.release_date || media.first_air_date}
              poster={media.poster_path}
              point={media.vote_average}
              mediaType={media.media_type || currentActiveTabId}
              activeTabId={currentActiveTabId}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MediaList;

import { useAppContext } from "@context/AppProvider";
import FeatureMovies from "../components/feature_movies/Index";
import MediaList from "../components/media_list/Index";
import { TOP_RATED_TABS, TRENDING_TABS } from "../libs/constants";

function HomePage() {
  const {
    trendingMediaList,
    topRatedMediaList,
    activeTrendingTabId,
    activeTopRatedTabId,
    setActiveTrendingTabId,
    setActiveTopRatedTabId,
  } = useAppContext();
  return (
    <div>
      <FeatureMovies />
      <MediaList
        title="Trending"
        tabs={TRENDING_TABS}
        currentActiveTabId={activeTrendingTabId}
        setCurrentActiveTabId={setActiveTrendingTabId}
        mediaList={trendingMediaList}
      />
      <MediaList
        title="Top Rated"
        tabs={TOP_RATED_TABS}
        currentActiveTabId={activeTopRatedTabId}
        setCurrentActiveTabId={setActiveTopRatedTabId}
        mediaList={topRatedMediaList}
      />
    </div>
  );
}

export default HomePage;

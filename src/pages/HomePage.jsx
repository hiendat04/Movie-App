import Header from "../components/Header";
import FeatureMovies from "../components/feature_movies/Index";
import MediaList from "../components/media_list/Index";
import { TOP_RATED_TABS, TRENDING_TABS } from "../libs/Constant";

function App() {
  return (
    <div>
      <Header />
      <FeatureMovies />
      <MediaList title="Trending" tabs={TRENDING_TABS} />
      <MediaList title="Top Rated" tabs={TOP_RATED_TABS} />
    </div>
  );
}

export default App;

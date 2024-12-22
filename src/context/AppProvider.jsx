import { TRENDING_TABS, TOP_RATED_TABS } from "@libs/constants";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  // Modal
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState();

  useEffect(() => {
    if (isShowing) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [isShowing]);

  const openPopup = (content) => {
    setIsShowing(true);
    setContent(content);
  };

  // Tabs data
  const [trendingMediaList, setTrendingMediaList] = useState([]);
  const [topRatedMediaList, setTopRatedMediaList] = useState([]);
  const [activeTrendingTabId, setActiveTrendingTabId] = useState(
    TRENDING_TABS[0]?.id,
  );
  const [activeTopRatedTabId, setActiveTopRatedTabId] = useState(
    TOP_RATED_TABS[0]?.id,
  );

  // Function to fetch media list
  const fetchMediaList = (tabs, activeTabId, setMediaList) => {
    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    if (url) {
      fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          const mediaList = data.results.slice(0, 12);
          setMediaList(mediaList);
        })
        .catch((err) => console.error("Failed to fetch media:", err));
    }
  };

  // Fetch trending media
  useEffect(() => {
    fetchMediaList(TRENDING_TABS, activeTrendingTabId, setTrendingMediaList);
  }, [activeTrendingTabId]);

  // Fetch top-rated media
  useEffect(() => {
    fetchMediaList(TOP_RATED_TABS, activeTopRatedTabId, setTopRatedMediaList);
  }, [activeTopRatedTabId]);

  return (
    <AppContext.Provider
      value={{
        openPopup,
        trendingMediaList,
        topRatedMediaList,
        activeTrendingTabId,
        setActiveTrendingTabId,
        activeTopRatedTabId,
        setActiveTopRatedTabId,
      }}
    >
      {children}
      {isShowing && (
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 flex items-center justify-center bg-slate-600/60"
            onClick={() => setIsShowing(false)}
          >
            {content}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};
export default AppProvider;

export const TRENDING_TABS = [
  {
    id: "all",
    name: "All",
    url: "https://api.themoviedb.org/3/trending/all/day",
  },
  {
    id: "movie",
    name: "Movie",
    url: "https://api.themoviedb.org/3/trending/movie/day",
  },
  {
    id: "tv",
    name: "TV Show",
    url: "https://api.themoviedb.org/3/trending/tv/day",
  },
];

export const TOP_RATED_TABS = [
  {
    id: "movie",
    name: "Movie",
    url: "https://api.themoviedb.org/3/movie/top_rated",
  },
  {
    id: "tv",
    name: "TV Show",
    url: "https://api.themoviedb.org/3/tv/top_rated",
  },
];

export const GENDER_MAPPING = {
  0: "Not set/ Not specified",
  1: "Female",
  2: "Male",
  3: "Non binary",
};

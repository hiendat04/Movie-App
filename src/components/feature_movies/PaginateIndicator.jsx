import { useEffect } from "react";

const PaginateIndicator = ({ movies, activeMovieId, setActiveMovieId }) => {
  useEffect(() => {
    if (movies.length === 0) return; // Don't execute if movies are empty

    const timer = setTimeout(() => {
      let currentIndex = movies.findIndex(
        (movie) => movie.id === activeMovieId,
      );
      if (currentIndex === -1) return; // If activeMovieId is not found, exit

      let nextIndex = currentIndex + 1;
      if (nextIndex === movies.length) nextIndex = 0;

      setActiveMovieId(movies[nextIndex].id);
    }, 5000);

    // Cleanup function to clear timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [movies, activeMovieId, setActiveMovieId]); // Dependencies include movies and activeMovieId

  return (
    <div className="absolute bottom-[10%] right-8">
      <ul className="flex gap-1">
        {movies.map((movie) => (
          <li
            onClick={() => {
              setActiveMovieId(movie.id);
            }}
            key={movie.id}
            className={`h-1 w-6 cursor-pointer ${movie.id === activeMovieId ? "bg-slate-100" : "bg-slate-600"}`}
          ></li>
        ))}
      </ul>
    </div>
  );
};
export default PaginateIndicator;

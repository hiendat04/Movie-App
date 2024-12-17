import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between bg-gray-950 px-8 text-white lg:h-20">
      <div className="flex items-center gap-4 lg:gap-8">
        <img src="./netflix.png" alt="" className="w-16 sm:w-28" />
        <a href="#!" className="lg:text-xl">
          Movie
        </a>
        <a href="#!" className="lg:text-xl">
          TV Series
        </a>
      </div>
      <div>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" />
      </div>
    </header>
  );
};
export default Header;

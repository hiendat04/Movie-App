import { useEffect, useState } from "react";

const ImageComponent = ({ src, width, height, className }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  useEffect(() => {
    const img = new Image();
    if (src) {
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
      };
      return;
    }
    setCurrentSrc( `https://placehold.co/${width}x${height}?text=No Image`);
    // Clean up function
    return () => {
      img.onload = null;
    };
    //In the first render, this clean up function will be called first, then the callback function of useEffect is called. Or, the element in the dependency array change, the clean up function will be also called first to remove the previous event handler (if there is)
  }, [src, width, height ]);

  return (
    <img
      className={currentSrc === src || src ? className : `${className} blur-md`}
      src={currentSrc}
      width={width}
      height={height}
    />
  );
};
export default ImageComponent;

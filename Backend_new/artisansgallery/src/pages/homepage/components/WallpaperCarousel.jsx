import React,{useState,useEffect} from 'react'
import wallpaper1 from './1.jpeg';
import wallpaper2 from './2.jpeg';
import wallpaper3 from './4.jpeg';
import wallpaper4 from './0.jpeg';
const WallpaperCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const wallpapers = [wallpaper1, wallpaper2, wallpaper3,wallpaper4];
 
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === wallpapers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? wallpapers.length - 1 : prevIndex - 1
    );
  };
  return (
    <>
      <div className="wallpaper-carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        Previous
      </button>
      <div className="carousel-image">
        <img src={wallpapers[currentIndex]} alt={`Wallpaper ${currentIndex}`} />
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        Next
      </button>
    </div>
    </>
  )
}

export default WallpaperCarousel

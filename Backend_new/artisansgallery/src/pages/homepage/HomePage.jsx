import React from "react";
import MainCardWrapper from "../shared/MainCardWrapper";
import WallpaperCarousel from "./components/WallpaperCarousel";
import MainCardWrapperGrey from "../shared/MainCardWrapperGrey";
import { isLoggedIn } from "../authentication/components/TokenHandler";

const HomePage = () => {
  return (
    <MainCardWrapperGrey>
      <div className="homepage">
        <div className="homepage-write">
            <h1 className="heading-homepage">
            ARTISANAL ELEGANCE AT YOUR FINGERTIPS
            </h1>
            <p>Indulge in the epitome of sophistication with our exclusive selection of meticulously handcrafted treasures, showcasing artisanal elegance at your fingertips. Experience craftsmanship like never before.</p>
        <button className="button">
          {isLoggedIn() ? <>DASHBOARD</> : <>GET STARTED</>}
          
          </button>
        </div>

        <div className="carousel"><WallpaperCarousel/></div>
        
      </div>
    </MainCardWrapperGrey>
  );
};

export default HomePage;

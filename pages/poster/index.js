import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { useEffect } from "react";
import { FileUpload } from "../../components/FileUpload";

const Poster = ({ settings, navigation, page }) => {
  // const colors = ["#C6FF5A", "#E576FF", "#4AC361", "#ffffff"];
  const colors = ["#fff", "transparent"]
  // const colors = ["#C6FF5A", "#E576FF", "#4AC361", "#ffffff"];
  useEffect(()=>{
    for (let i = 0; i < document.getElementsByClassName("triangle").length; i++) {
      let random2 = Math.floor(Math.random() * colors.length);
      document.getElementsByClassName("triangle")[i].style.backgroundColor = colors[random2];
    }
    const interval = setInterval(() => {     
      for (let i = 0; i < document.getElementsByClassName("triangle").length; i++) {
        let random2 = Math.floor(Math.random() * colors.length);
        document.getElementsByClassName("triangle")[i].style.backgroundColor = colors[random2];
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [])
  return (
    <div className="poster">
      <div class="topbar">
        <h1>{prismicH.asText(settings.data.siteTitle)}</h1>
        <h1 contentEditable>*INSERT NAME*</h1>
      </div>
      <div className="container">
        <div className="images-bg">
          <FileUpload/>
          <FileUpload/>
          {/* <img src="https://images.prismic.io/rijndistrict/ZldXQqWtHYXtT6E9_MED_4537.jpeg?auto=format,compress"/> */}
          {/* <img src="https://images.prismic.io/rijndistrict/ZldXQaWtHYXtT6E8_Intimancy_ontwerpplatformarnhem_devormforensen_1.jpg?auto=format,compress"/> */}
        </div>
        <div class="grid">
          {[...Array(18)].map((item, i) => {
            return(
              <div class="square" key={`square-${i}`}>
                <div class="triangle triangle-left"></div>
                <div class="triangle triangle-top"></div>
                <div class="triangle triangle-right"></div>
                <div class="triangle triangle-bottom"></div>
              </div>
            )
          })}
         
        </div>
      </div>
      <div class="bottombar">
        <h1>{navigation.data.description}</h1>
        <h1>{navigation.data.date}</h1>
      </div>
    </div>
  );
};

export default Poster;



export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const page = await client.getSingle("home", { lang: locale });


  return {
    props: {
      navigation,
      settings,
      page
    },
  };
}

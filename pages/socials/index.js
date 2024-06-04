import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { Layout } from "../../components/Layout";
import { useEffect } from "react";
import { FileUpload } from "../../components/FileUpload";

const Index = ({ settings, navigation, page }) => {
  console.log(page)

  let pic1, pic2

  useEffect(()=>{
    pic1 = document.getElementById('file1').children[0].data
    pic2 = document.getElementById('file2').children[0].data

    for (let i = 0; i < document.getElementsByClassName("square-home").length; i++) {
      document.getElementsByClassName("square-home")[i].style.backgroundImage = `url(${pic2})`
    }
    let random2 = Math.floor(Math.random() * 11);
    document.getElementById('file1').src =  document.getElementById(`file${Math.floor(Math.random() * 2 + 1)}`).children[0].data
    document.getElementById('file2').src =  document.getElementById(`file${Math.floor(Math.random() * 2 + 1)}`).children[0].data
    document.getElementById('r-logo').src = `/r${random2}.svg`
    const interval = setInterval(() => {
      for (let i = 0; i < document.getElementsByClassName("square-home").length; i++) {
        document.getElementsByClassName("square-home")[i].style.backgroundImage = `url(${pic1})`
        pic1 = document.getElementById(`file${Math.floor(Math.random() * 2 + 1)}`).children[0].data
        pic2 = document.getElementById(`file${Math.floor(Math.random() * 2 + 1)}`).children[0].data
      }
        let random2 = Math.floor(Math.random() * 11);
        document.getElementById('file1').src =  document.getElementById(`file${Math.floor(Math.random() * 2 + 1)}`).children[0].data
        document.getElementById('file2').src =  document.getElementById(`file${Math.floor(Math.random() * 2 + 1)}`).children[0].data
        document.getElementById('r-logo').src = `/r${random2}.svg`

       
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="home-grid social-grid">
      <div className="r-logo">
        <img id="r-logo" src="/r1.svg"></img>
      </div>
      <div className="img-wrapper">
        <FileUpload idName={'file2'}/>
        <div id="wrapper2">
          <div className='square-container-home'>
            {[...Array(25)].map((squareStudio, j) => {
              return(
                <button key={`square-home${j}`} id={`square-home${j}`} className={`square-home`} style={{backgroundImage: `url(${pic1})`}}></button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="img-wrapper">
      <FileUpload idName={'file1'}/>
        <div id="wrapper2">
          <div className='square-container-home'>
            {[...Array(25)].map((squareStudio, j) => {
              return(
                <button key={`square-home${j}`} id={`square-home${j}`} className={`square-home`} style={{backgroundImage: `url(${pic2})`}}></button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

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

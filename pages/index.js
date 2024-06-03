import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { useEffect } from "react";

const Index = ({ settings, navigation, page, studios }) => {
  let randomPic1 = studios[Math.floor(Math.random() * studios.length)].data.image.url
  let randomPic2 = studios[Math.floor(Math.random() * studios.length)].data.image2.url
  useEffect(()=>{
    for (let i = 0; i < document.getElementsByClassName("square-home").length; i++) {
      let random = Math.floor(Math.random() * 2);
      let random2 = Math.floor(Math.random() * 10);
      if(random == 1){
        document.getElementsByClassName("square-home")[i].classList.add('studio1');
      } else {
        document.getElementsByClassName("square-home")[i].classList.remove('studio1');
      }
      if(random2 == 1){
        document.getElementsByClassName("square-home")[i].style.backgroundImage = 'none';
        document.getElementsByClassName("square-home")[i].style.backgroundColor = 'white';
      }
    }
    const interval = setInterval(() => {
      for (let i = 0; i < document.getElementsByClassName("square-home").length; i++) {
        let random = Math.floor(Math.random() * 2);
        let random2 = Math.floor(Math.random() * 10);
        if(random == 1){
          document.getElementsByClassName("square-home")[i].classList.add('studio1');
        } else {
          document.getElementsByClassName("square-home")[i].classList.remove('studio1');
        }
        if(random2 == 1){
          document.getElementsByClassName("square-home")[i].style.backgroundImage = 'none';
          document.getElementsByClassName("square-home")[i].style.backgroundColor = 'white';
        } else {
          document.getElementsByClassName("square-home")[i].style.backgroundImage = `url(${studios[Math.floor(Math.random() * studios.length)].data.image2.url})`
        }
      }
        
        document.getElementById('img1').src = studios[Math.floor(Math.random() * studios.length)].data.image.url
        document.getElementById('img2').src = studios[Math.floor(Math.random() * studios.length)].data.image.url

    }, 1000);

    return () => clearInterval(interval);
  }, [])

  console.log(studios)

  return (
    <Layout
      alternateLanguages={settings.alternate_languages}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.siteTitle)}</title>
        <meta name="description" content={settings.data.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={prismicH.asText(settings.data.siteTitle)} />
        <meta property="og:description" content={settings.data.description} />
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <div className="container">
        <div class="home-grid">
          <div className="img-wrapper">
            <img id="img1" src={randomPic1}/>
            <div id="wrapper2">
              <div className='square-container-home'>
                {[...Array(25)].map((squareStudio, j) => {
                  return(
                    <button key={`square-home${j}`} id={`square-home${j}`} className={`square-home`} style={{backgroundImage: `url(${randomPic2})`}}></button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="img-wrapper">
            <img id="img2" src={randomPic1}/>
            <div id="wrapper2">
              <div className='square-container-home'>
                {[...Array(25)].map((squareStudio, j) => {
                  return(
                    <button key={`square-home${j}`} id={`square-home${j}`} class={`square-home`} style={{backgroundImage: `url(${randomPic2})`}}></button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const page = await client.getSingle("home", { lang: locale });
  const studios = await client.getAllByType("studio", { lang: locale });


  return {
    props: {
      navigation,
      settings,
      page,
      studios
    },
  };
}

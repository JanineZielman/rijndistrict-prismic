import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { useEffect } from "react";

const Index = ({ settings, navigation, page }) => {
  console.log(page)
  let randomPic1 = page.data.images[Math.floor(Math.random() * page.data.images.length)].image.url
  let randomPic2 = page.data.images[Math.floor(Math.random() * page.data.images.length)].image.url
  useEffect(()=>{
    for (let i = 0; i < document.getElementsByClassName("square-home").length; i++) {
      let random = Math.floor(Math.random() * 2);
      if(random == 1){
        document.getElementsByClassName("square-home")[i].classList.add('studio1');
      } else {
        document.getElementsByClassName("square-home")[i].classList.remove('studio1');
      }
    }
    const interval = setInterval(() => {
      for (let i = 0; i < document.getElementsByClassName("square-home").length; i++) {
        let random = Math.floor(Math.random() * 2);
        if(random == 1){
          document.getElementsByClassName("square-home")[i].classList.add('studio1');
        } else {
          document.getElementsByClassName("square-home")[i].classList.remove('studio1');
        }

        document.getElementsByClassName("square-home")[i].style.backgroundImage = `url(${page.data.images[Math.floor(Math.random() * page.data.images.length)].image.url})`
      }
        let random2 = Math.floor(Math.random() * 2 + 1);
        document.getElementById('img1').src = page.data.images[Math.floor(Math.random() * page.data.images.length)].image.url
        document.getElementById('img2').src = page.data.images[Math.floor(Math.random() * page.data.images.length)].image.url
        document.getElementById('r-logo').style.maskImage = `url(/r${random2}.svg)`

    }, 1000);

    return () => clearInterval(interval);
  }, [])

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
        <div className="home-grid">
          <div id="r-logo" className="r-logo"></div>
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
                    <button key={`square-home${j}`} id={`square-home${j}`} className={`square-home`} style={{backgroundImage: `url(${randomPic2})`}}></button>
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

  return {
    props: {
      navigation,
      settings,
      page
    },
  };
}

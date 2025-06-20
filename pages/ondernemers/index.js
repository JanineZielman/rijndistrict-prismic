import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { useEffect } from "react";

const Studios = ({ settings, navigation, studios, openStudios }) => {

  useEffect(()=>{
    for (let i = 0; i < document.getElementsByClassName("square-studio").length; i++) {
      let random = Math.floor(Math.random() * 2);
      if(random == 1){
        document.getElementsByClassName("square-studio")[i].classList.add('studio1');
      } else {
        document.getElementsByClassName("square-studio")[i].classList.remove('studio1');
      }
    }
    const interval = setInterval(() => {
      for (let i = 0; i < document.getElementsByClassName("square-studio").length; i++) {
        let random = Math.floor(Math.random() * 2);
        if(random == 1){
          document.getElementsByClassName("square-studio")[i].classList.add('studio1');
        } else {
          document.getElementsByClassName("square-studio")[i].classList.remove('studio1');
        }
      }
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
      <div className="page-intro">
        <PrismicRichText field={openStudios.data.intro}/>
      </div>
      <div className="studio-grid">
        {studios.filter((studio) => studio.data.not_active != true).map((item, i) => {
          return(
            <Link href={`/ondernemers/${item.uid}`} className="studio" key={`studio${i}`}>
                <div className="img-wrapper">
                  <img src={item.data.image.url}/>
                  <div id="wrapper2">
                    <div className='square-container-studio'>
                      {[...Array(25)].map((squareStudio, j) => {
                        return(
                          <button key={`square-studio${j}`} id={`square-studio${j}`} className={`square-studio`} style={{backgroundImage: `url(${item.data.image2.url})`}}></button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="info"><p>{item.data.dicipline}</p><p>{item.data.time}</p></div>
                <h2>{prismicH.asText(item.data.name)}</h2>
            </Link>
          )
        })}
       </div>
       {studios.filter((studio) => studio.data.not_active == true).length > 0 && <h2>Eerder deelgenomen</h2>}
       <div className="studio-grid">
        {studios.filter((studio) => studio.data.not_active == true).map((item, i) => {
          return(
            <Link href={`/ondernemers/${item.uid}`} className="studio" key={`studio${i}`}>
                <div className="img-wrapper">
                  <img src={item.data.image.url}/>
                  <div id="wrapper2">
                    <div className='square-container-studio'>
                      {[...Array(25)].map((squareStudio, j) => {
                        return(
                          <button key={`square-studio${j}`} id={`square-studio${j}`} className={`square-studio`} style={{backgroundImage: `url(${item.data.image2.url})`}}></button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="info"><p>{item.data.dicipline}</p><p>{item.data.time}</p></div>
                <h2>{prismicH.asText(item.data.name)}</h2>
            </Link>
          )
        })}
       </div>
      </div>
    </Layout>
  );
};

export default Studios;

export async function getServerSideProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const studios = await client.getAllByType("studio", { lang: locale });
  const openStudios = await client.getSingle("open_studios", { lang: locale });

  // Shuffle studios array for random order
  const shuffledStudios = studios.sort(() => Math.random() - 0.5);

  return {
    props: {
      navigation,
      settings,
      studios: shuffledStudios,
      openStudios,
    },
  };
}

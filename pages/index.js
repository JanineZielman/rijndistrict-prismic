import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { useEffect } from "react";

const Index = ({ settings, navigation, page }) => {
  const colors = ["#000000", "#ffffff"]
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
        <div class="grid">
          {[...Array(30)].map((item, i) => {
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

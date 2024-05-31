import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { useEffect } from "react";

const Studios = ({ settings, navigation, studios }) => {
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
      <div className="studio-grid">
        {studios.map((item, i) => {
          return(
            <div className="studio" key={`studio${i}`}>
              <img src={item.data.image.url}/>
              <h2>{prismicH.asText(item.data.name)}</h2>
            </div>
          )
        })}
       </div>
      </div>
    </Layout>
  );
};

export default Studios;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const studios = await client.getAllByType("studio", { lang: locale });


  return {
    props: {
      navigation,
      settings,
      studios
    },
  };
}

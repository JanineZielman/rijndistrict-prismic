import Head from "next/head";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";

const Page = ({page, navigation, settings }) => {
  return (
    <Layout
      alternateLanguages={page.alternate_languages}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(page.data.name)} | {prismicH.asText(settings.data.siteTitle)}
        </title>
        <meta name="description" content={settings.data.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${prismicH.asText(page.data.name)} | ${prismicH.asText(settings.data.siteTitle)}`} />
        <meta property="og:description" content={settings.data.description} />
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <div className={`container page studio-page`}>
        <div className="content">
          <div className="flex animation">
            <img src={page.data.image.url}/>
            <img src={page.data.image2.url}/>
          </div>
          <div className="info">
            <p>{page.data.dicipline}</p>
            <p><a target="_blank" href={`https://www.google.com/maps/place/${page.data.adres} Arnhem`}>{page.data.adres}</a></p>
            <p>{page.data.dicipline}</p>
          </div>
          <PrismicRichText field={page.data.name}/>
        </div>
        <SliceZone slices={page.data.slices} components={components} />
        <div className="text-section contact-info">
            <p><a target="_blank" href={`mailto:${page.data.email}`}>{page.data.email}</a></p>
            <p><a target="_blank" href={`https://${page.data.website}`}>{page.data.website}</a></p>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("studio", params.uid, {
     lang: locale,
  });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("studio", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}

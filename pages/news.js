import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import NewsList from "../components/NewsList";
import { getSortedPostsData } from "../lib/posts";

{
  /* 
When nextjs build the website, this runs
and will output the necessary data for the translation
and the news data.
*/
}
export async function getStaticProps({ locale }) {
  const allNewsData = getSortedPostsData();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["footer"])),
      allNewsData,
    },
  };
}

{
  /* 
NewsPage will take the `allNewsData` created above
by `getStaticProps` and send this to the component
`NewsList`.
*/
}
const NewsPage = ({ allNewsData }) => {
  const router = useRouter();
  return (
    <div>
      <>
        <NextSeo
          title="zeteoh, Inc."
          description="We detect human activities on wearables with AI."
          canonical="https://www.canonical.ie/"
          openGraph={{
            url: "https://www.zeteoh.com/",
            title: "zeteoh株式会社",
            description: "AIを使ってウェアラブルで身体活動を検知する",
            images: [
              {
                url: "https://www.zeteoh.com/images/Home/card-01.png",
                width: 800,
                height: 600,
                alt: "zeteoh-card",
                type: "image/jpeg",
              },
              {
                url: "https://www.zeteoh.com/images/Home/card-01.png",
                width: 900,
                height: 800,
                alt: "zeteoh-card",
                type: "image/jpeg",
              },
            ],
            site_name: "zeteoh",
          }}
          twitter={{
            handle: "@Satomi48650478",
            site: "@zeteoh_ai",
            cardType: "summary_large_image",
          }}
        />
      </>
      <Head>
        <title>zeteoh, Inc.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <Navbar2 />
        {/* We pass `allNewsData` to the component `NewsList` */}
        <NewsList allNewsData={allNewsData} />
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
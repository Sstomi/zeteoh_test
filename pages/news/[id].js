import Layout from "../../components/layout";
import { getAllNewsPostIds, getNewsPostData } from "../../lib/newsPosts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import Contact from "../../components/Contact";

export async function getStaticProps({ params, locale }) {
  const postData = await getNewsPostData(params.id);
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "hero",
        "merit",
        "team",
        "contact",
        "footer",
      ])),
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllNewsPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  const { code, frontmatter } = postData;
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <Layout>
      <div className="px-4 py-32 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-40">
        <div className="max-w-screen-sm sm:mx-auto">
          <div className="prose lg:prose-lg">
            <h2 className="text-left">{frontmatter.title}</h2>
            <p className="text-left">{frontmatter.description}</p>
            <p className="text-right">{frontmatter.date}</p>
            <article>
              <Component
                components={{
                  Contact,
                }}
              />
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
}

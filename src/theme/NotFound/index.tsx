import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import NotFoundContent from "@theme/NotFound/Content";
import type { ReactNode } from "react";

export default function NotFound(): ReactNode {
  const title = translate({
    id: "theme.NotFound.title",
    message: "Page Not Found",
  });

  return (
    <>
      <PageMetadata title={title} />
      <Head>
        <meta
          name="description"
          content="The requested RoleLogic documentation page could not be found."
        />
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>
      <Layout>
        <NotFoundContent />
      </Layout>
    </>
  );
}

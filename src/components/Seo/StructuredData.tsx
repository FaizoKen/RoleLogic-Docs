import Head from "@docusaurus/Head";

type StructuredDataProps = {
  data: Record<string, unknown>;
};

/** Adds page-specific JSON-LD without duplicating it across every docs route. */
export default function StructuredData({ data }: StructuredDataProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <Head>
      <script type="application/ld+json">{json}</script>
    </Head>
  );
}

import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function NotFound(): React.JSX.Element {
  return (
    <Layout title="Page Not Found" description="The page you are looking for does not exist.">
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>404</h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.8 }}>
          This page doesn't exist — but RoleLogic can still help you automate
          roles.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <Link className="button button--primary button--lg" to="/quick-start">
            Quick Start Guide
          </Link>
          <Link className="button button--secondary button--lg" to="/faq">
            FAQ & Troubleshooting
          </Link>
          <Link className="button button--secondary button--lg" to="/plugins">
            Browse Plugins
          </Link>
          <Link className="button button--secondary button--lg" to="/">
            Home
          </Link>
        </div>
      </main>
    </Layout>
  );
}

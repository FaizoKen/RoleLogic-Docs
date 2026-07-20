import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { ReactNode } from "react";
import styles from "./productCta.module.css";

type ProductCtaProps = {
  title?: string;
  children?: ReactNode;
};

export default function ProductCta({
  title = "Put this setup to work in your server",
  children,
}: ProductCtaProps) {
  const { siteConfig } = useDocusaurusContext();
  const appUrl = String(siteConfig.customFields?.appUrl);
  const dashboardUrl = `${appUrl.replace(/\/+$/, "")}/dashboard`;
  const botInviteUrl = String(siteConfig.customFields?.botInviteUrl);

  return (
    <aside className={styles.cta} aria-labelledby="rolelogic-cta-title">
      <div>
        <h2 id="rolelogic-cta-title" className={styles.title}>
          {title}
        </h2>
        {children ? (
          <div className={styles.copy}>{children}</div>
        ) : (
          <p className={styles.copy}>
            Add RoleLogic, build your first IF-THEN rule, and test it before it
            changes a member’s roles. The free plan includes 5 rules per server.
          </p>
        )}
      </div>
      <div className={styles.actions}>
        <a
          className="button button--primary"
          href={botInviteUrl}
          data-analytics-id="add_rolelogic"
        >
          Add RoleLogic free
        </a>
        <a
          className="button button--secondary"
          href={dashboardUrl}
          data-analytics-id="open_dashboard"
        >
          Open dashboard
        </a>
      </div>
    </aside>
  );
}

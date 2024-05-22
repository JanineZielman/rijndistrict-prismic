import * as prismicH from "@prismicio/helpers";
import { PrismicLink } from "@prismicio/react";
import Link from "next/link";

export const Layout = ({
  alternateLanguages,
  navigation,
  settings,
  children,
}) => {
  return (
    <>
      <div class="topbar">
        <h1><Link href="/">{prismicH.asText(settings.data.siteTitle)}</Link></h1>
        <div className="navigation">
          {navigation.data?.menu.map((item) => (
            <div
              key={item.label}
              className="menu-link"
            >
              <PrismicLink field={item.link}>
                {item.label}
              </PrismicLink>
            </div>
          ))}
        </div>
       
      </div>
      <main>
        {children}
      </main>
      <div class="bottombar">
        <h1>{navigation.data.subtitle}</h1>
        {/* <h1>{navigation.data.description}</h1> */}
        <h1>{navigation.data.date}</h1>
      </div>
    </>
  );
};

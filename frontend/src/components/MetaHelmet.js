import { Helmet } from "react-helmet";
import React from "react";

function MetaHelmet({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
}
MetaHelmet.defaultProps = {
  title: "Welcome to Timshop",
  keywords: "Only cute",
  description: "Selling top quality products",
};
export default MetaHelmet;

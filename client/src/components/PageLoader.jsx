import React from "react";

import styles from "./PageLoader.module.scss";

const PageLoader = () => {
  const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
    <div className={styles.loader}>
      <img src={loadingImg} alt="Loading..." />
    </div>
  );
};

export default PageLoader;

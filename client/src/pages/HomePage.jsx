import React, { useState } from "react";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className={styles.Home}>
      <button className={styles["login-btn"]} onClick={handleLogin}>
        Login with Popup
      </button>
    </div>
  );
};

export default HomePage;

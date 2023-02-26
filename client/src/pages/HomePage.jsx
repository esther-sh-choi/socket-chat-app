import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import PageLoader from "../components/PageLoader";

import styles from "./HomePage.module.scss";
import NavBar from "../components/NavBar";

const HomePage = () => {
  console.log("home");
  return (
    <div className={styles.Home}>
      <NavBar />
    </div>
  );
};

export default HomePage;

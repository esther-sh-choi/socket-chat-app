import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import styles from "./LogoutButton.module.scss";

const LogoutButton = ({ socket }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className={styles.button__logout} onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;

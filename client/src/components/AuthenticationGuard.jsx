import React from "react";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import PageLoader from "./PageLoader";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="loading-page">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};

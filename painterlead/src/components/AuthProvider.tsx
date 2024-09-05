"use client";
import { Auth0Provider } from "@auth0/auth0-react";

export default function AuthProvider({ children }: { children: any }) {
  return (
    <>
      <Auth0Provider
        domain="dev-ta8lsqn8atlh8nau.us.auth0.com"
        clientId="MnxQcgj5eGvCiFSUtpeQIYtr39Moh7fg"
        authorizationParams={{
          redirect_uri: "http://localhost:3000",
          audience: "https://painterlead.com",
          scope: "openid profile email"
        }}
      >
        {children}
      </Auth0Provider>
    </>
  );
}

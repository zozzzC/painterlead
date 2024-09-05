"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React from "react";

export default function Test() {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      console.log("running");

      const token = await getAccessTokenSilently();

      console.log(token);

      const response = await fetch("http://localhost:4321/edit/mainTag", {
        method: "POST",
        body: JSON.stringify({
          name: "test",
        }),
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>test page</p>
      <button onClick={callApi}>test</button>
    </div>
  );
}

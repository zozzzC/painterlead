"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React from "react";

export default function Test() {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    const token = await getAccessTokenSilently();

    const response = await fetch("http://localhost:4321/edit/mainTag", {
      method: "GET",
      // body: JSON.stringify({
      //   name: "test",
      // }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(await response.json());
  };

  return (
    <div>
      <p>test page</p>
      <button onClick={callApi}>test</button>
    </div>
  );
}

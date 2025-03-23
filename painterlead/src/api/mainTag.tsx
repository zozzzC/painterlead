"use client";
import { useAuth0 } from "@auth0/auth0-react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

export async function createNewMainTag(name: string, token: string) {
  console.log("creating new tag...");
  const res = await fetch("http://localhost:4321/edit/mainTag", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });
}

export async function getMainTag(token: string) {
  console.log("getting tags...");
  const res = await axios.get("http://localhost:4321/edit/mainTag", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

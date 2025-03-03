"use client";
import { useAuth0 } from "@auth0/auth0-react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export async function createNewMainTag(name: string, token: string) {
  console.log("creating new tag...");
  console.log(token)
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

  return await res.json();
}

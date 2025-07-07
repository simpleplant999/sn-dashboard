// lib/fetch.ts
"use client";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FetchOptions = RequestInit & {
  auth?: boolean; // whether to include Authorization header
};

/**
 * Universal fetch wrapper that handles baseURL and auth token.
 */
export const fetchApi = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  console.log("token", token);
  try {
    const url = `${baseURL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (options.auth) {
      if (token) {
        // Convert headers to a plain object if it's a Headers instance
        if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${token}`);
        } else {
          (headers as Record<string, string>)[
            "Authorization"
          ] = `Bearer ${token}`;
        }
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error?.message || `Fetch error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

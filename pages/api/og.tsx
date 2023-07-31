import React from "react";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import { useRouter } from "next/router";

export const config = {
  runtime: "edge",
};

async function getPost(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  let jsonResponse = await res.json();
  return jsonResponse;
}

export default async function handler(request: NextRequest) {
  console.log("USER ROUTER RESPONSE: useRouter", useRouter());
  console.log("REQUEST LOGS ARE REQUEST test 01", request);
  console.log("REQUEST LOGS ARE REQUEST nextUrl", request.nextUrl);

  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("id");

  const postResponse = await getPost(Number(userId));

  console.log("POST RESPONES IS: ", postResponse);

  // if (!username) {
  //   return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
  //     width: 1200,
  //     height: 630,
  //   });
  // }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "black",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          paddingTop: 50,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width="256"
          height="256"
          src={postResponse?.thumbnailUrl}
          style={{
            borderRadius: 128,
          }}
        />
        <p>{postResponse?.title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

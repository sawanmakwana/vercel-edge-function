import React from "react";
import { ImageResponse } from "@vercel/og";
import { NextRequest, } from "next/server";

export const config = {
  runtime: "edge",
};

async function getPost(id: any) {
  console.log("id",id)
  let setupUrl = `https://connect-dev.getfize.com/api/link/setup?setup_id=li_${id}`
  const res = await fetch(setupUrl);
  let jsonResponse = await res.json();
  return jsonResponse;
}

export default async function handler(request: NextRequest) {

  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("id");

  const postResponse = await getPost(userId);

  console.log("POST RESPONES IS: ",
    postResponse?.data?.agent_information?.agent_name,
    postResponse?.data?.agent_information?.agent_picture);

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
          width="100"
          height="100"
          src={postResponse?.data?.agent_information?.agent_picture || "https://cdn.getfize.io/Logo.png"}
          style={{
            borderRadius: 128,
          }}
        />
        <p>{postResponse?.data?.agent_information?.agent_name || ""}</p>
      </div>
    ),
    {
      width: 650,
      height: 300,
    }
  );
}

import { postColor } from "@/helper/controller";
import { NextResponse, NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return NextResponse.json({
        name: `Hello, I'm not an Edge Function!`,
      });
      break;
    case "POST":
      return await postColor(req, NextResponse);
      break;

    default:
      break;
  }
}

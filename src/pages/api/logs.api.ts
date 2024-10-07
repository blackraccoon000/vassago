// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {apiLogger} from "@/libs/apiLogger";
import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
  name: string;
};

/**
 * NewRelicにログを収集するためのAPI
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const {level = "info", messages} = (await req.body) as {
      level: "info";
      messages: string;
    };
    apiLogger[level](messages);
  }

  res.status(200).json({name: "Log API"});
}

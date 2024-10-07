// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {apiLogger} from "@/libs/apiLogger";
import type {NextApiRequest, NextApiResponse} from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  apiLogger.info("Hello API For Pino");
  res.status(200).json({name: "John Doe"});
}

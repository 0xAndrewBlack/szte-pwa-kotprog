import type { NextApiRequest, NextApiResponse } from "next";

import { promises as fs } from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // prettier-ignore
  const { method, query: { page = 1, limit = 10, seed = "0x1337" } } = req;

  switch (method) {
    case "GET":
      console.log(`[Quotes] - Called with page: [${page}], limit: [${limit}], seed: [${seed}]`);

      const jsonDirectory = path.join(process.cwd(), "src", "helpers");
      const fileContents = await fs.readFile(`${jsonDirectory}/quotes.json`, "utf8");

      const data = JSON.parse(fileContents);

      const filtered = data.filter((item: any, index: number) => {
        return index >= (Number(page) - 1) * Number(limit) && index < Number(page) * Number(limit);
      });

      return res.status(200).json({
        quotes: filtered,
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ message: `Method ${method} Not Allowed!` });
  }
}

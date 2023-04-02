// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { inputs } = req.body;

  if (!inputs) res.status(403);

  const blob = await query({ inputs });

  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Content-Length": blob.size,
  });
  res.write(Buffer.from(await blob.arrayBuffer()));
}

async function query(data: { inputs: string }) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/gsdf/Counterfeit-V2.5",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

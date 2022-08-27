import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const token = req.query.token;

  if (token !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "You are not authorized to access this endpoint." });
  }

  try {
    await res.revalidate('/faq')

    return res.status(200).json({ message: "Revalidation completed." })
  } catch {
    return res.status(500).json({ message: "Something went wrong while revalidating." })
  }
}

export default handler;
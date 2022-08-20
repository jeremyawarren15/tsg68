import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const token = req.query.token;
  const slug = req.query.slug;

  if (token !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "You are not authorized to access this endpoint." });
  }

  if (!slug) {
    return res.status(400).json({ message: "Could not complete request because slug was missing." });
  }

  try {
    await Promise.all([
      res.revalidate(`/events/${slug}`),
      res.revalidate('/'),
      res.revalidate('/events')
    ])

    return res.status(200).json({ message: "Revalidation completed." })
  } catch {
    return res.status(500).json({ message: "Something went wrong while revalidating." })
  }
}

export default handler;
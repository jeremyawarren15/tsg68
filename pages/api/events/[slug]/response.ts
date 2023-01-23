import initPocketBase from "../../../../helpers/initPocketbase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const pb = await initPocketBase({req, res})
    const {slug} = req.query;
    try {
      const response = await pb.send(`/events/${slug}/response`, {
        method: "GET"
      })
      res.status(200).json(response)
    } catch(e) {
      res.status(500).json(e.message)
    }
  } else if (req.method === "POST") {
    const pb = await initPocketBase({req, res})
    const {slug} = req.query;
    try {
      const response = await pb.send(`/events/${slug}/response`, {
        method: "POST",
        body: req.body
      })
      res.status(200).json(response)
    } catch(e) {
      res.status(500).json(e.message)
    }
  } else {
    res.status(404).json("Not Found.")
  }
}
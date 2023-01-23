import initPocketBase from "../../../../helpers/initPocketbase";

export default async function handler(req, res) {
  const pb = await initPocketBase({req, res})
  const {slug} = req.query;
  const attendees = await pb.send(`/events/${slug}/attending`, {
    method: "GET"
  })
  res.status(200).json(attendees)
}
import initPocketBase from "../../../helpers/initPocketbase";

export default async function handler(req, res) {
  const pb = await initPocketBase({req, res})
  const {id} = req.query;
  const updatedUser = await pb.collection('users').update(id, req.body)
  res.status(200).json(updatedUser)
}
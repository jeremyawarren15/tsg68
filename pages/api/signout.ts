import { getCookies } from "cookies-next";
import initPocketBase from "../../helpers/initPocketbase";

export default async function handler(req, res) {
  res.setHeader('Set-Cookie', 'pb_auth=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
  res.writeHead(302, { Location: '/api/login' });
  res.end();
}
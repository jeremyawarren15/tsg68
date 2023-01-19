import PocketBase from 'pocketbase';

const client = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

export default client
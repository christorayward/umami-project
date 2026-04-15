import Pocketbase from 'pocketbase';

const POCKETBASE_API_URL = "https://pocketbase-app-production-d1b7.up.railway.app";

const pocketbaseClient = new Pocketbase(POCKETBASE_API_URL);

export default pocketbaseClient;
export { pocketbaseClient };
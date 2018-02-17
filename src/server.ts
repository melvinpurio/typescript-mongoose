import { Database } from './utils/database';

const main = async () => {
  const db = new Database();
  await db.connect();
  console.log('connected');
}

main();

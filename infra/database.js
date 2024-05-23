import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
  });

  console.log(
    "Credentials database:" +
      {
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
      },
  );

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.end();
  }
}

export default {
  query,
};

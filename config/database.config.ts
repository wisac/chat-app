export default () => ({
   type: process.env.DATABASE_TYPE,
   host: process.env.DATABASE_HOST || "localhost",
   port: Number(process.env.DATABASE_PORT) || 5432,
   database: process.env.DATABASE_NAME,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
});
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/postgres?schema=restaurant-manager',
  },
  jwtSecret: process.env.JWT_SECRET || 'senhamtforte',
});

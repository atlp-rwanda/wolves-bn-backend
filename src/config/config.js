require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: 'da64cm4ufih4ai',
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
  facebook: {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET
  },
  google: {
    clientID: process.env.GL_CLIENT_ID,
    clientSecret: process.env.GL_CLIENT_SECRET
  }
};

require('dotenv').config();
const bunyan = require('bunyan');
const path = require('path');

const loggers = {
  development: () => bunyan.createLogger({ name: 'development', level: 'debug' }),
  production: () => bunyan.createLogger({ name: 'production', level: 'info' }),
  test: () => bunyan.createLogger({ name: 'test', level: 'fatal' }),
};

module.exports = {
  development: {
    sitename: 'Prevent Homelessness [development]',
    log: loggers.development,
    data: {
      images: path.join(__dirname, '../data/images'),
    },
    database: {
      dsn: process.env.DEVELOPMENT_DB_DSN,
    },
  },
  production: {
    sitename: 'Prevent Homelessness',
    log: loggers.production,
    data: {
      images: path.join(__dirname, '../data/images'),
    },
    database: {
      dsn: process.env.PRODUCTION_DB_DSN,
    },
  },
  test: {
    sitename: 'Prevent Homelessness [Test]',
    log: loggers.test,
    data: {
      images: path.join(__dirname, '../data/images'),
    },
    database: {
      dsn: process.env.TEST_DB_DSN,
    },
  },
};

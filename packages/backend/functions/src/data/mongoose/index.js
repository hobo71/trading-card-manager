const mongoose = require('mongoose');
const Models = require('./models');

const connect = mongoUrl => {
  const url = mongoUrl || process.env.MONGO_URL;
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  return mongoose.connect(url, options);
};

const parserOptions = {
  virtuals: true,
  getters: true,
  minimize: true,
};

module.exports = { connect, parserOptions, Models };

;
'use strict'

  

const mongoose = require("mongoose"),
  { USER_DB,
     PASS_DB, 
     HOST_DB,
      NAME_DB } = process.env;

let connection,
  connectDB = async () => {
    if (connection) return connection;

    try {
      connection = await mongoose.connect(`mongodb+srv://${USER_DB}:${PASS_DB}@${HOST_DB}/${NAME_DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log("DB conectada...");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
    return connection;
  };

module.exports = connectDB;

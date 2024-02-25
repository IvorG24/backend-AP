// database.js
import { MongoClient } from 'mongodb';

let Dbconnection;

export const connectToDb = (cb) => {
  MongoClient.connect('mongodb://127.0.0.1/appointment-app')
    .then((client) => {
      Dbconnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};

export const getDb = () => {
  return Dbconnection;
};

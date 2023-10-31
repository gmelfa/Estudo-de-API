/* eslint-disable no-unused-vars */
import mongoose, { mongo } from "mongoose";

async function conectaNaDatabase() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default conectaNaDatabase;
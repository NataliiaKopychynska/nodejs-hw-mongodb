import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
const MONGO_URL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?`;

export default async function initMongoConnection() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error(e);
  }
}

import mongoose from 'mongoose';

const ConnectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      dbName:"guftagu"
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default ConnectDB;
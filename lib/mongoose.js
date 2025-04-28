import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB ga ulandi");
  } catch (e) {
    console.error("❌ MongoDB ulanish xatosi:", e);
    throw e;
  }
};

export default connectToDatabase;

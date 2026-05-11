import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    console.log("🚀 Starting Admin Seed...");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const existingAdmin = await User.findOne({
      email: "admin@dreamfit.com",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists. Skipping.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("DreamFit@2026#Secure!", 10);

    await User.create({
      name: "Admin User",
      email: "admin@dreamfit.com",
      password: hashedPassword,
      role: "ADMIN",
      phone: "7397228655",
      isActive: true,
      profileImage: null,
      address: {},
      notes: "Main system administrator",
    });

    console.log("🎉 Admin created successfully!");
    console.log("📧 Email: admin@dreamfit.com");
    console.log("🔑 Password: DreamFit@2026#Secure!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
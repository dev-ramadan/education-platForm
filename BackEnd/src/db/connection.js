import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// ✅ استخدام connection string بدل (DB_NAME / USER / PASS)
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// ✅ اتصال بالداتا بيز
export const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected ✅");
  } catch (error) {
    console.log("DB connection error ❌", error.message);
  }
};

// ✅ إنشاء الجداول
export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // تقدر تشيل alter بعد كده
    console.log("Models synced ✅");
  } catch (error) {
    console.log("Sync error ❌", error.message);
  }
};
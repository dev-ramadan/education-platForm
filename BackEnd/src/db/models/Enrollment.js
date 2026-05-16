import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const Enrollment = sequelize.define("Enrollment", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
    phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("pending", "active", "rejected"),
    defaultValue: "pending"
  },
  completedLessons: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  timestamps: true
});

export default Enrollment;
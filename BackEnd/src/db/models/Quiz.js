import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const Quiz = sequelize.define("Quiz", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Quiz;
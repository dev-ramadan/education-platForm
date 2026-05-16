import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const Question = sequelize.define("Question", {
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  timestamps: true
});

export default Question;
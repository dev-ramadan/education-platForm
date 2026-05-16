import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const Option = sequelize.define("Option", {
  option: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correct_answer: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Option;
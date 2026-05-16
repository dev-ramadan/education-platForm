import { DataTypes } from "sequelize";
import {sequelize} from "../connection.js";
const Course = sequelize.define("Course", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price:DataTypes.INTEGER,
  instructorId: {
  type: DataTypes.INTEGER,
  allowNull: false,
}
},
{timestamps:true}
);
export default Course
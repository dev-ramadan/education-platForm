import { DataTypes } from "sequelize";
import {sequelize} from "../connection.js";
const Result = sequelize.define("Result", {
  score: DataTypes.INTEGER,
},
{timestamps:true}
);
export default Result
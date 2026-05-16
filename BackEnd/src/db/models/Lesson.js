import { DataTypes } from "sequelize";
import {sequelize} from "../connection.js";


const Lesson = sequelize.define(
  "Lesson",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }

);
export default Lesson
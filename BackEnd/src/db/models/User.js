// models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM("student", "instructor", "admin"),
        defaultValue: "student",
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
    { timestamps: true }
);

export default User;
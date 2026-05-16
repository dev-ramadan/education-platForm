import { DataTypes } from "sequelize";
import {sequelize} from "../connection.js";
const Payment = sequelize.define("Payment", {
  amount: DataTypes.FLOAT,
  status: DataTypes.STRING,
  provider: DataTypes.STRING,
  transaction_id: DataTypes.STRING,
},
{timestamps:true}
);

export default Payment
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../db/models/User.js";

// create user
export const createUser = async (data) => {
    const { email, password, role, name } = data.body
    const user = await User.findOne({ where: { email } });
    if (user)
        throw new Error("هذا الاميل موجود بالفعل", { cause: 401 })
    const newUser = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role
    })
    return newUser
};

// login
export const login = async (data) => {
    const { email, password } = data.body
    const user = await User.findOne({ where: { email } });
    if (!user)
        throw new Error("الاميل او كلمة المرور خاطئة", { cause: 401 });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error("الاميل او كلمة المرور خاطئة", { cause: 401 });
    const token = jwt.sign({ id:user.id,name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" })
    
    return {
        token,
        name: user.name, email: user.email, role: user.role 
    }
};

// get all users
export const getUsers = async () => {
    const users = await User.findAll();
    return users
}
// get getInstructorById 
export const getInstructorById = async (data) => {
    const {id} = data.params
    const user = await User.findByPk(id);
    return user
}
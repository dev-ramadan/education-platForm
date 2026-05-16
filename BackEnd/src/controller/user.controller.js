import { createUser, getInstructorById, getUsers, login } from "../services/user.js"
import { resMsg } from "../utils/globaleMessage.js"

export const addUser = async (req,res) => {
    const user = await createUser(req)
    resMsg(res,200,"تم انشاء الحساب بنجاح",user)
};

export const loginUser = async (req,res) => {
    const user = await login(req)
    resMsg(res,200,"تم تسجيل الدخول بنجاح",user)
};
export const users = async (req,res) => {
    const users = await getUsers();
    resMsg(res,200,"تم جلب المستخدمين بنجاح",users)
}

export const getInstructor = async (req,res) => {
    const user = await getInstructorById(req);
    resMsg(res,200,"تم جلب المستخدمين بنجاح",user)
}


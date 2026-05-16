import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-64 bg-white shadow-md hidden md:block">
            <h1 className="text-2xl font-bold p-4 text-blue-600">
                EduPanel
            </h1>

            <nav className="flex flex-col gap-2 p-4">
                <Link className="p-2 hover:bg-gray-200 rounded" to="/dashboard">
                    الرئيسية
                </Link>
                <Link className="p-2 hover:bg-gray-200 rounded" to="addCourse">
                    ادارة الكورسات
                </Link>
                <Link className="p-2 hover:bg-gray-200 rounded" to="students">
                    الطلاب
                </Link>

                <Link className="p-2 hover:bg-gray-200 rounded" to="orders">
                    الطلبات
                </Link>

                <Link className="p-2 hover:bg-gray-200 rounded" to="addQuiz">
                    الامتحانات
                </Link>
                <Link className="p-2 hover:bg-gray-200 rounded" to="settings">
                    الاعدادات
                </Link>
            </nav>
        </div>
    );
}
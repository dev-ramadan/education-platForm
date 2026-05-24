import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import LayOut from "./src/layout/Lauout";
import Home from "./src/pages/Home";
import Course from "./src/pages/Course";
import About from "./src/pages/About";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import DashboardLayout from "./src/layout/DashLayout";
import DashHome from "./src/pages/Dashboard/DashHome";
import DashCourse from "./src/pages/Dashboard/DashCourse";
import DashQuiz from "./src/pages/Dashboard/DashQuiz";
import CourseDetails from "./src/pages/CourseDetails";
import Enrollments from "./src/pages/Dashboard/DashOrder";
import DashStudents from "./src/pages/Dashboard/DashStudents";
import StudentProfile from "./src/pages/StudentProfile";
import DashResults from "./src/pages/Dashboard/DashResults";
import DashAnalytics from "./src/pages/Dashboard/DashAnalytics";

// 🔒 Protected Route Component
const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = user.role === "admin" || user.role === "instructor";
    
    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Course />} />
            <Route path="course/:id" element={<CourseDetails />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* dashboard - Protected */}
        <Route path="/dashboard" element={
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        }>
            <Route index element={<DashHome />} />
            <Route path="students" element={<DashStudents />} />
            <Route path="addCourse" element={<DashCourse />} />
            <Route path="orders" element={<Enrollments />} />
            <Route path="addQuiz" element={<DashQuiz />} />
            <Route path="results" element={<DashResults />} />
            <Route path="analytics" element={<DashAnalytics />} />
        </Route>
    </>
))
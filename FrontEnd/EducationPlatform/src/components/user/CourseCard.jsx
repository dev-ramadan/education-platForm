import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";

/**
 * CourseCard — كارد الكورس للعرض في صفحة الكورسات
 */
export default function CourseCard({ course }) {
  return (
    <Link
      to={`/course/${course.id}`}
      className="glass rounded-2xl overflow-hidden hover-scale block"
    >
      <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-6xl">
        📚
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-1">{course.title}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between">
          <StarRating rating={course.rating || 4.5} />
          <span className="font-black text-blue-600 text-lg">{course.price} ج.م</span>
        </div>
      </div>
    </Link>
  );
}

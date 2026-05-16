/**
 * StarRating — عرض تقييم النجوم
 * @param {number} rating - من 0 إلى 5
 */
export default function StarRating({ rating = 0 }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="18"
          height="18"
          viewBox="0 0 14 14"
          fill={star <= Math.round(rating) ? "#e9a823" : "none"}
          stroke="#e9a823"
          className="transition-transform hover:scale-110"
        >
          <polygon points="7,1 8.8,5.2 13.4,5.6 10.1,8.5 11.1,13 7,10.5 2.9,13 3.9,8.5 0.6,5.6 5.2,5.2" />
        </svg>
      ))}
    </span>
  );
}

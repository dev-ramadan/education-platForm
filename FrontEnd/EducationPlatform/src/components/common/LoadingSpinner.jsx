/**
 * LoadingSpinner — سبينر التحميل
 * @param {boolean} fullScreen - يأخذ الشاشة كاملة
 */
export default function LoadingSpinner({ fullScreen = false }) {
  const spinner = (
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
  );
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        {spinner}
      </div>
    );
  }
  return <div className="flex justify-center items-center h-64">{spinner}</div>;
}

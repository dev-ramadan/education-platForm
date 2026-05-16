/**
 * Modal — غلاف مودال عام مع overlay وزر إغلاق
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {ReactNode} children
 * @param {string} maxWidth - Tailwind class مثل "max-w-md"
 */
export default function Modal({ isOpen, onClose, children, maxWidth = "max-w-md" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`relative w-full ${maxWidth} animate-fade-in`}>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-red-500 font-bold z-10 text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function AuthBox({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96">

        <h1 className="text-xl font-bold mb-4">{title}</h1>

        {children}

      </div>
    </div>
  );
}
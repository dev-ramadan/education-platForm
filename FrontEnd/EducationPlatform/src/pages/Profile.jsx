export default function Profile() {
  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6">

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full"></div>

        <div>
          <h2 className="font-bold text-lg">User Name</h2>
          <p className="text-gray-500">user@email.com</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="p-3 bg-gray-100 rounded">My Courses</div>
        <div className="p-3 bg-gray-100 rounded">Certificates</div>
      </div>

    </div>
  );
}
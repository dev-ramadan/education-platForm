import { useState } from "react";
import { uploadVideoToCloudinary } from "../../utils/uploade";

export default function AddLessonModal({ courseId, setIsAddingLesson }) {
  const [lessonForm, setLessonForm] = useState({
    title: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [addingLoading, setAddingLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleAddLesson = async () => {
    if (!lessonForm.title || !videoFile) {
      return alert("يرجى إدخال البيانات واختيار فيديو");
    }

    try {
      setAddingLoading(true);

      // ✅ رفع الفيديو مع البروجرس
      const videoUrl = await uploadVideoToCloudinary(
        videoFile,
        setProgress
      );

      // ✅ إرسال للباك
      const res = await fetch("http://localhost:3000/api/lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: lessonForm.title,
          video_url: videoUrl,
          courseId,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("تم إضافة الدرس بنجاح ✅");

      // Reset
      setLessonForm({ title: "" });
      setVideoFile(null);
      setProgress(0);
      setIsAddingLesson(false);

    } catch (err) {
      alert(err.message || "حصل خطأ");
    } finally {
      setAddingLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">

        {/* ❌ Close */}
        <button
          onClick={() => setIsAddingLesson(false)}
          className="absolute top-4 left-4 text-slate-400 hover:text-red-500 font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">
          إضافة درس
        </h2>

        <div className="space-y-4">

          {/* Title */}
          <input
            type="text"
            placeholder="عنوان الدرس"
            value={lessonForm.title}
            onChange={(e) =>
              setLessonForm({ title: e.target.value })
            }
            className="border p-3 w-full rounded-lg"
          />

          {/* Upload */}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="border p-3 w-full rounded-lg"
          />

          {/* اسم الفيديو */}
          {videoFile && (
            <p className="text-sm text-gray-500">
              {videoFile.name}
            </p>
          )}

          {/* 🎥 Preview */}
          {videoFile && (
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="w-full rounded-lg"
            />
          )}

          {/* 🔥 Progress Bar */}
          {progress > 0 && (
            <div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">{progress}%</p>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleAddLesson}
            disabled={addingLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            {addingLoading ? "جاري الرفع..." : "حفظ الدرس"}
          </button>

        </div>
      </div>
    </div>
  );
}
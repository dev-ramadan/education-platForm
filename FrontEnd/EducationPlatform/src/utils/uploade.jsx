export const uploadVideoToCloudinary = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file selected"));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "edu_plateform");

    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/dvbfsojns/video/upload"
    );

    // ✅ Progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    // ✅ Success
    xhr.onload = () => {
      const data = JSON.parse(xhr.response);

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data.secure_url);
      } else {
        reject(new Error(data.error?.message || "Upload failed"));
      }
    };

    // ❌ Error
    xhr.onerror = () => reject(new Error("Network error"));

    xhr.send(formData);
  });
};
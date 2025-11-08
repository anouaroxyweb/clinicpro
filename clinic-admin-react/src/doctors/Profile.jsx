import React, { useEffect, useState } from "react";
import api from "../api";
import { Camera, Edit3, Save, X } from "lucide-react";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [file, setFile] = useState(null);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    api.get("/me").then(({ data }) => {
      setDoctor(data.doctor);
      setForm({
        name: data.name,
        email: data.email,
        bio: data.doctor?.bio || "",
      });
    });
  }, []);

  const updateProfile = async () => {
    await api.put("/doctor/update-profile", form);
    const { data } = await api.get("/me");
    setDoctor(data.doctor);
    setEdit(false);
  };

  const updateImage = async () => {
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("image", file);

    await api.post("/doctor/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { data } = await api.get("/me");
    setDoctor(data.doctor);
  };

  if (!doctor) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg mt-10">
      
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <img
            src={doctor.photo_url || "/default-doctor.png"}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow"
          />
          <label className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer shadow text-white">
            <Camera size={16} />
            <input 
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>

        <button
          onClick={updateImage}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
        >
          Update Photo
        </button>
      </div>

      {/* Info */}
      {!edit ? (
        <div className="mt-6 space-y-2 text-center">
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-blue-500 font-medium">{doctor.specialty || "—"}</p>
          <p className="text-sm opacity-70">{doctor.email}</p>

          {doctor.bio && <p className="mt-4 text-sm opacity-80">{doctor.bio}</p>}

          <button
            onClick={() => setEdit(true)}
            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center gap-1 mx-auto"
          >
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <input
            className="w-full p-2 rounded bg-neutral-700 text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-2 rounded bg-neutral-700 text-white"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            className="w-full p-2 rounded bg-neutral-700 text-white h-24 resize-none"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          ></textarea>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={updateProfile}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-1"
            >
              <Save size={16} /> Save
            </button>

            <button
              onClick={() => setEdit(false)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-1"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

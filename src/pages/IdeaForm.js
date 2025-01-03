import React, { useState } from "react";
import { db, auth } from "../components/firebase";
import { Timestamp, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !image || !pitch) {
      toast.error("All fields are required!", {
        position: "bottom-center",
      });
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to submit a pitch!", {
        position: "bottom-center",
      });
      return;
    }
    const uniqueId = user.uid + "_" + Date.now();
    const pitchData = {
      id: uniqueId,
      title,
      description,
      category,
      image,
      _createdAt: Timestamp.now(),
      views: 0,
      userId: user.uid,
      pitch,
      author: {
        name: `${user.displayName || "Anonymous"}`,
        image: user.photoURL || "",
      },
    };

    setLoading(true);

    try {
      await setDoc(doc(db, "ideas", uniqueId), pitchData);
      toast.success("Pitch submitted successfully!", {
        position: "top-center",
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setImage("");
      setPitch("");
    } catch (error) {
      console.error("Error submitting pitch: ", error);
      toast.error("Failed to submit pitch. Please try again later.", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Submit Your Pitch</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Title Field */}

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Pitch Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border-[3px] border-black rounded-full focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
            placeholder="Enter pitch title"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Pitch Title</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border-[3px] border-black rounded-full focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
            placeholder="Enter pitch description"
            required
          />
        </div>

        {/* Pitch */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Pitch Description</label>
          <textarea
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            className="w-full px-4 py-2 border-[3px] border-black rounded-[20px] focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
            placeholder="Describe your idea and how you plan to solve it!"
            rows="5"
            required
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border-[3px] border-black rounded-full focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
            placeholder="Enter category (e.g., Robotics, AI)"
            required
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 border-[3px] border-black rounded-full focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-1/2 py-2 px-4 rounded-full text-white font-semibold transition duration-300 btn`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Pitch"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;


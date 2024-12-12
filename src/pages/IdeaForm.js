import React, { useState } from "react";
import { db , auth } from "../components/firebase"; 
import { Timestamp, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [pitch , setPitch] = useState("hello");
  const [loading, setLoading] = useState(false);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!title || !description || !category || !image || !pitch) {
      toast.error("All fields are required!", {
        position: "bottom-center",
      });
      return;
    }

    // Get the current user from Firebase Authentication
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to submit a pitch!", {
        position: "bottom-center",
      });
      return;
    }

    // Prepare the data for Firestore
    const pitchData = {
      title,
      description,
      category,
      image,
      _createdAt: Timestamp.now(), // Store the current timestamp
      views: 0, // Initially set views to 0
      userId: user.uid, // User ID from Firebase Auth
      pitch,
      author: {
        name: `${user.displayName || "Anonymous"}`,
        image: user.photoURL || "", // Optionally, use user's profile photo
      },
    };

    setLoading(true);

    try {
      // Store the pitch data in the 'ideas' collection
      await setDoc(doc(db, "ideas", user.uid + "_" + Date.now()), pitchData); // Unique document ID
      toast.success("Pitch submitted successfully!", {
        position: "top-center",
      });

      // Reset the form after successful submission
      setTitle("");
      setDescription("");
      setCategory("");
      setImage("");
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Submit Your Pitch</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-lg font-medium">Pitch Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter pitch title"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-lg font-medium">Pitch Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter pitch description"
            rows="5"
            required
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-lg font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter category (e.g., Robotics, AI)"
            required
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label className="block text-lg font-medium">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Pitch"}
        </button>
      </form>
    </div>
  );
};

export default Create;

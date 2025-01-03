import React, { useState, useEffect } from "react";
import { auth, db } from "../components/firebase"; 
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { Timestamp } from "firebase/firestore";

const formatDate = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return "Invalid Date";
};

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null); 
  const [userIdeas, setUserIdeas] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {

          const userDocRef = doc(db, "Users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserInfo(userDocSnap.data());
          } else {
            toast.error("User data not found", { position: "bottom-center" });
          }


          const ideasQuery = query(
            collection(db, "ideas"),
            where("userId", "==", user.uid)
          );
          const ideasSnapshot = await getDocs(ideasQuery);
          const ideas = ideasSnapshot.docs.map(doc => doc.data());
          setUserIdeas(ideas);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        toast.error("Failed to load user data", { position: "bottom-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar: User Information */}
      <div className="w-1/4 p-6 bg-gray-100">
        <div className="flex flex-col items-center">
          <img
            src={userInfo?.photo || "/avatar.jpg"}
            alt={userInfo?.firstName}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold">{userInfo?.firstName} {userInfo?.lastName}</h2>
          <p className="text-sm text-gray-500">{userInfo?.email}</p>
        </div>
      </div>

      {/* Right Side: User Submitted Ideas */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-semibold mb-6">My Ideas</h1>

        {/* Display user startup ideas */}
        {userIdeas.length === 0 ? (
          <p>No ideas submitted yet.</p>
        ) : (
          <ul className="space-y-6">
            {userIdeas.map((idea, index) => (
              <li key={index} className="bg-pink-50 shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold">{idea.title}</h3>
                <p className="text-sm text-gray-500">{idea.category}</p>
                <p className="mt-2">{idea.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-400">
                  {formatDate(idea._createdAt)}
                  </span>
                  <button
                    className="btn"
                    onClick={() => navigate(`/startup/${idea._id}`)} // Navigate to idea detail page
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;

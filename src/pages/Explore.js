import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebase"; 
import IdeaCard from "../components/IdeaCard";

function Explore() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ideas"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-pink-500 text-white py-16 px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
      </section>

      {/* Startups Section */}
      <section className="py-16 px-6">
        <p className="text-3xl font-semibold">All Startups</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="mt-7 card_grid">
            {posts.length > 0 ? (
              posts.map((post) => <IdeaCard key={post.id} post={post} />)
            ) : (
              <p className="no-results">No startups found</p>
            )}
          </ul>
        )}
      </section>
    </>
  );
}

export default Explore;
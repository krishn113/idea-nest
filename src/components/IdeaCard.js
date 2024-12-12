import React from "react";
import { Link } from "react-router-dom"; // Replace with 'next/link' if using Next.js
import { Timestamp } from "firebase/firestore";

const formatDate = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString(); // Convert to JavaScript Date object and format
  }
  return "Invalid Date"; // Fallback in case it's not a Timestamp
};

const IdeaCard = ({ post }) => {
  if (!post) return <p>Invalid data provided.</p>;

  const {
    id,
    _createdAt,
    views,
    author,
    title,
    category,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link to={`/user/${author?.id || "#"}`} className="text-16-medium line-clamp-1">
            {author?.name || "Unknown Author"}
          </Link>
          <Link to={`/startup/${id}`} className="text-26-semibold line-clamp-1">
            {title}
          </Link>
        </div>
        <Link to={`/user/${author?.id || "#"}`}>
          <img
            src={author?.image || "https://via.placeholder.com/48"}
            alt={author?.name || "Unknown Author"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link to={`/startup/${id}`}>
        <p className="startup-card_desc">{description}</p>
        <img
          src={image || "https://via.placeholder.com/300"}
          alt={title || "Startup image"}
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link to={`/?query=${category?.toLowerCase()}`} className="text-16-medium">
          {category || "Unknown Category"}
        </Link>
        <button
          className="startup-card_btn"
          onClick={() => (window.location.href = `/startup/${id}`)}
        >
          Details
        </button>
      </div>
    </li>
  );
};

export default IdeaCard;

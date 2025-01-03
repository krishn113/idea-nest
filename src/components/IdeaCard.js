import React from "react";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

// Format Firestore Timestamp to readable date
const formatDate = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return "Invalid Date";
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
      {/* Date and Views */}
      <div className="flex-between">
        <p className="running-text">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      {/* Author and Title */}
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <div className="text-16-medium">
            {author?.name || "Unknown Author"}
          </div>
          <div className="text-26-semibold line-clamp-1">{title}</div>
        </div>
        <Link to={`/user/${author?.id || "#"}`}>
          <img
            src={author?.image || "/avatar.jpg"}
            alt={author?.name || "Unknown Author"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      {/* Description and Image with Link */}
      <Link to={`/startup/${id}`}>
        <p className="startup-card_desc">{description}</p>
        <img
          src={image || "/placeholder.png"}
          alt={title || "Startup image"}
          className="startup-card_img"
        />
      </Link>

      {/* Category and Details Button */}
      <div className="flex-between gap-3 mt-5">
        <Link to={`/?query=${category?.toLowerCase()}`} className="text-16-medium">
          {category || "Unknown Category"}
        </Link>
        <Link to={`/project/${id}`} className="btn">
          Details
        </Link>
      </div>
    </li>
  );
};

export default IdeaCard;

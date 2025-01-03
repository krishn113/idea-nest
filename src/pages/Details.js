import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/firebase";
import { FaTags, FaEye, FaCalendarAlt } from "react-icons/fa"

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, "ideas", id);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          setProject(projectSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-500">Loading...</p>
      </div>
    );

  if (!project)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-red-500">Project not found!</p>
      </div>
    );

    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-8">
          {project.author?.profileImage ? (
            <img
              src={project.author.profileImage}
              alt={project.author.name}
              className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold">
              {project.author?.name?.charAt(0) || "?"}
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{project.title}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Created by{" "}
              <span className="text-blue-600 font-medium">{project.author?.name || "Anonymous"}</span>{" "}
              on{" "}
              <span className="font-medium">
                {project.createdAt || "Unknown date"}
              </span>
            </p>
          </div>
        </div>
    
        {/* Image and Description Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="col-span-1 md:col-span-1 w-full h-full object-cover rounded-lg shadow-md"
            />
          )}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{project.pitch}</p>
          </div>
        </div>
    
        {/* Additional Details Section */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <FaTags className="text-gray-600" />
              <span className="font-medium text-gray-700">Category:</span>
              <span className="text-gray-600">{project.category || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEye className="text-gray-600" />
              <span className="font-medium text-gray-700">Views:</span>
              <span className="text-gray-600">{project.views || "0 views"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-600" />
              <span className="font-medium text-gray-700">Created At:</span>
              <span className="text-gray-600">{project.createdAt || "Unknown date"}</span>
            </div>
          </div>
        </div>
      </div>
    );
    
  };
  
export default ProjectDetails;
  

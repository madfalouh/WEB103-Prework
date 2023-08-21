import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatorsContext } from "../context/creators.context";
import { supabase } from "../client";
import "./ShowCreator.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function ShowCreator() {
  const { id } = useParams();
  const { currentCreators: creators } = useContext(CreatorsContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    if (creators) {
      const specificCreator = creators.find(
        (creator) => creator.id === Number(id)
      );
      setCreator(specificCreator);
    }
  }, [creators]);

  if (!creator) {
    return <div>Loading or creator not found...</div>;
  }

  const handleDelete = async (e) => {
    e.preventDefault(); 

    try {
      const { data, error } = await supabase
        .from("creators")
        .delete()
        .eq("id", creator.id);
      window.location.replace("/");
      if (error) {
        throw error;
      }

      console.log("Successfully deleted!", data);
    } catch (error) {
      console.error("Error deleting creator:", error.message);
    }
  };

  function getSanitizedURL(url, platform) {
    if (!url) return "";

    switch (platform) {
      case "youtube":
        if (!url.startsWith("https://")) {
          return `https://www.youtube.com/@${url}`;
        }
        break;
      case "twitter":
        if (!url.startsWith("https://") && url.startsWith("@")) {
          return `https://www.twitter.com/${url.substring(1)}`;
        } else if (!url.startsWith("https://")) {
          return `https://www.twitter.com/${url}`;
        }
        break;
      case "instagram":
        if (!url.startsWith("https://") && url.startsWith("@")) {
          return `https://www.instagram.com/${url.substring(1)}`;
        } else if (!url.startsWith("https://")) {
          return `https://www.instagram.com/${url}`;
        }
        break;
      default:
        break;
    }
    return url;
  }

  const sanitizedYouTubeURL = getSanitizedURL(creator.url_youtube, "youtube");
  const sanitizedTwitterURL = getSanitizedURL(creator.url_twitter, "twitter");
  const sanitizedInstagramURL = getSanitizedURL(
    creator.url_instagram,
    "instagram"
  );

  return (
    <>
      <div className="showCreator-container">
        <div className="showCreator">
          <div className="content-container">
            <img src={creator.imageURL} alt={creator.name} />
            <div className="details-container">
              <label className="name" style={{ fontSize: "2rem" }}>
                {creator.name}
              </label>
              <label style={{ fontSize: "0.85rem" }}>
                {creator.description}
              </label>
              {creator.url_instagram && (
                <p className="url">
                  <a
                    href={sanitizedInstagramURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                  </a>
                  {creator.url_instagram}
                </p>
              )}
              {creator.url_twitter && (
                <p className="url">
                  <a
                    href={sanitizedTwitterURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon />
                  </a>
                  {creator.url_twitter}
                </p>
              )}
              {creator.url_youtube && (
                <p className="url">
                  <a
                    href={sanitizedYouTubeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTubeIcon />
                  </a>
                  {creator.url_youtube}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="button-container">
          <button
            onClick={() => {
              window.location.replace(`/edit/${creator.id}`);
            }}
          >
            EDIT
          </button>
          <button
            type="button"
            style={{ backgroundColor: "red" }}
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="delete-dialog-overlay">
          <div className="delete-dialog">
            <p>Are you sure you want to delete this creator?</p>
            <div className="iniline-buttons">
              <button className="red" type="button" onClick={handleDelete}>
                Yes, delete
              </button>
              <button type="button" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowCreator;

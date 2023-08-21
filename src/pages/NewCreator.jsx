import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreatorsContext } from "../context/creators.context";
import { supabase } from "../client";
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
function NewCreator() {

  const [creator, setCreator] = useState({
  name: '',
  description: '',
  imageURL: '',
  url_instagram: '',
  url_twitter: '',
  url_youtube: ''
});




  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault(); 



    try {
      const { data, error } = await supabase
        .from('creators')
        .insert([{
          name: creator.name,
          description: creator.description,
          imageURL: creator.imageURL,
          url_instagram: creator.url_instagram,
          url_twitter: creator.url_twitter,
          url_youtube: creator.url_youtube,
        }]);
      window.location.replace("/");

      if (error) {
        throw error;
      }

      console.log('Successfully added!', data);

    } catch (error) {
      console.error('Error adding creator:', error.message);
    }
  };

  return (
<div className="edit-page-container">
      <div className="grid   ">
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <p>
              <em>Provide a name for your creator</em>
            </p>
            <input
              type="text"
              name="name"
              value={creator.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <p>
              <em>
                Provide a description of the creator. Who are they? What makes
                them interesting?
              </em>
            </p>
            <textarea
              type="text"
              name="description"
              value={creator.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL
            <p>
              <em>
                Provide a link to an image of your creator. Be sure to include
                the http://
              </em>
            </p>
            <input
              type="text"
              name="imageURL"
              value={creator.imageURL}
              onChange={handleChange}
            />
            <h3>SOCIAL MEDIA LINKS</h3>
          </label>
          <label>
          <InstagramIcon></InstagramIcon>  Instagram
            <p>
              <em>Provide the instagram of the creator</em>
            </p>
            <input
              type="text"
              name="url_instagram"
              value={creator.url_instagram}
              onChange={handleChange}
            />
          </label>
          <label>
          <TwitterIcon></TwitterIcon>  Twitter
            <p>
              <em>Provide the twitter of the creator</em>
            </p>
            <input
              type="text"
              name="url_twitter"
              value={creator.url_twitter}
              onChange={handleChange}
            />
          </label>
          <label>
            <YouTubeIcon></YouTubeIcon> Youtube
            <p>
              <em>Provide the instagram of the creator</em>
            </p>
            <input
              type="text"
              name="url_youtube"
              value={creator.url_youtube}
              onChange={handleChange}
            />
          </label>
          <div className="grid">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCreator;

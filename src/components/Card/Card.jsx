import React from "react";
import { Link } from "react-router-dom";
import './Card.css'
import InfoIcon from '@mui/icons-material/Info';
import CreateIcon from '@mui/icons-material/Create';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Card({ creatorData }) {
  const {
    id,
    name,
    description,
    imageURL,
    url_youtube,
    url_twitter,
    url_instagram,
  } = creatorData;

  const truncatedDescription = description.substring(0, 150) + (description.length > 150 ? '...' : '');

function getSanitizedURL(url, platform) {
    if (!url) return '';
    
    switch (platform) {
        case 'youtube':
            if (!url.startsWith('https://')) {
                return `https://www.youtube.com/@${url}`;
            }
            break;
        case 'twitter':
            if (!url.startsWith('https://') && url.startsWith('@')) {
                return `https://www.twitter.com/${url.substring(1)}`;
            } else if (!url.startsWith('https://')) {
                return `https://www.twitter.com/${url}`;
            }
            break;
        case 'instagram':
            if (!url.startsWith('https://') && url.startsWith('@')) {
                return `https://www.instagram.com/${url.substring(1)}`;
            } else if (!url.startsWith('https://')) {
                return `https://www.instagram.com/${url}`;
            }
            break;
        default:
            break;
    }
    return url;
}

const sanitizedYouTubeURL = getSanitizedURL(url_youtube, 'youtube');
const sanitizedTwitterURL = getSanitizedURL(url_twitter, 'twitter');
const sanitizedInstagramURL = getSanitizedURL(url_instagram, 'instagram');

  return (
    <article style={{ backgroundImage: `url(${imageURL})` }}>
      <div className="first-sction">
        <h3>{name}</h3>
        <div className="links">
          <Link className="link" to={{ pathname: `/edit/${id}` }}>
            <CreateIcon style={{ color: "white", fontSize: "25px" }}></CreateIcon>
          </Link>
          <Link className="link" to={{ pathname: `/${id}` }}>
            <InfoIcon style={{ color: "white", fontSize: "25px" }}></InfoIcon>
          </Link>
        </div>
      </div>

      <p>{truncatedDescription}</p>

      <div className="social-icons">
        {url_youtube && <a href={sanitizedYouTubeURL} target="_blank" rel="noopener noreferrer"><YouTubeIcon style={{ color: "red" }} /></a>}
        {url_twitter && <a href={sanitizedTwitterURL} target="_blank" rel="noopener noreferrer"><TwitterIcon style={{ color: "#00acee" }} /></a>}
        {url_instagram && <a href={sanitizedInstagramURL} target="_blank" rel="noopener noreferrer"><InstagramIcon style={{ color: "#C13584" }} /></a>}
      </div>
    </article>
  );
}

export default Card;

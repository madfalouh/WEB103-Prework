import { useContext, useEffect, useState } from "react";
import './Home.css'
import axios from "axios";
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { supabase } from "../client";
import Card from "../components/Card/Card";
import { CreatorsContext } from "../context/creators.context";
function Home() {
  const { currentCreators :creators , currentCreatorsError : err } = useContext(CreatorsContext);

  return (
    <div className="creators-container" >
      {err ? (
        <p>Error: {err.message}</p>
      ) : creators && creators[0] ? (
        creators.map((creator) => {
         return  <Card key={creator.id} creatorData={creator} />
        })
      ) : (
        <p> waiting for creators </p>
      )}
    </div>
  );
}

export default Home;

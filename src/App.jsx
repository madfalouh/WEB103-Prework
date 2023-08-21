import { useContext, useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./client";
import axios from "axios";
import Card from "./components/Card/Card";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditPage from "./pages/EditPage";
import Home from "./pages/Home";
import { CreatorsContext } from "./context/creators.context";
import NewCreator from "./pages/NewCreator";
import ShowCreator from "./pages/ShowCreator";
import Nav from "./components/Nav/Nav";

function App() {
  const { setCurrentCreators, setCurrentCreatorsError } =
    useContext(CreatorsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data, error } = await supabase.from("creators").select("*");
        if (error) throw error;
        setCurrentCreators(data);
      } catch (error) {
        setCurrentCreatorsError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="/edit/:id" element={<EditPage />}></Route>
            <Route path="/new" element={<NewCreator />}></Route>
            <Route path="/:id" element={<ShowCreator />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

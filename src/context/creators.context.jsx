import { createContext, useState } from "react";

export const CreatorsContext = createContext({

currentCreators : null , 
setCurrentCreators : ()=> null
});


export const CreatorsProvider  = ({children})=>{

const [currentCreators , setCurrentCreators] = useState(null) 
const [currentCreatorsError , setCurrentCreatorsError] = useState(null) 

const value = {currentCreators , setCurrentCreators , currentCreatorsError , setCurrentCreatorsError}

return <CreatorsContext.Provider  value = {value} > {children} </CreatorsContext.Provider>
} 


import {createContext, useState,useContext} from 'react';

export interface LoaderContextType{
    isLoading:boolean;
    setIsLoading:(value:boolean)=>void;
}
export const LoaderContext=createContext<LoaderContextType | null>(null);



export const LoadingProvider=({children}: {children: React.ReactNode})=>{
    const [isLoading,setIsLoading]=useState(false);
    const value:LoaderContextType={isLoading,setIsLoading}
    return(
    <LoaderContext.Provider value={value}>
        {children}
    </LoaderContext.Provider>
    );
}

export const useLoader=()=>{
    const context=useContext(LoaderContext);    
    if (!context){
        throw new Error("useLoader must be used within a LoadingProvider");
    }
    return context;
}
import express from "express";


export default function getUser({req, filters} : {req: express.Request, filters: "default" | "full"}) { 
    try { 
        if (filters == "full") { 


        } else { 

        }
    } catch (err : any) { 
       throw new Error(err.message);
    }
}


import express from 'express';
const router = express.Router();


router.get("/:id", async (req: express.Request, res:express.Response) => { 
    res.status(200).send("hello!");
})

export default router;
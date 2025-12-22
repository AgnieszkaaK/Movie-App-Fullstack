import express from "express";
import Actor from "./actorModel";

const router = express.Router();

router.get("/movies/:id", async (req, res) => {
  const actors = await Actor.find({
    movieId: Number(req.params.id),
  });
  res.status(200).json(actors);
});


export default router;

import { Router } from "express";

const router = Router();

router.post("/users", (req, res) => {
    res.send('ok')
})

export { router }
import express, { Router, Request, Response } from "express"
import axios from "axios"

const router: Router = express.Router()

router.get("/", async (req: Request, res: Response) => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/")
        console.log("data pokemon ", response.data)
        res.json(response.data)
        // res.json([{ "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }, { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }])
    } catch (err) {
        console.log("error fetching pokemons", err)
        res.status(400).send(err)
    }
})

export default router
import { NextFunction, Request, Response } from "express";
import axios from "axios"
import { redisClient } from "../helpers/redis"

export class PostController {
    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {

            await redisClient.connect()

            // 1. check data in redis 
            const redisData = await redisClient.get("posts")
            console.log("redisData => ", redisData)

            if (redisData) {
                return res.status(200).send(JSON.parse(redisData))
            }

            const get = await axios.get('https://jsonplaceholder.typicode.com/posts');
            //console.log("get => ", get)
            await redisClient.setEx("posts", 30, JSON.stringify(get.data))
            //console.log("hello")
            return res.status(200).send(get.data)
        } catch (err) {
            next(err)
        }
    }
}


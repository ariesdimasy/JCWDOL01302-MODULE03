import SampleController from "../controllers/sample.controller";
import { Router } from "express"
import { validateSampleData } from "./../middlewares/sample.validation"
import { uploader } from "../middlewares/uploader";

export default class SampleRouter {
    private router: Router
    private sampleController: SampleController

    constructor () {
        this.sampleController = new SampleController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get("/", this.sampleController.getSampleData)
        this.router.post("/", validateSampleData, this.sampleController.createSampleData)
        this.router.post("/single-upload", uploader("IMG", '/images').single('file'), this.sampleController.addNewImage)
        this.router.post("/multiple-upload", uploader("IMG", '/images').array('files', 3), this.sampleController.addNewImages)
        this.router.post("/send-email", this.sampleController.sendEmail)
    }

    getRouter(): Router {
        return this.router
    }
}
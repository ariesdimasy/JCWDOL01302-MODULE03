import { Router } from "express";
import { createBranch, getBranches, getBranchDetail, updateBranch, deleteBranch, getBranchStats } from "../controllers/branch.controller";

const router = Router()

router.get("/", getBranches)
router.get("/:id", getBranchDetail)
router.get("/stats/all", getBranchStats)
router.post("/", createBranch)
router.put("/:id", updateBranch)
router.delete("/:id", deleteBranch)


export default router
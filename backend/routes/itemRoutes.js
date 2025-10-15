import express from "express"
import { getItems, createItem, renameItem, deleteItem, updateContent } from "../controllers/itemController.js"

const router = express.Router()

router.get("/", getItems)
router.post("/", createItem)
router.patch("/:id/rename", renameItem)
router.patch("/:id/content", updateContent)
router.delete("/:id", deleteItem)

export default router

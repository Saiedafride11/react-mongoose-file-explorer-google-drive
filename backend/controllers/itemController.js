import Item from "../models/Item.js"

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ type: -1, name: 1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create new item
export const createItem = async (req, res) => {
  try {
    const { name, type, parentId, fileType, content, imageUrl } = req.body

    // Validate parent exists if parentId is provided
    if (parentId) {
      const parent = await Item.findById(parentId)
      if (!parent || parent.type !== "folder") {
        return res.status(400).json({ message: "Invalid parent folder" })
      }
    }

    const itemData = {
      name,
      type,
      parentId: parentId || null,
    }

    if (type === "file") {
      itemData.fileType = fileType
      if (fileType === "text") {
        itemData.content = content || ""
      } else if (fileType === "image") {
        itemData.imageUrl = imageUrl || ""
      }
    }

    const item = await Item.create(itemData)
    res.status(201).json(item)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Rename item
export const renameItem = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const item = await Item.findByIdAndUpdate(id, { name }, { new: true, runValidators: true })

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    res.json(item)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update file content
export const updateContent = async (req, res) => {
  try {
    const { id } = req.params
    const { content } = req.body

    const item = await Item.findById(id)

    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    if (item.type !== "file" || item.fileType !== "text") {
      return res.status(400).json({ message: "Can only update text file content" })
    }

    item.content = content
    await item.save()

    res.json(item)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete item and all its children recursively
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params

    const item = await Item.findById(id)
    if (!item) {
      return res.status(404).json({ message: "Item not found" })
    }

    // Recursive function to delete all children
    const deleteRecursive = async (itemId) => {
      const children = await Item.find({ parentId: itemId })
      for (const child of children) {
        await deleteRecursive(child._id)
      }
      await Item.findByIdAndDelete(itemId)
    }

    await deleteRecursive(id)

    res.json({ message: "Item deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

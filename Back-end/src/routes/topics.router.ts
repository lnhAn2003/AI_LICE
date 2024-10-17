import express, { Request, Response } from "express";
import mongoose, { Document, Schema } from "mongoose";

const router = express.Router();

//Define a topic interface
interface ITopic extends Document {
    title: string;
    content: string;
    authorId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    createdAt: Date;
}

// Define the Topic Schema 
const topicSchema = new Schema<ITopic> ({
    title: { type: String, required: true},
    content: {type: String, required: true},
    authorId: {type: Schema.Types.ObjectId, required: false, ref:'User'},
    categoryId:  {type: Schema.Types.ObjectId, required: false, ref:'Category'},
    createdAt: {type: Date, default: Date.now}
});

//created topic model
const Topic = mongoose.model<ITopic>('Topic', topicSchema);

//POST created new topic
router.post('/create', async (req: Request,res: Response) => {
    try {
        const {title, content, authorId, categoryId} = req.body;

        const newTopic = new Topic({
            title,
            content,
            authorId: new mongoose.Types.ObjectId(authorId),
            categoryId: new mongoose.Types.ObjectId(categoryId)
        })

        const savedTopic = await newTopic.save();
        res.status(201).json(savedTopic);
    } catch (err){
        res.status(500).json({ error: "Error creating topic" });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
      const topics = await Topic.find();
      res.status(200).json(topics);     
    } catch (error) {
      res.status(500).json({ message: 'Error fetching topics', error });
    }
  });

export default router;
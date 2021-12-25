import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

let lists: any[] = [];

app.post("/save", (req: Request, res: Response) => {
  console.log(req.body);
  lists = req.body.lists;
  return res.json({ success: true });
});

app.get("/load", (req: Request, res: Response) => res.json({ lists }));

app.listen(port, () => console.log(`Server running at port: ${port}`));

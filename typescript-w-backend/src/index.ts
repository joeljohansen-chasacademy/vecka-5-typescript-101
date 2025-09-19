import express, { Request, Response } from "express";

import { BookModel, Book } from "./models/Book";
import { connectDB } from "./db";

const app = express();
app.use(express.json());

// --- Connect to MongoDB ---
connectDB();

// --- Routes ---
// Create
app.post(
	"/books",
	async (req: Request, res: Response<Book[] | { errorMessage: string }>) => {
		try {
			const books = await BookModel.find();
			return books;
		} catch (error) {
			res.json({ errorMessage: "error" });
		}
	}
);

// Create
app.post("/books", async (req, res) => {});

// Read all
app.get("/books", async (req, res) => {});

type GetBookType = { id: string };

app.get("/books/:id", async (req: Request<GetBookType>, res) => {});

// Update
app.put("/books/:id", async (req, res) => {});

// Delete
app.delete("/books/:id", async (req, res) => {});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

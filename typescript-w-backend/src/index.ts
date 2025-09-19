import express, { Request, Response } from "express";

import { BookModel, Book } from "./models/Book";
import { connectDB } from "./db";
import { z } from "zod";

const app = express();
app.use(express.json());

// --- Connect to MongoDB ---
connectDB();

/**
 * Request<Params (:id), ResBody{}, ReqBody req.body, ReqQuery ?page=2>
 * Reponse<{name:string}>
 */
type ApiResponse<T> = T | { message: string };

// --- Routes ---
const BookCreateSchema = z.object({
	title: z.string().min(1, "title required"),
	author: z.string().min(1, "author required"),
	numPages: z.number().int().positive(),
});

type BookCreate = z.infer<typeof BookCreateSchema>;

/**
 * @route POST /books
 * @description Creates a new book entry in the database.
 * @param {BookCreate} req.body - Object containing book data (title, author, numPages).
 * @returns {Book} 201 - The created book object.
 * @returns {ApiResponse<null>} 400 - If validation fails.
 * @returns {ApiResponse<null>} 500 - If server or DB error occurs.
 */
app.post(
	"/books",
	async (
		req: Request<{}, {}, BookCreate>,
		res: Response<ApiResponse<Book>>
	) => {
		// Validate input using zod schema
		const parsed = BookCreateSchema.safeParse(req.body);

		if (!parsed.success) {
			console.error("Validation error:", parsed.error.flatten());
			return res.status(400).json({
				message: "Validation failed",
			});
		}

		try {
			// Create book in database
			const newBook = await BookModel.create(parsed.data);
			return res.status(201).json(newBook);
		} catch (err) {
			console.error("Database error:", err);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

// Read all
/* app.get("/books", async (req, res) => {
	const books = await BookModel.find();
	res.json(books);
}); */

/* app.get(
	"/books",
	async (req: Request, res: Response<Book[] | { message: string }>) => {
		try {
			const books = await BookModel.find();
			res.json(books);
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
		}
	}
); */

/* type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok: false; error: string };
type ApiResponse<T> = ApiOk<T> | ApiErr; */

app.get("/books", async (req: Request, res: Response<ApiResponse<Book[]>>) => {
	try {
		const books = await BookModel.find();
		res.json(books);
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(500)
				.json({ message: `Internal server error: ${error.message}` });
		} else {
			res.status(500).json({ message: `Unknown error` });
		}
	}
});

app.get(
	"/books/:id",
	async (req: Request<{ id: string }>, res: Response<ApiResponse<Book>>) => {
		try {
			const book = await BookModel.findById(req.params.id);
			if (!book) {
				return res.status(500).json({ message: "Book not found" });
			}
			res.json(book);
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
		}
	}
);

// Update
app.put("/books/:id", async (req, res) => {});

// Delete
app.delete("/books/:id", async (req, res) => {});

// --- Author Endpoints ---

// Create Author
app.post("/authors", async (req: Request, res: Response) => {
	// Create author logic here
});

// Read All Authors
app.get("/authors", async (req: Request, res: Response) => {
	// Get all authors logic here
});

// Read Single Author by ID
app.get("/authors/:id", async (req: Request<{ id: string }>, res: Response) => {
	// Get author by ID logic here
});

// Update Author by ID
app.put("/authors/:id", async (req: Request<{ id: string }>, res: Response) => {
	// Update author logic here
});

// Delete Author by ID
app.delete(
	"/authors/:id",
	async (req: Request<{ id: string }>, res: Response) => {
		// Delete author logic here
	}
);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

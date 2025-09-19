import { Schema, model, InferSchemaType } from "mongoose";

const BookSchema = new Schema({
	title: { type: String, required: true, unique: true },
	author: { type: String, required: true },
	numPages: { type: Number, required: true },
});

export type Book = InferSchemaType<typeof BookSchema>;

export const BookModel = model<Book>("Book", BookSchema);

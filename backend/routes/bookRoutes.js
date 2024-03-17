import { Router } from "express";
import { Book } from "../models/book.js";

const route = Router();

route.post('/', async (request, response) => {
  try {
    if(!request.body.title || !request.body.author || !request.body.publishedYear){
      return response.status(400).send(
        {message: "Send all required field"}
      );
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishedYear: request.body.publishedYear,
    };
    const book = await Book.create(newBook);
    // console.log(book);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

route.get('/', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      books: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

route.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

route.put('/:id', async (request, response) => {
  try {
    if(!request.body.title || !request.body.author || !request.body.publishedYear){
      return response.status(400).send(
        {message: "Send all required field"}
      );
    }
    const { id } = request.params;

    const book = await Book.findByIdAndUpdate(id, request.body);
    if (!book){
      return response.status(400).json({ message: "Book not found"});
    }
    return response.status(200).json({ message: 'Update successful' });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

route.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book){
      return response.status(400).json({ message: "Book not found"});
    }
    return response.status(200).json({ message: `Successfully deleted ${book.title}` });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

export default route;
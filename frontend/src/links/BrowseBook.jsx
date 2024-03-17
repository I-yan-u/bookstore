// import React from 'react'
import Backbutton from "../components/Backbutton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from './css/BrowseBook.module.css';
import Spinner from "../components/Spinner";

const BrowseBook = () => {
    const [book, setBook] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://0.0.0.0:5555/books/${id}`)
        .then(response => {
            setBook(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        });
    }, []);

  return (
    <div>
        <Backbutton />
        <h1 className={style.h1}>Book details</h1>
        {loading ? (<Spinner />) : (
        <div className={style.bookDetail}>
            <div className={style.div}>
                <span className={style.span1}>Id:</span>
                <span className={style.span2}>{book._id}</span>
            </div>
            <div className={style.div}>
                <span className={style.span1}>Title:</span>
                <span className={style.span2}>{book.title}</span>
            </div>
            <div className={style.div}>
                <span className={style.span1}>Author:</span>
                <span className={style.span2}>{book.author}</span>
            </div>
            <div className={style.div}>
                <span className={style.span1}>Published:</span>
                <span className={style.span2}>{book.publishedYear}</span>
            </div>
            <div className={style.div}>
                <span className={style.span1}>Created At:</span>
                <span className={style.span2}>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className={style.div}>
                <span className={style.span1}>Updated At:</span>
                <span className={style.span2}>{new Date(book.updatedAt).toString()}</span>
            </div>
        </div>
        )}
    </div>
  )
}

export default BrowseBook
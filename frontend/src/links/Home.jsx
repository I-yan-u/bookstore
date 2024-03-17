import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import style  from './css/Home.module.css';
import Spinner from '../components/Spinner';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://0.0.0.0:5555/books')
        .then(response => {
            setLoading(false);
            setBooks(response.data.books);
        })
        .catch(error => {
            setLoading(false);
            console.error(error.message);
        });
    }, []);

  return (
    <div className='body'>
        <h2 className={style.h2}>Books</h2>
        <Link to={'/books/create'}>
            <button className={style.create}>Create +</button>
        </Link>
        {loading ? (<Spinner />) : (
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publish Year</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => 
                <tr key={book._id}>
                    <td>
                        {index + 1}
                    </td>
                    <td>
                        {book.title}
                    </td>
                    <td>
                        {book.author}
                    </td>
                    <td>
                        {book.publishedYear}
                    </td>
                    <td className={style.operations}>
                        <Link to={`/books/browse/${book._id}`}>
                            <button>View</button>
                        </Link>
                        <Link to={`/books/update/${book._id}`}>
                            <button className={style.operationsEdit}>Edit</button>
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                            <button className={style.operationsDel}>Delete</button>
                        </Link>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
        )}
    </div>
  )
}

export default Home;
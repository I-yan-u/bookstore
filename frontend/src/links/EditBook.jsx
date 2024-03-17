import {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import style from './css/EditBook.module.css';


const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://0.0.0.0:5555/books/${id}`)
        .then(response => {
            setLoading(false);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setYear(response.data.publishedYear);
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        });
    }, [])

    function handleEdit(){
        const book = {
            title,
            author,
            publishedYear,
        }

        setLoading(true);
        axios.put(`http://0.0.0.0:5555/books/${id}`, book)
        .then(() => {
            setLoading(false);
            navigate('/');
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        })
    }

  return (
    <div>
        <Backbutton />
        <h2 className={style.h2}>Edit Book</h2>
        {loading ? <Spinner /> : ''}
        <div className={style.container}>
            <div className={style.fields}>
                <label className={style.label} htmlFor={title}>Title</label>
                <input 
                className={style.input}
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={style.fields}>
                <label className={style.label} htmlFor={author}>Author</label>
                <input 
                className={style.input}
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div className={style.fields}>
                <label className={style.label} htmlFor={publishedYear}>Year Published</label>
                <input
                className={style.input} 
                type='number'
                value={publishedYear}
                onChange={(e) => setYear(e.target.value)}
                />
            </div>
            <button className={style.saveButton} onClick={handleEdit}>Save</button>
        </div>
    </div>
  )
}

export default EditBook;
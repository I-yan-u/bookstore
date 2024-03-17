import {useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import style from './css/Createbook.module.css';

const Createbook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSave(){
        const book = {
            title,
            author,
            publishedYear,
        }

        setLoading(true);
        axios.post('http://0.0.0.0:5555/books', book)
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
        <h2 className={style.h2}>Create Book</h2>
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
            <button className={style.saveButton} onClick={handleSave}>Save</button>
        </div>
    </div>
  )
}

export default Createbook
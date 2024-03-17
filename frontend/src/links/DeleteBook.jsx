import {useState} from 'react'
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import style from './css/DeleteBook.module.css';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleDelete(){
    setLoading(true);
    axios.delete(`http://0.0.0.0:5555/books/${id}`)
    .then(() => {
      setLoading(false);
      navigate('/');
      alert('Deleted');
    })
    .catch(error => {
      setLoading(false);
      console.log(error);
    })
  }
  return (
    <div>
        <Backbutton />
        { loading ? (<Spinner />) :
          <div className={style.container}>
            <h3 className={style.h3}>Confirm delete</h3>
            <button className={style.saveButton} onClick={handleDelete}>Delete</button>
          </div>
        }
    </div>
  )
}

export default DeleteBook;
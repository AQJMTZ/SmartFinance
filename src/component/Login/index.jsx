import { useState } from 'react';
import { Link} from 'react-router-dom';
import styles from "./styles.modules.css";
import axios from 'axios'

const  login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    //error handling

    const [error, setError] = useState("")
    const handleChange = ({currentTarget:input}) =>{
     setData({...data, [input.name]: input.value});
};

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8080/api/login"
            localStorage.setItem("token", res.data)
            window.location = "/"
        }catch (error){
            if (error.response && 
                error.response.status >= 400 && 
                error.response.status <= 500)
            {
                setError(error.response.data.message)
            }

        }

    }


    return (
        <div className={styles.login.container}>
            <div className={styles.login.form.container}>
                <div className={styles.left}>
                <form className={style.form.container} onSubmit= {handleSubmit}>
                        <h1>Login to your Account</h1>
                        //handle Email
                        <input
                        type = "email"
                        placeholder='Email'
                        onChange = {handleChange}
                        name = 'email'
                        value= {data.email}
                        required
                        className={styles.input}/>

                        //handle password
                        <input
                        type = "password"
                        placeholder='Password'
                        onChange = {handleChange}
                        name = 'password'
                        value= {data.password}
                        required
                        className={styles.input}/>
                        {error && <div className={styles.error.msg}>error </div>}
                        <button type="submit" className={style.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                <h1>New Here?</h1>
                <Link to = '/signup'>
                    <button type= 'button' className={styles.white_btn}>
                        Sign Up
                    </button>
                </Link>
                </div>
            </div>
        </div>
    )
};

export default login;
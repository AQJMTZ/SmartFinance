import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios'

const  Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    //error handling

    const [error, setError] = useState("")
    const handleChange = ({currentTarget:input}) =>{
     setData({...data, [input.name]: input.value});
};

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8080/api/users"
            const {data, res} = await axios.post(url, data)
            navigate("/login")
            console.log(res.message)
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
        <div className={styles.signup.container}>
            <div className={styles.signup.form.container}>
                <div className={styles.left}></div>
                <h1>Welcome Back to Smart Finance</h1>
                <Link to = '/login'>
                    <button type= 'button' className={styles.white_btn}>
                        Sign in
                    </button>
                </Link>
                <div className={styles.right}>
                    <form className={style.form.container} onSubmit= {handleSubmit}>
                        <h1>Create Account</h1>

                        //Handle First name input
                        <input
                        type = "text"
                        placeholder='First Name'
                        onChange = {handleChange}
                        name = 'firstName'
                        value= {data.firstName}
                        required
                        className={styles.input}/>
                        //Handle Last Name input
                        <input
                        type = "text"
                        placeholder='Last Name'
                        onChange = {handleChange}
                        name = 'lastName'
                        value= {data.lastName}
                        required
                        className={styles.input}/>
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
            </div>
        </div>
    )
};

export default Signup;
import styles from './styles.modules.css';

const main = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        Window.location.reload();
    }
    return (
        <div classNamec = {styles.main.container}>
            <nav className={styles.navbar}>
                <h1>Facebook</h1>
                <button className={styles.white_btn} onClick = {handleLogout}>
                    Logout
                </button>

            </nav>
        </div>
    )
}

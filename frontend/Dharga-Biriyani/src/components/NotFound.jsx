import {useNavigate} from "react-router-dom"
const NotFound = () => {
    const navigate = useNavigate();

    const styles = {
        container: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to top, #e6c200, #fff6cc)",
            color: "#000",
            borderRadius: "30px",
            textAlign: "center",
            margin: "0"
        },
        code: {
            fontSize: "100px",
            margin: "0",
        },
        btnContainer: {
            marginTop: "20px",
        },
        btn: {
            padding: "10px 20px",
            fontWeight: "bold",
            marginRight: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#00c6ff",
            color: "#000",
            cursor: "pointer",
        },
        btnOutline: {
            padding: "10px 20px",
            fontWeight: "bold",
            borderRadius: "10px",
            border: "2px solid #fff",
            background: "transparent",
            cursor: "pointer"
        }
    }


  return (
    <div style={styles.container}>
        <h1 style={styles.code}>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for doesn't exist</p>

        <div style={styles.container} className="d-flex flex-row w-50 border-10 shadow h-50">
            <button onClick={()=> navigate("/")} style={styles.btn}>Go Home</button>
            <button onClick={()=> navigate(-1)} style={styles.btnOutline}>Go Back</button>
        </div>
    </div>
  )
}

export default NotFound
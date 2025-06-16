import { useNavigate } from "react-router-dom";

export default function LogoutButton(){
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("token");
        navigate("/", {replace : true});
    }

    return (
        <button onClick={logout} style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        padding: "8px 16px",
        backgroundColor: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
      }}>logout</button>
    )
}

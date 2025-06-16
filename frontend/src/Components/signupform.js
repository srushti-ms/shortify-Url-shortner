import { Link } from "react-router-dom";
import "./startPage.css";
import { useNavigate } from "react-router-dom";


function SignupForm() {
  const navigate = useNavigate();

  async function signin(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // console.log(username, password);
    try {
      const res = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      // console.log(data);
      if(res.ok) {
        console.log(data.token);
        localStorage.setItem("token", data.token); 
        navigate("/dashboard",{ replace: true }); 
      }
      else {
        alert("Login failed: " + data.message); 
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container">
      <form className="Form" onSubmit={signin}>
        <h1>Log-in</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="box"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="box"
        />
        <button type="submit">Submit</button>
        <p>
          Already have an account? <Link to="/signup">signup</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;

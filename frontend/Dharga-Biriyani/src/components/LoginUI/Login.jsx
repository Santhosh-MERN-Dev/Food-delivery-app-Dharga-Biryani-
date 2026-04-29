import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../LoginUI/style.css";
import AOS from "aos";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [remail, rsetEmail] = useState("");
  const [rpassword, rsetPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      AOS.init({
        duration: 1000,
      });
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      toast.success("Login Success");
      setEmail("");
      setPassword("");
      navigate("/profile");
      window.location.reload();
    } else {
      toast.error(data.message || "Password Wrong❌");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !remail || !rpassword) {
      toast.error("Please complete all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email: remail, password: rpassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setName("");
        rsetEmail("");
        rsetPassword("");
        setIsRegister(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
      console.error("register error", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="login-ui">
        <div className={isRegister ? "container active" : "container"}>
          <div className="curved-shape"></div>
          <div className="curved-shape2"></div>
          <div className="form-box Login" data-aos="zoom-in">
            <h2 className="animation" style={{ "--D": 0, "--S": 21 }}>
              Login
            </h2>
            <form>
              <div
                className="input-box animation"
                style={{ "--D": 1, "--S": 22 }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
                <box-icon type="solid" name="user" color="gray"></box-icon>
              </div>

              <div
                className="input-box animation"
                style={{ "--D": 2, "--S": 23 }}
              >
                <input
                  type={show ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
                <span
                  onClick={() => setShow(!show)}
                  style={{
                    position: "absolute",
                    right: "2px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {show ? <GoEyeClosed /> : <RxEyeOpen />}
                </span>
                <box-icon name="lock-alt" type="solid" color="gray"></box-icon>
              </div>

              <div
                className="input-box animation"
                style={{ "--D": 3, "--S": 24 }}
              >
                <button type="button" className="btn1" onClick={handleLogin}>
                  Login
                </button>
              </div>

              <div
                className="regi-link animation"
                style={{ "--D": 4, "--S": 25 }}
              >
                <p>
                  Don't have an account? <br />
                  <a
                    href="#"
                    className="SignUpLink"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(true);
                    }}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="info-content Login">
            <h2 className="animation" style={{ "--D": 0, "--S": 20 }}>
              WELCOME BACK!
            </h2>
            <p className="animation" style={{ "--D": 1, "--S": 21 }}>
              We are happy to have you with us again. Your biryani Journey Starts Here! join us today and never miss the flavor of Dharga.
            </p>
          </div>

          <div className="form-box Register" >
            <h2 className="animation" style={{ "--li": 17, "--S": 0 }}>
              Register
            </h2>
            <form>
              <div
                className="input-box animation"
                style={{ "--li": 18, "--S": 1 }}
              >
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Name</label>
                <box-icon type="solid" name="user" color="gray"></box-icon>
              </div>

              <div
                className="input-box animation"
                style={{ "--li": 19, "--S": 2 }}
              >
                <input
                  type="email"
                  required
                  value={remail}
                  onChange={(e) => rsetEmail(e.target.value)}
                />
                <label>Email</label>
                <box-icon name="envelope" type="solid" color="gray"></box-icon>
              </div>

              <div
                className="input-box animation"
                style={{ "--li": 19, "--S": 3 }}
              >
                <input
                  type={show ? "text" : "password"}
                  required
                  value={rpassword}
                  onChange={(e) => rsetPassword(e.target.value)}
                />
                <label>Password</label>
                <span
                  onClick={() => setShow(!show)}
                  style={{
                    position: "absolute",
                    right: "2px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {show ? <GoEyeClosed /> : <RxEyeOpen />}
                </span>
                <box-icon name="lock-alt" type="solid" color="gray"></box-icon>
              </div>

              <div
                className="input-box animation"
                style={{ "--li": 20, "--S": 4 }}
              >
                <button type="button" className="btn" onClick={handleRegister}>
                  Register
                </button>
              </div>

              <div
                className="regi-link animation"
                style={{ "--li": 21, "--S": 5 }}
              >
                <p>
                  already have account! <br />
                  <a
                    href="#"
                    className="SignInLink"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(false);
                    }}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="info-content Register">
            <h2 className="animation fs-2 fw-bold" style={{ "--li": 17, "--S": 0 }}>
              WELCOME TO Dharga Biryani!
            </h2>
            <p className="animation" style={{ "--li": 18, "--S": 1 }}>
              We’re delighted to have you here. Taste the tradition, register now to savor authentic flavors.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

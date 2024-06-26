import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { DataVault } from "../components/DataVault";  
export const SignIn = () => {
  const navigate = useNavigate();
  const { custodian } = useParams()
  const [loginInput, setInput] = useState({
    name: " ",
    password: " ",
  });
  const validator = () => {
    let valid = false;
    let username = "";
    const check = JSON.parse(localStorage.getItem("user"));
    if (!check) {
      navigate("./errorPage");
      return valid;
    }
    check.map((users) => {
      if (
        users.name === loginInput.name &&
        users.password === loginInput.password
      ) {
        valid = true;
        username = users.name;
      }
      return true;
    });
    return { isAuth: valid, _username: username };
  };
  const handleSubmit = (event) => {
    
    event.preventDefault();
    fetch('http://localhost:9000/login', { 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name:loginInput.name,password:loginInput.password })
  })
  .then((result) => {
      return result.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    if (false) {
      navigate(`/marketPlace/${loginInput.name}`);
    } else {
      navigate("/errorPage");
    }
  };
  const handleChange = (event) => {
    setInput({ ...loginInput, [event.target.name]: event.target.value });
  };
  return (
    <div className="container center mb-5 bg-black">
      <section className="register-block">
        <div className="container">
          <div className="row ">
            <div className="col register-sec">
              <h2 className="text-center" style={{fontFamily:"monospace"}}>Login</h2>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <DataVault
                componentInfo = {{
                  className:'name_class',
                  type: 'name',
                  name:'username',
                }}
                inputDetails={{
                  description: "Enter Username",
                  errorMessage: "username required :(",
                }}
              />
              <DataVault
                componentInfo = {{
                  className:'pass_class',
                  type: 'password',
                  name:'password',
                }}
                inputDetails={{
                  description: "Enter password",
                  errorMessage: "password required :(",
                }}
              />
              <button> sign in </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

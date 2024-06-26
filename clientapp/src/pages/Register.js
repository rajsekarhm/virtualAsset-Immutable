import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataVault } from "../components/DataVault";
import { Popup } from "../components/PopUp";

export const Registers = () => {
  const navigate = useNavigate();
  const [requiredInput, setRequiredInput] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [userData, setUserData] = useState({
    name: {
      name: null,
      isname: false,
    },
    password: {
      password: null,
      ispassword: false,
    },
    email: {
      email: null,
      isemail: false,
    },
  });

  const handleChange = (event) => {
    event.preventDefault();
    const {
      email: { isemail },
      name: { isname },
      password: { ispassword },
    } = userData;

    if (!(isemail && isname && ispassword)) {
      setRequiredInput(true);
      setErrorMessage(
        !isemail ? 'email is mandatory'  : !isname ? 'name is mandatory' : !ispassword ? 'password is mandatory' : ''
      )
    }
    // const redis = new Redis('')
    // redis.setInfo()
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    console.log(value.length);
    setUserData((preState) => {
      return {
        ...preState,
        [name]: {
          ...preState[name],
          [name]: value,
          ["is" + name]: value.length ? true : false,
        },
      };
    });
  };

  return (
    <section className="container center register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            {requiredInput ? (
              <Popup isOpen={requiredInput} onClose={() => {}} children={errorMessage} />
            ) : null}
            <h2 className="text-center" style={{ fontFamily: "monospace" }}>
              create Account
            </h2>
            <form className="register-form" action="">
              <DataVault
                componentInfo = {{
                  className:'username_class',
                  type: 'text',
                  name:"name",
                }}
                userData={userData}
                handleInput={handleInput}
                inputDetails={{
                  description: "Enter username",
                  errorMessage: "user required",
                }}
              />
              <DataVault
                componentInfo = {{
                  className:'pass_class',
                  type: 'password',
                  name:'password',
                }}
                userData={userData}
                handleInput={handleInput}
                inputDetails={{
                  description: "Enter password",
                  errorMessage: "password required :(",
                }}
              />
              <DataVault
                componentInfo = {{
                  className:'mail_class',
                  type: 'text',
                  name:'email',
                }}
                userData={userData}
                handleInput={handleInput}
                inputDetails={{
                  description: "Enter Mail",
                  errorMessage: "email is require ;(",
                }}
              />
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-login btn-primary"
                  value="Register"
                  style={{ fontFamily: "monospace" }}
                  onClick={handleChange}
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group" style={{ fontFamily: "monospace" }}>
                Already have account ? Please{" "}
                <a
                  href="# "
                  onClick={() => {
                    navigate("/Login");
                  }}
                  style={{ fontFamily: "monospace" }}
                >
                  Login
                </a>{" "}
                here
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

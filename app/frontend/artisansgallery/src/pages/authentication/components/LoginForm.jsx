import React, { useState, useEffect } from "react";
import backendUrl from "../../../config";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { getUserData, storeToken } from "./TokenHandler";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
  const navigate = useNavigate();
  const loginEndpoint = `${backendUrl}/login/`;
  const usernmevalidationendpoint = `${backendUrl}/usernameisvalid/`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordIsCorrect, setPasswordIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("THIS FIELD IS REQUIRED");

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [UsernameError, setUsernameError] = useState("");

  const [debouncedUsername, setDebouncedUsername] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedUsername(username.trim());
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [username]);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    
  };

  useEffect(() => {
    if (debouncedUsername === "") {
      setUsernameError("THIS FIELD IS REQUIRED");
      setIsUsernameValid(false);
      return;
    }

    const checkUsernameAvailability = async () => {
      try {
        const response = await axios.post(usernmevalidationendpoint, {
          username: debouncedUsername,
        });
        console.log(response.data.message);
        setIsUsernameValid(true);
        setUsernameError("USERNAME EXISTS");
      } catch (error) {
        setIsUsernameValid(false);
        setUsernameError("USERNAME DOES NOT EXIST");
        console.clear();
      }
    };

    checkUsernameAvailability();
  }, [debouncedUsername]);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.trim() === "") {
      setIsUsernameValid(false);
    }

    if (isUsernameValid && username.trim() !== "" && password !== "") {
      try {
        const response = await axios.post(loginEndpoint, {
          username: username,
          password: password,
        });

        storeToken(response.data.token.access);

        
        window.location.href = '/';
        // navigate("/");
      } catch (error) {
        // console.clear();
        setPasswordIsCorrect(false);
        setErrorMessage("YOU HAVE ENETERED WRONG PASSWORD");
      }
    }
  };

  return (
    <>
     
      <div className="login-form">
      
        <form onSubmit={handleSubmit}>
        
          <div className="username">
          <h3>PLEASE LOGIN</h3>
            <input
              type="text"
              id="username"
              placeholder="USERNAME"
              className="input-field"
              value={username}
              onChange={handleUsernameChange}
            />
            {!UsernameError == "" && (
              <ErrorMessage message={UsernameError} correct={isUsernameValid} />
            )}
          </div>
          <div className="password">
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              className="input-field"
              value={password}
              onChange={handlePasswordChange}
            />
            {!errorMessage == "" && (
              <ErrorMessage
                message={errorMessage}
                correct={passwordIsCorrect}
              />
            )}
          </div>
          <div className="form-button">
            <button type="submit" className="button form-button">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;

import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import backendUrl from "../../../config";
import axios from "axios";
const isEmail = (str) => {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(str);
};
const validatePassword = (password) => {
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
  const letters = /[a-zA-Z]/;
  const numbers = /[0-9]/;

  if (
    password.length <= 20 &&
    specialChars.test(password) &&
    letters.test(password) &&
    numbers.test(password)
  ) {
    return true;
  } else {
    return false;
  }
};
const RegistrationForm = () => {
  const usernmevalidationendpoint = `${backendUrl}/usernameisvalid/`;
  const emailvalidationendpoint = `${backendUrl}/emailisvalid/`;
  const customerregistrationEndpoint = `${backendUrl}/customerregister/`;
  const artisanRegistrationEndpoint = `${backendUrl}/artisanregister/`;
  // DECLARING VARIABLES
  
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [shipping_address, setshipping_address] = useState("");
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [first_nameerrormessage, setfirst_nameerrormessage] = useState(
    "THIS FIELD IS REQUIRED"
  );
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [UsernameError, setUsernameError] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [EmailError, setEmailError] = useState("");

  const [isPassValid, setIsPassValid] = useState(false);
  const [PassError, setPassError] = useState("THIS FIELD IS REQUIRED");

  const [isConfirmPassValid, setIsConfirmPassValid] = useState(false);
  const [ConfirmPassError, setConfirmPassError] = useState(
    "THIS FIELD IS REQUIRED"
  );
  // FOR FIRST NAME
  const handlefirstnamechange = (e) => {
    setfirst_name(e.target.value);
    setUsernameError("");
  };

  // FOR USERNAME
  const handleUsernameChange = (e) => {
    setusername(e.target.value);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedUsername(username.trim());
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [username]);

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
        setIsUsernameValid(false);
        setUsernameError(
          "USERNAME ALREADY EXISTS. PLEASE TRY ANOTHER USERNAME"
        );
      } catch (error) {
        setIsUsernameValid(true);
        setUsernameError("USERNAME AVAILABLE");
        console.clear();
      }
    };

    checkUsernameAvailability();
  }, [debouncedUsername]);

  // FOR EMAIL

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedEmail(email.trim());
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [email]);

  useEffect(() => {
    if (debouncedEmail === "") {
      setEmailError("THIS FIELD IS REQUIRED");
      setIsEmailValid(false);
      return;
    }

    if (!isEmail(debouncedEmail)) {
      setEmailError("PLEASE TYPE A VALID EMAIL ADDRESS");
      setIsEmailValid(false);
      return;
    }

    const checkEmailAvailability = async () => {
      try {
        const response = await axios.post(emailvalidationendpoint, {
          email: debouncedEmail,
        });
        setIsEmailValid(false);
        setEmailError("EMAIL ALREADY EXISTS. PLEASE TRY ANOTHER EMAIL");
      } catch (error) {
        setIsEmailValid(true);
        setEmailError("EMAIL AVAILABLE");
        console.clear();
      }
    };

    checkEmailAvailability();
  }, [debouncedEmail]);

  // FOR PASSWORD
  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    if (validatePassword(e.target.value)) {
      setIsPassValid(true);
      setPassError("VALID PASSWORD");
    } else if (e.target.value === "") {
      setIsPassValid(false);
      setPassError("THIS FIELD IS REQUIRED");
    } else {
      setIsPassValid(false);
      setPassError("INVALID PASSWORD");
    }
  };
  // for confirm password
  const handleconfirmPasswordChange = (e) => {
    setconfirmpassword(e.target.value);
    if (e.target.value == password) {
      setIsConfirmPassValid(true);
      setConfirmPassError("PASSWORD MATCHED");
    } else {
      setIsConfirmPassValid(false);
      setConfirmPassError("PASSWORD DOES NOT MATCH");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    
  };

  // SUBMIT
  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(selectedOption==='true'){
      const artisanData = {
       dp:null,
      };
      try {
        const response = await axios.post(artisanRegistrationEndpoint, {
          username,
          first_name,
          last_name,
          email,
          password,
          artisan: artisanData,
        });
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
      }
    }
    else{
      const customerData = {
        shipping_address: shipping_address,
      };
      try {
        const response = await axios.post(customerregistrationEndpoint, {
          username,
          first_name,
          last_name,
          email,
          password,
          customer: customerData,
        });
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
      }
    }
      setfirst_name('');
      setlast_name('');
      setusername('');
      setemail('');
      setpassword('');
      setconfirmpassword('');
      setshipping_address('');

      setIsConfirmPassValid(false);
      setIsPassValid(false);
      setIsEmailValid(false);
      setIsUsernameValid(false);
     
  }
  return (
    <>
      <div className="login-form">
        <form onSubmit={handleSubmit} >
          <div className="username">
            <h3>PLEASE SIGNUP</h3>
            <input
              type="text"
              id="first_name"
              placeholder="FIRST NAME"
              className="input-field"
              value={first_name}
              onChange={handlefirstnamechange}
            />
            {first_name == "" && (
              <ErrorMessage message={first_nameerrormessage} correct={false} />
            )}
          </div>
          <div className="username">
            <input
              type="text"
              id="last_name"
              placeholder="LAST NAME"
              className="input-field"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
            />
          </div>

          {!first_name == "" && (
            <div className="username">
              <input
                type="text"
                id="username"
                placeholder="USERNAME"
                className="input-field"
                value={username}
                onChange={handleUsernameChange}
              />
              {!UsernameError == "" && (
                <ErrorMessage
                  message={UsernameError}
                  correct={isUsernameValid}
                />
              )}
            </div>
          )}

          {isUsernameValid && (
            <div className="username">
              <input
                type="text"
                id="email"
                placeholder="EMAIL"
                className="input-field"
                value={email}
                onChange={handleEmailChange}
              />
              {!EmailError == "" && (
                <ErrorMessage message={EmailError} correct={isEmailValid} />
              )}
            </div>
          )}

          {isEmailValid && (
            <div className="password">
              <input
                type="password"
                id="password"
                placeholder="PASSWORD"
                className="input-field"
                value={password}
                onChange={handlePasswordChange}
              />
              {!PassError == "" && (
                <ErrorMessage message={PassError} correct={isPassValid} />
              )}
            </div>
          )}
          {isPassValid && (
            <div className="password">
              <input
                type="password"
                id="confirm_password"
                placeholder="CONFIRM PASSWORD"
                className="input-field"
                value={confirmpassword}
                onChange={handleconfirmPasswordChange}
              />
              {!ConfirmPassError == "" && (
                <ErrorMessage
                  message={ConfirmPassError}
                  correct={isConfirmPassValid}
                />
              )}
            </div>
          )}
        {selectedOption==="false" && <div className="username">
            <textarea onChange={(e) => setshipping_address(e.target.value)} name="" id="shipping_address" cols="30" rows="10" className="input-field" placeholder="SHIPPING ADDRESS" value={shipping_address}></textarea>
          </div>}
          

          <div className="radio-button">
            <label>
              <input
                type="radio"
                value="true"
                checked={selectedOption === "true"}
                onChange={handleOptionChange}
                className="radio"
              />
              I AM AN ARTISAN/SELLER
            </label>{" "}
            <br /> 
            <label>
              <input
                type="radio"
                value="false"
                checked={selectedOption === "false"}
                onChange={handleOptionChange}
                className="radio"
              />
              I AM A CUSTOMER
            </label>
          </div>

          {isConfirmPassValid && !selectedOption=="" && (
            <div className="form-button">
              <button type="submit" className="button form-button">
                SIGNUP
              </button>
            </div>
          )}

          
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;

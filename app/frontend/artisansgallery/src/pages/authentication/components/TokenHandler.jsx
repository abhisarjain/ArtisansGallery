import axios from "axios";
import backendUrl from '../../../config';

const storeToken = (value)=>{
    if(value)
    {
        localStorage.setItem('token',value);
    }
}

const getToken = () =>{
    
       const token = localStorage.getItem('token');
       return token;
    
   
}
const removeToken=()=>{
    localStorage.removeItem('token')
}

const isLoggedIn = ()=>{
   
    if(getToken()==null || getToken() == ''){
            return false;
    }
    else{
        return true;
    }
};

const getUserData = async () => {
    try {
      const token = getToken();
      if (!isLoggedIn()) {
        return null;
      }
  
      const response = await axios.get(`${backendUrl}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };
//   const isArtisan = async () => {
//     if(isLoggedIn){
//         const userData = await getUserData();
//         return userData.is_artisan;
//     }
//     else{
//         return false;
//     }
    
//   };
const isArtisan = async () => {
    try {
      const userData = await getUserData();
      return userData && userData.is_artisan; // Check if userData exists before accessing its properties
    } catch (error) {
      console.error('Error fetching user data:', error);
      return false; // Set default value if there's an error
    }
  };


  
  const value = await isArtisan();
  const is_artisan = ()=>{
    return value;
  }

// const storeToken = (token) => {
//     document.cookie = `jwtToken=${token}; path=/`;
//   };
  
  // Get JWT Token from Cookies
//   const getToken = () => {
//     const name = "jwtToken=";
//     const decodedCookie = decodeURIComponent(document.cookie);
//     const cookieArray = decodedCookie.split(";");
  
//     for (let i = 0; i < cookieArray.length; i++) {
//       let cookie = cookieArray[i];
//       while (cookie.charAt(0) === " ") {
//         cookie = cookie.substring(1);
//       }
//       if (cookie.indexOf(name) === 0) {
//         return cookie.substring(name.length, cookie.length);
//       }
//     }
  
//     return null;
//   };
//   const removeToken = () => {
//     document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//   };

// const isTokenExpired = () => {
// const token = getToken();
// const decodedToken = jwt_decode(token);
// const currentTime = Date.now() / 1000;

// if (decodedToken.exp < currentTime) {
//   return true; // Token has expired
// } else {
//   return false; // Token is still valid
// }
// };



export {storeToken,getToken,removeToken,getUserData,isLoggedIn,isArtisan,is_artisan};
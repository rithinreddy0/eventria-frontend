// src/utils/checkCookie.js

export function checkCookie(cookieName) {
    // Get all cookies as a single string
    const cookies = document.cookie;
  
    // Find the specific cookie by name
    const cookieExists = cookies.split(';').some((cookie) => {
      return cookie.trim().startsWith(`${cookieName}=`);
    });
  
    return cookieExists;
  }
  
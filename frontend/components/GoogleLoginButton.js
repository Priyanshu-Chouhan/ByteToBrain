import React from 'react';

const GoogleLoginButton = () => (
  <a href="http://localhost:5000/auth/google">
    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  </a>
);

export default GoogleLoginButton; 
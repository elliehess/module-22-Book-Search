import React from 'react';
import SpotifyAuth from 'react-spotify-auth';

const App = () => {
  const [token, setToken] = React.useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div>
      <h1>Welcome to my Spotify app!</h1>
      {token ? (
        <p>You're authenticated with Spotify!</p>
      ) : (
        <SpotifyAuth
          clientId="f91c8a6888f047afa25a43f5b130430c"
          redirectUri="http://localhost:3000/callback"
          onAccessToken={(token) => handleLogin(token)}
        />
      )}
    </div>
  );
};

export default App;

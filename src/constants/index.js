const getAccessToken = () => {
  try {
    const accessTokenString = sessionStorage.getItem("accessToken");

    if (!accessTokenString) {
      return null;
    }

    return accessTokenString;
  } catch (error) {
    console.log("Error reading access token:", error);
    return null;
  }
};

const sendError = (error) => {
  if (error.response) {
    const errMsg = error.response.data.message;
    throw new Error(errMsg);
  }
};

const liveServer = `https://vestor-server.onrender.com`;
const devServer = `http://localhost:4000`;

export { getAccessToken, sendError, liveServer, devServer };

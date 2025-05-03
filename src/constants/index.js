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

function isValidDateFormat(dateString) {
  // Regular expression to match format like "Feb 25 2025"
  const regex =
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(0?[1-9]|[12][0-9]|3[01])\s\d{4}$/;

  return regex.test(dateString);
}

const liveServer = `https://vestor-server.onrender.com`;
const devServer = `http://localhost:4000`;

export { getAccessToken, sendError, liveServer, devServer, isValidDateFormat };

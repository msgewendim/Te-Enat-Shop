import { auth } from "express-oauth2-jwt-bearer";
import axios from "axios";
import {
  AUDIENCE,
  ISSUER_BASE_URL,
  TOKEN_SIGNING_ALG,
} from "../config/env.config";

const jwtCheck = auth({
  audience: AUDIENCE,
  issuerBaseURL: ISSUER_BASE_URL,
  tokenSigningAlg: TOKEN_SIGNING_ALG,
});
export const getUserInfo = async (accessToken: string) => {
  try {
    console.log("Getting user info from Auth0");
    const { data } = await axios.get(
      "https://dev-zkryh8zzdsk666xk.us.auth0.com/userInfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log("User info fetched successfully", data);
    return {
      email: data.nickname,
      name: data.name,
    };
  } catch (error: any) {
    console.error("Error fetching user info:", error.message);
    throw error;
  }
};

const getUserToken = async () => {
  const options = {
    method: "POST",
    url: "https://dev-zkryh8zzdsk666xk.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"ztjPgquzBhAlxHshyCqjBqeNEQfAkN1H","client_secret":"PRueIwrPYfZJ3d2qcGUSZO9SsTW1BQbUqIpWfNg--NaWDjWxTF4H1LkrlFSyjGC_","audience":"https://te-enat-shop.onrender.com/","grant_type":"client_credentials"}',
  };
  const token = await axios.request(options);
};
export default jwtCheck;

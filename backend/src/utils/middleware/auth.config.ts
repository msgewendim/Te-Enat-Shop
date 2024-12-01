import { auth } from "express-oauth2-jwt-bearer";
import axios from "axios";
import {
  AUDIENCE,
  ISSUER_BASE_URL,
  TOKEN_SIGNING_ALG,
} from "../config/env.config";

// middleware to check if the user is authenticated and is authorized to access the resource
const jwtCheck = auth({
  audience: AUDIENCE,
  issuerBaseURL: ISSUER_BASE_URL,
  tokenSigningAlg: TOKEN_SIGNING_ALG,
});

// function to get user info from Auth0
export const getUserInfo = async (accessToken: string) => {
  try {
    const { data } = await axios.get(`${ISSUER_BASE_URL}/userInfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      email: data.email,
      name: data.name,
      image: data.picture,
    };
  } catch (error: any) {
    throw error;
  }
};

// function to get user token from Auth0
export const getUserToken = async () => {
  const options = {
    method: `${ISSUER_BASE_URL}/oauth/token`,
    headers: { "content-type": "application/json" },
    body: {
      client_id: "",
      client_secret: "",
      audience: AUDIENCE,
      grant_type: "client_credentials",
    },
  };
  const token = await axios.request(options);
  return token;
};

export default jwtCheck;

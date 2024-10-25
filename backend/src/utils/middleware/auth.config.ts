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
    const { data } = await axios.get(`${ISSUER_BASE_URL}/userInfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data, "userInfo");
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
};
export default jwtCheck;

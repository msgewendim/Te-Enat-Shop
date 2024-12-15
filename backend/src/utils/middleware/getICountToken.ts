import axios, { AxiosRequestConfig } from "axios";

import {
  I_COUNT_API_URL,
  I_COUNT_CID,
  I_COUNT_PASS,
  I_COUNT_USER,
} from "../config/env.config";
import { ExternalServiceError } from "../customErrors";


export const apiRequest = async <T>(url: string, body: object,headers?: object): Promise<T> => {
  const config: AxiosRequestConfig = {
    headers: headers ? headers : {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: body,
    url,
  };

  try {
    const { data, status } = await axios.request<T>(config);
    if (status >= 400) {
      throw new ExternalServiceError(`Error in API request: ${(data as any).error}`);
    }
    return data;
  } catch (error) {
    if (error instanceof ExternalServiceError) {
      throw error;
    }
    throw new ExternalServiceError(`Unexpected error in API request: ${error}`);
  }
};

export const refreshToken = async (refresh_token: string, access_token: string): Promise<TokenData> => {
  const url = `${I_COUNT_API_URL}/token/refresh`;
  const body = { access_token, refresh_token };

  const data = await apiRequest<TokenRefreshResponse>(url, body);
  
  if (data.status) {
    return data.token_info.token;
  }
  throw new ExternalServiceError('Token refresh failed');
};

export const checkToken = async (refresh_token: string, access_token: string, expiresAt: Date): Promise<ICountSessionResponse> => {
  if (!access_token || Date.now() >= expiresAt.getTime()) {
    const token = await refreshToken(refresh_token, access_token);
    console.log("Refreshed token:", token);
    process.env.I_COUNT_ACCESS_TOKEN = token.access_token;
    process.env.I_COUNT_REFRESH_TOKEN = token.refresh_token;
    process.env.I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT = token.expires.toString();
    return { ...token, expiresAt: new Date(token.expires) };
  }
  console.log("Token is valid");
  return { access_token, refresh_token, expiresAt };
};

export const startICountSession = async (): Promise<ICountSessionResponse> => {
  const url = `${I_COUNT_API_URL}/auth/login`;
  const body = { user: I_COUNT_USER, cid: I_COUNT_CID, pass: I_COUNT_PASS };

  const data = await apiRequest<ICountSessionData>(url, body);
  console.log("Session data:", data);

  const token = await getICountToken(data.sid);
  console.log("ICount token:", token);
  return token;
};
const getICountToken = async (sid: string): Promise<ICountSessionResponse> => {
  const url = `${I_COUNT_API_URL}/token/get_list`;
  const body = {
    sid,
    cid: I_COUNT_CID,
    user: I_COUNT_USER,
    pass: I_COUNT_PASS,
    user_id: 1,
    list_type: "array"
  };

  const data = await apiRequest<AccessTokenResponse>(url, body);
  const { access_token, refresh_token, expires } = data.tokens[0];
  
  return {
    access_token,
    refresh_token,
    expiresAt: new Date(expires),
  };
};

type ICountSessionData = {
  status: boolean;
  sid: string;
}
type ICountSessionResponse = {
  access_token: string;
  expiresAt: Date;
  refresh_token: string;
}
interface AccessTokenResponse {
  status: boolean;
  tokens: TokenData[];
}
type TokenData = {
  access_token: string;
  expires: string;
  refresh_token: string;
  token_id: string;
}

interface TokenRefreshResponse {
  status: boolean;
  token_id: string;
  token_info: {
    token: TokenData;
    token_id: string;
  };
}

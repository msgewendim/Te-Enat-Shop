import axios, { AxiosRequestConfig } from "axios";

import {
  I_COUNT_API_ACCESS_TOKEN,
  I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT,
  I_COUNT_API_REFRESH_TOKEN,
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

export const getNewToken = async (): Promise<TokenData> => {
  const url = `${I_COUNT_API_URL}/token/create`;
  const sid = await startICountSession();
  const body = {
    sid,
    user: I_COUNT_USER,
    cid: I_COUNT_CID,
    pass: I_COUNT_PASS,
    user_id: 1,
    expires_in : 3600,
  };

  const data = await apiRequest<TokenRefreshResponse>(url, body);
  if (data.status) {
    return data.token_info.token;
  }
  throw new ExternalServiceError('Failed to create ICount token');
};


export const checkToken = async (): Promise<ICountSessionResponse> => {
  const access_token = I_COUNT_API_ACCESS_TOKEN;
  const refresh_token = I_COUNT_API_REFRESH_TOKEN;
  const expiresAt = new Date(I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT);

  if (!access_token || Date.now() >= expiresAt.getTime()) {
    const sid = await startICountSession();
    const {access_token, refresh_token, expires} = await getNewToken();
    
    process.env.I_COUNT_ACCESS_TOKEN =  access_token;
    process.env.I_COUNT_REFRESH_TOKEN = refresh_token;
    process.env.I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT = expires;
    
    return { access_token, refresh_token, expiresAt: new Date(expires) };
  }else{
    console.log("Token is valid");
    
    return { access_token, refresh_token, expiresAt };
  }
};

export const startICountSession = async () => {
  const url = `${I_COUNT_API_URL}/auth/login`;
  const body = { user: I_COUNT_USER, cid: I_COUNT_CID, pass: I_COUNT_PASS };

  const data = await apiRequest<ICountSessionData>(url, body);

  return data.sid
};
export const getICountToken = async (sid: string): Promise<ICountSessionResponse> => {
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

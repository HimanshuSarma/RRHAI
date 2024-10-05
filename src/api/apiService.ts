import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../redux/store";

const apiRequest = async ({
  method,
  url,
  data,
  isToken,
  params,
} : {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
  isToken: boolean,
  params?: Object,

}): Promise<{
  response: AxiosResponse | null,
  error: AxiosError<{ errorMessage: string }> | null
}> => {
  let response: AxiosResponse | null = null;
  let error: AxiosError<{ errorMessage: string }> | null = null;

  let options = {
    method: method,
    url: `${import.meta.env.VITE_API_URL}/${url}`,
    headers: {
      Accept: "application/json",
      authorization: ""
    },
    data: data,
    params: params || {},
  };

  if (isToken) {

    options = {
      ...options,
      headers: {
        ...options.headers,
        authorization: (store?.getState() as any)?.auth?.userToken || "",
      },
    };
  }

  // await axios(options)
  //   .then((res) => {
  //     response = res;
  //   })
  //   .catch((err) => {
  //     console.error("API ERROR:::", err);
  //     error = err;
  //   });

  try {
    response = await axios(options);
  } catch (err: any) {
    console.error("API ERROR:::", err);
    error = err;
  }

  return { response, error };
};

export default apiRequest;
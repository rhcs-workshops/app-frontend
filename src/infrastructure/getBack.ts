import axios from 'axios';
import { ResponseBack } from '../domain/ResponseBack';

export const getBack = async (
  url: string,
): Promise<ResponseBack> => {

  const instance = axios.create({
    baseURL: 'url',
    timeout: 1000,
  });

  const responseFailed: ResponseBack = {
    metadata: {
        version: "ERROR",
        colour: "ERROR",
    }
  };

  // Execute Get
  try {
    let response: any;
    response = await instance.get;  
    console.log(response.data)
    if (response.data != null) {
      return response.data
    } 
    return response.data;
  } catch (error) {
    console.log(error);
    return responseFailed;
  }
};

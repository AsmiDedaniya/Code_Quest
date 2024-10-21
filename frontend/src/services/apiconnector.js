import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log("data from apiconnector method",method);
    console.log("data from apiconnector param",params);
    console.log("data from apiconnector url",url);
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : { 'Content-Type': 'application/json' },
        params: params ? params : null,
    });
}
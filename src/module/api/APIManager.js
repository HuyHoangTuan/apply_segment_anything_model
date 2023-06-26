import axios from "axios";
export const APIManager = function() {

    const APIKey = process.env.REACT_APP_API_KEY
    const baseURL = process.env.REACT_APP_API_BASE_URL

    let defaultHeaders = {
    }
    
    let defaultParams = {
        key: APIKey
    }
    
    
    const get = async (endPoint, headers, params, responseType = null, body = null) => {
        let sendHeaders = Object.assign({}, defaultHeaders, headers);
        let sendParams = Object.assign({}, defaultParams, params);
        return axios.get(`${baseURL}${endPoint}`, 
            {
                headers: sendHeaders,
                params: sendParams,
                responseType: responseType,
                data: body
            }
        )
        
    }
    
    const post = async (endPoint, headers, params, responseType = null, body) => {
        let sendHeaders = Object.assign({}, defaultHeaders, headers);
        let sendParams = Object.assign({}, defaultParams, params);
        return axios.post(`${baseURL}${endPoint}`, 
            body,
            {
                headers: sendHeaders,
                responseType: responseType,
                params: sendParams,
            }
        )
    }
    
    return{
        get,
        post
    }
}();
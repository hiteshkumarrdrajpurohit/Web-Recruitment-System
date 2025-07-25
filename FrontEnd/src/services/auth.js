import axios from "axios"

import { config } from "../config"
export const handleSignIn = async (email, password) => {
    try {
        // create url
        const url = `${config.serverURL}/user/login`
    
        // create a body
        const body = {
          email,
          password,
        }
    
        // call Post API
        const response = await axios.post(url, body)
    
        // check if response is OK
        if (response.status == 200) {
          // send the response body
          return response.data
        } else {
          // send null result
          return null
        }
      } catch (ex) {
        console.log(`exception: `, ex)
      }
    }

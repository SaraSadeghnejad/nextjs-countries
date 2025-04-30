import axios from 'axios'

const http = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout: 30000,
    headers: {
      Accept: "application/json",
      "Content-Type": "*",
      "Access-Control-Allow-Origin": "*"
    }
  });

  export default http
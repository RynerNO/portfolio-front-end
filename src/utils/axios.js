import Axios from 'axios';
import config from '@config'
const axios = Axios.create({
  baseURL: `${config.API_ROUTE}`
});

export default axios;

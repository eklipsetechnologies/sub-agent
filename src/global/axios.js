import axios from 'axios';
import { baseURL } from './Home';

const instance = axios.create({
    baseURL: baseURL 
}) 

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
instance.defaults.headers.common['Allow-Origin'] = 'true'
export default instance

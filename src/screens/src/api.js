import axios from 'axios'
import config from './constants'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes'

const http = {
  get: async (url, data = {}) => axios.get(config.constants.BASE_URL + url, { params: data }),

  post: async (url, data = {}, headers = {}) => axios.post(
    config.constants.BASE_URL + url,
    data,
    headers,
  ),
}

export default http

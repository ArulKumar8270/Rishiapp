import axios from 'axios'
import publicIp from 'public-ip'
import { store } from '../store'
import {
  SET_AUTH_TOKEN,
  SET_IP_ADDRESS,
  SET_REFRESH_TOKEN,
} from '../utils/constants'
import { kickUser } from '../utils/auth.service'
import { Platform } from 'react-native'
import { getTokenUpdate } from '../services/auth'
axios.interceptors.request.use(
  async (config) => {
    const interceptedConfig = config
    interceptedConfig.headers['Content-type'] = 'application/json'


    if (interceptedConfig.method === 'post') {

      if (Platform.OS === 'ios') {
        interceptedConfig.data.channelType = 'IOS'
      } else if (Platform.OS === 'android') {
        interceptedConfig.data.channelType = 'ANDROID'
      }
    } else {
      if (Platform.OS === 'ios') {
        interceptedConfig.params.channelType = 'IOS'
      } else if (Platform.OS === 'android') {
        interceptedConfig.params.channelType = 'ANDROID'
      }
    }
    console.log(interceptedConfig.url)
   // console.log(interceptedConfig.headers)
    console.log(interceptedConfig.data)
    return interceptedConfig
  },

  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {
     //console.log(response)
    console.log(response.data)

    return response
  },
  async (error) => {
    if (error.response) {
      console.log(error.response.data)
      return Promise.reject(error)
    } else {
      return Promise.reject({
        response: {
          data: {
            error: '',
            message: 'The server is not reachable. Please try after some time.',
            status: 500,
            timestamp: '2021-04-16T07:22:25.172+00:00',
          },
        },
      })
    }
  }
)

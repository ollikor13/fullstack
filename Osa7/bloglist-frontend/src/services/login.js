/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  delete credentials.username.type
  delete credentials.username.onChange
  delete credentials.password.type
  delete credentials.password.onChange
  credentials.username = credentials.username.value
  credentials.password = credentials.password.value
  const response = await axios.post(baseUrl, credentials)
  return response.data
}


export default { login }
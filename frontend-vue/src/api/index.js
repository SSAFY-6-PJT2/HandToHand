/**
 * @author Hyeonsooryu
 */

import axios from 'axios';

export default function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: { 'Content-type': 'application/json' },
  });
  return instance;
}

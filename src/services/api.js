import axios from 'axios';

import { BASE_PATH } from '../constants/site';

const headers = { headers: { Authorization: '' } };

const apiList = async (url, query, token) => {
  headers.headers.Authorization = `Token ${token}`;
  const res = await axios.get(`${BASE_PATH}${url}?${query}`, headers);
  const { data } = res;
  return data;
};

const apiGet = async (url, token) => {
  headers.headers.Authorization = `Token ${token}`;
  try {
    const res = await axios.get(`${BASE_PATH}${url}`, headers);
    const { data } = res;
    return data;
  } catch (err) {
    return { err };
  }
};

const apiPost = async (url, payload, token, onSuccess) => {
  headers.headers.Authorization = `Token ${token}`;
  try {
    const res = await axios.post(`${BASE_PATH}${url}`, payload, headers);
    const { data } = res;
    onSuccess(data);
    return data;
  } catch (err) {
    return { err };
  }
};

const apiPut = async (url, payload, token, onSuccess) => {
  headers.headers.Authorization = `Token ${token}`;
  try {
    const res = await axios.put(`${BASE_PATH}${url}`, payload, headers);
    const { data } = res;
    onSuccess(data);
    return data;
  } catch (err) {
    return { err };
  }
};

const apiPatch = async (url, payload, token, onSuccess) => {
  headers.headers.Authorization = `Token ${token}`;
  try {
    const res = await axios.patch(`${BASE_PATH}${url}`, payload, headers);
    const { data } = res;
    onSuccess(data);
    return data;
  } catch (err) {
    return { err };
  }
};

const apiDelete = async (url, token, onDelete) => {
  headers.headers.Authorization = `Token ${token}`;
  try {
    await axios.delete(`${BASE_PATH}${url}`, headers);
    onDelete();
    return '';
  } catch (err) {
    return { err };
  }
};

export {
  apiDelete, apiGet, apiList,
  apiPatch, apiPost, apiPut
};

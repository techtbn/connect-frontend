/* eslint-disable react/prop-types */
import axios from 'axios';
import { BASE_PATH } from 'constants/site';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import toastError from 'utility/toastErrors';

const short = require('short-uuid');

const userContext = React.createContext({ user: {} });
const publicPages = ['/', '/register'];

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const baseUser = { initial: false };
  const [user, setUser] = useLocalStorage('tbnUser', baseUser);
  const [authToken, setAuthToken] = useLocalStorage('tbnToken', '');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authToken && router.query && !publicPages.includes(router.pathname)) {
      console.log(router.asPath);
      router.push(`/?next=${router.asPath}`);
    }
  }, []);

  // Login updates the user data with a name parameter
  const login = async (values, setDisabled) => {
    setDisabled(true);
    try {
      const res = await axios.post(`${BASE_PATH}/auth/login/`, values);
      const { data } = res;
      const token = data.key;
      setAuthToken(token);
      await axios.get(`${BASE_PATH}/auth/user/`,
        { headers: { Authorization: `Token ${token}` } }).then((profileRes) => {
        const profileData = profileRes.data;

        setUser(profileData);
        let url = '/choices';
        if (profileData.initial) {
          url = '/home';
        }
        router.push(url);
      });
    } catch (error) {
      setDisabled(false);
      toastError(error);
    }
  };

  const loginWithLinkedIn = async ({ code }) => {
    const res = await axios.post(`${BASE_PATH}/auth/linkedin/oauth`, {
      code
    });
    const { token } = res.data;
    setAuthToken(token);
    setUser(res.data.data);
    router.push('/');
  };

  const resetPassword = async (formData, setDisabled) => {
    setDisabled(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/password/reset/`, formData);
      toast.success('Please check your email for the password reset link!');
    } catch (error) {
      setDisabled(false);
      toastError(error);
    }
  };

  const resetPasswordConfirm = async (formData, setDisabled) => {
    setDisabled(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/password/reset/confirm/`, formData);
      router.push('/accounts/login');
      toast.success('Reset Successful. Please login!');
    } catch (error) {
      setDisabled(false);
      toastError(error);
    }
  };

  // Logout updates the user data to default
  const logout = async () => {
    const headers = {
      Authorization: `Token ${authToken}`
    };
    await axios.post(`${BASE_PATH}/auth/logout/`, '', { headers });
    setUser(baseUser);
    setAuthToken('');
    router.push('/');
  };

  const register = async (formData, setDisabled) => {
    setDisabled(true);
    try {
      const nformData = { ...formData };
      nformData.username = short.generate();
      nformData.password2 = formData.password1;
      await axios.post(`${BASE_PATH}/register/`, nformData);
      router.push('/');
      toast.success('Registration successful. Please proceed to login!');
    } catch (error) {
      setDisabled(false);
      toastError(error);
    }
  };

  const isAuth = authToken !== '';

  return (
    <userContext.Provider value={{
      isAuth,
      user,
      authToken,
      mounted,
      login,
      loginWithLinkedIn,
      logout,
      register,
      resetPassword,
      resetPasswordConfirm,
      setUser
    }}
    >
      {children}
    </userContext.Provider>
  );
};

export { userContext, UserProvider };

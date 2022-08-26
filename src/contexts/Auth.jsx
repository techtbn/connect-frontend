/* eslint-disable react/prop-types */
import axios from 'axios';
import { BASE_PATH } from 'constants/site';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import { apiGet } from 'services/api';
import useSWR from 'swr';
import toastError from 'utility/toastErrors';

const userContext = React.createContext({ user: {} });

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const baseUser = { first_name: '', uprofile: { email_verified: false } };
  const [user, setUser] = useLocalStorage('user', baseUser);
  const [authToken, setAuthToken] = useLocalStorage('tbnToken', '');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Login updates the user data with a name parameter
  const login = async (values, router, setDisabled) => {
    setDisabled(true);
    try {
      const res = await axios.post(`${BASE_PATH}/auth/login/`, values);
      const { data } = res;
      const token = data.key;

      const profileRes = await axios.get(`${BASE_PATH}/auth/user/`,
        { headers: { Authorization: `Token ${token}` } });
      const { profileData } = profileRes;

      setAuthToken(token);
      setUser(profileData);
      toast.success('Welcome!');
      router.push('/home');
    } catch (error) {
      console.log(error);
      setDisabled(false);
      toastError(error);
    }
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

  const resetPasswordConfirm = async (formData, router, setDisabled) => {
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
  const logout = async (router) => {
    const headers = {
      Authorization: `Token ${authToken}`
    };
    await axios.post(`${BASE_PATH}/auth/logout/`, '', { headers });
    setUser(baseUser);
    setAuthToken('');
    router.push('/');
  };

  const register = async (formData, router, setDisabled) => {
    setDisabled(true);
    try {
      const nformData = { ...formData };
      // nformData.username = short.generate();
      nformData.password2 = formData.password1;
      await axios.post(`${BASE_PATH}/register/`, nformData);
      router.push('/accounts/login');
      toast.success('Registration successful. Please proceed to login. An email has been sent to your verify your account!');
    } catch (error) {
      setDisabled(false);
      toastError(error);
    }
  };

  const isAuth = authToken !== '';
  const isVerified = user.uprofile.email_verified;

  return (
    <userContext.Provider value={{
      isAuth,
      isVerified,
      user,
      authToken,
      mounted,
      login,
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

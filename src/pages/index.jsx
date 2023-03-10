/* eslint-disable jsx-a11y/anchor-is-valid */
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button, Col,
  Divider, Form, Row, Typography
} from 'antd';
import FormBuilder from 'antd-form-builder';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';

const { Text, Title } = Typography;

const meta = {
  columns: 1,
  formItemLayout: [6, 18],
  fields: [
    {
      key: 'email',
      label: 'Email',
      rules: [
        {
          type: 'email',
          message: 'Please enter a valid email!'
        },
        {
          required: true,
          message: 'Please enter your email!'
        }
      ]
    },
    {
      key: 'password',
      label: 'Password',
      widget: 'password',
      rules: [
        {
          required: true,
          message: 'Please enter your password!'
        }
      ]
    }
  ]
};
const LoginPage = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const {
    isAuth, user, login, loginWithLinkedIn
  } = useContext(userContext);

  const [loginForm] = Form.useForm();

  const { linkedInLogin } = useLinkedIn({
    clientId: '86lrg0924nh0k2',
    redirectUri: `${typeof window === 'object' && window.location.origin}/linkedin`,
    scope: 'r_liteprofile r_emailaddress',
    onSuccess: async (code) => {
      loginWithLinkedIn({ code });
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleFinish = (values) => {
    login(values, setDisabled);
  };

  useEffect(() => {
    if (isAuth) {
      let route = '/home';
      if (!user.initial) {
        route = '/choices';
      }
      router.push(route);
    }
  }, [isAuth]);

  return (
    <div
      className="grid grid-cols-12 sm:grid-cols-12"
      style={{ height: '100vh' }}
    >
      <div
        className="hidden sm:block sm:col-span-4 md:col-span-7"
        style={{
          backgroundImage: 'url("/harvest.jpeg")',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div
        className="col-span-1 sm:col-span-8 md:col-span-5 py-12 px-4"
      >
        <div className="w-full flex justify-center">
          <img className="w-40 mx-auto" src="/logo.png" alt="" />
        </div>

        <Title className="text-center">Login</Title>
        <div className="w-full flex justify-center">
          <Button
            className="!text-white text-center px-4 my-4"
            style={{
              '&:hover': {
                backgroundColor: '#338ec1'
              },
              backgroundColor: '#0072b1'
            }}
            onClick={linkedInLogin}
          >
            <FontAwesomeIcon className="mr-2" icon={faLinkedin} />
            Sign In with LinkedIn
          </Button>
        </div>
        <Divider className="!my-0 !mb-4">or</Divider>
        <Form
          form={loginForm}
          layout="horizontal"
          onFinish={handleFinish}
        >
          <FormBuilder meta={meta} form={loginForm} />
          <Form.Item wrapperCol={{ span: 16, offset: 6 }} className="form-footer">
            <Button
              className="w-24"
              htmlType="submit"
              type="primary"
              disabled={disabled}
            >

              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Row>
          <Col offset={6}>
            <Link href="/register">
              <a>
                {'Don\'t have an account? Sign Up'}
              </a>
            </Link>
          </Col>
        </Row>
        <Divider />
        <div className="text-center">
          <Text>
            {'Copyright © '}
            <a href="https://mui.com/">
              TBN ASIA
            </a>
            {' '}
            {new Date().getFullYear()}
            .
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

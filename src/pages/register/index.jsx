/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button, Col,
  Divider, Form, Row, Typography
} from 'antd';
import FormBuilder from 'antd-form-builder';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useContext, useState } from 'react';

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
      key: 'first_name',
      label: 'First Name',
      rules: [
        {
          required: true,
          message: 'Please enter your first name!'
        }
      ]
    },
    {
      key: 'last_name',
      label: 'Last Name',
      rules: [
        {
          required: true,
          message: 'Please enter your last name!'
        }
      ]
    },
    {
      key: 'org',
      label: 'Organization',
      rules: [
        {
          required: true,
          message: 'Please enter your organization!'
        }
      ]
    },
    {
      key: 'password1',
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

const RegisterPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [registerForm] = Form.useForm();

  const { register } = useContext(userContext);

  const handleFinish = (values) => {
    register(values, setDisabled);
  };

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

        <Title className="text-center">Register</Title>
        <Form
          form={registerForm}
          layout="horizontal"
          onFinish={handleFinish}
        >
          <FormBuilder meta={meta} form={registerForm} />
          <Form.Item wrapperCol={{ span: 16, offset: 6 }} className="form-footer">
            <Button
              className="w-24"
              htmlType="submit"
              type="primary"
              disabled={disabled}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Row>
          <Col offset={6}>
            <Link href="/">
              <a>
                Back to Login
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

export default RegisterPage;

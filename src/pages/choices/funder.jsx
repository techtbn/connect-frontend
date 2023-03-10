/* eslint-disable react/no-unescaped-entities */
import { faAngleLeft, faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {
  Button, Checkbox, Col, Divider, Form, Input, Row, Typography, Upload
} from 'antd';
import axios from 'axios';
import { fundingTypes } from 'configs/partners';
import { BASE_PATH } from 'constants/site';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiList } from 'services/api';
import useSWR from 'swr';

const { Title } = Typography;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Funder = () => {
  const [logo, setLogo] = useState(null);
  const { authToken, user, setUser } = useContext(userContext);
  const [funderForm] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (user.initial) {
      toast.error('You have already created an organization. Please head to your profile to edit it!');
      router.push('/home');
    }
  }, []);

  let indOpts = [];
  const indsQuery = useSWR(
    'industries',
    () => apiList('/industries/', '', authToken)
  );

  if (indsQuery.data) {
    indOpts = indsQuery.data;
  }

  const handleFinish = async (values) => {
    const formData = new FormData();

    formData.append('logo', logo);
    Object.entries(values).forEach((pair) => {
      formData.append(pair[0], pair[1]);
    });

    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Token ${authToken}` };
    await axios.post(`${BASE_PATH}/funders/`, formData, { headers });
    setUser({ ...user, initial: true });
    toast.success('Your organization has been added and is pending our review. Our staff will be in contact soon!');
    router.push('/home');
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover"
      style={{
        backgroundImage: 'url("/sea.jpeg")'
      }}
    >
      <div className="bg-white-60 p-8 text-black" style={{ backgroundColor: 'rgba(255,255,255,0.90)' }}>
        <div className="mt-4 flex items-center justify-between">
          <div className="w-16 text-left">
            <Link href="/choices">
              <Button type="primary">
                <FontAwesomeIcon icon={faAngleLeft} size="xl" />
              </Button>
            </Link>
          </div>
          <Title className="!my-0 text-center" level={1}>
            Just a little more information
          </Title>
          <div className="w-16" />
        </div>

        <Form layout="vertical" className="mt-4" form={funderForm} onFinish={handleFinish}>
          <Row gutter={8}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Organization's Name"
                name="name"
                rules={[{ required: true, message: "Please enter your organization's name!" }]}
              >
                <Input placeholder="Enter name..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                className="w-full"
                label="Website"
                name="website"
                rules={[{ required: true, message: "Please enter your organization's website!" }]}
              >
                <Input type="url" placeholder="Enter website..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                className="w-full"
                label="Organization's Introduction"
                name="description"
                rules={[{ required: true, message: "Please enter your organization's introduction!" }]}
              >
                <Input.TextArea placeholder="Enter introduction..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} md={12}>
              <Form.Item
                name="ulogo"
                label="Logo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  accept="image/*"
                  listType="picture"
                  onChange={({ fileList }) => setLogo(fileList[0].originFileObj)}
                  beforeUpload={() => false}
                >
                  <Button icon={<FontAwesomeIcon className="mr-2" icon={faCamera} />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <p className="text-center">
            Enter the industries you want to invest in and
            <br />
            the manner of which you are doing.
            <br />
            You can update in your profile later.
          </p>
          <Divider>
            <Title className="!my-0" level={5} component="div">
              I invest in
            </Title>
          </Divider>
          <Form.Item
            name="industries"
            rules={[{ required: true, message: 'Please select the industries you invest in!' }]}
          >
            <Checkbox.Group>
              <Row gutter={8}>
                {indOpts.map((ind) => (
                  <Col className="mt-3" xs={12} md={6}>
                    <Checkbox value={ind.slug}>{ind.name}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Divider>
            <Title className="!my-0" level={5} component="div">
              In the following manner
            </Title>
          </Divider>
          <Form.Item
            name="vehicles"
            rules={[{ required: true, message: 'Please select the vehicles you invest with!' }]}
          >
            <Checkbox.Group className="w-full">
              <Row gutter={8} className="w-full">
                {fundingTypes.map((ft) => (
                  <Col className="mt-3" xs={12} md={6}>
                    <Checkbox value={ft.value}>{ft.label}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <div>
            <Button
              className="w-24 mt-4"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Funder;

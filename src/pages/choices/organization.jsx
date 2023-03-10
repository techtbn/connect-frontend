/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unescaped-entities */
import { faAngleLeft, faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button, Col, Divider, Form, Input, Radio,
  Row, Select, Typography, Upload
} from 'antd';
import axios from 'axios';
import { seTypes } from 'configs/ses';
import { BASE_PATH } from 'constants/site';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiList } from 'services/api';
import useSWR from 'swr';

const { Title } = Typography;
const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const SocialEnterprise = () => {
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const { user, authToken, setUser } = useContext(userContext);
  const [orgForm] = Form.useForm();

  const router = useRouter();

  useEffect(() => {
    if (user.initial) {
      toast.error('You have already created an organization. Please head to your profile to edit it!');
      router.push('/home');
    }
  }, []);

  let expOpts = [];
  const exQuery = useSWR(
    'expertise',
    () => apiList('/expertise/', '', authToken)
  );

  if (exQuery.data) {
    expOpts = exQuery.data;
  }

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append('logo', logo);
    formData.append('banner', banner);
    Object.entries(values).forEach((pair) => {
      formData.append(pair[0], pair[1]);
    });

    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Token ${authToken}` };
    await axios.post(`${BASE_PATH}/orgs/`, formData, { headers });
    setUser({ ...user, initial: true });
    toast.success("Your organization and it's opportunity has been added. Our members are on it and will reply with their expertise in a bit!");
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
        <Divider />
        <Form layout="vertical" className="mt-4" form={orgForm} onFinish={handleFinish}>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                className="w-full"
                label="Organization's Name"
                name="name"
                rules={[{ required: true, message: "Please enter your organization's name!" }]}
              >
                <Input placeholder="Enter name..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                className="w-full"
                label="Website"
                name="website"
              >
                <Input type="url" placeholder="Enter website..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                className="w-full"
                label="Mission"
                name="mission"
                rules={[{ required: true, message: "Please enter your organization's mission!" }]}
              >
                <Input.TextArea type="url" placeholder="Enter mission..." />
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
            <Col xs={24} md={12}>
              <Form.Item
                name="ubanner"
                label="Banner"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  accept="image/*"
                  name="logo"
                  listType="picture"
                  onChange={({ fileList }) => setBanner(fileList[0].originFileObj)}
                  beforeUpload={() => false}
                >
                  <Button icon={<FontAwesomeIcon className="mr-2" icon={faCamera} />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Divider>
            <Title className="!my-0" level={5} component="div">
              My organization is
            </Title>
          </Divider>
          <Form.Item
            name="otype"
          >
            <Radio.Group>
              <div className="grid md:grid-cols-3 flex-wrap mt-2">
                {seTypes.map((group) => (
                  <div key={group.name}>
                    <div style={{ backgroundColor: group.color }} className="p-2 text-center">
                      <Title level={5} className="!my-0 !text-white">{group.name}</Title>
                    </div>
                    {group.children.map((opt) => (
                      <div className="mt-3 ml-2" key={opt.value}><Radio value={opt.value}>{opt.label}</Radio></div>
                    ))}
                  </div>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>
          <Divider>
            <Title className="!my-0" level={5} component="div">
              I need help with
            </Title>
          </Divider>
          <div className="text-center mb-4">
            <p>
              Enter your first opportunity.
              <br />
              You can update in your profile later.
            </p>
          </div>
          <Row gutter={8}>
            <Col span={14}>
              <Form.Item
                className="w-full"
                label="Opportunity Name"
                name="opp-name"
                rules={[{ required: true, message: 'Please enter an opportunity!' }]}
              >
                <Input placeholder="Enter opportunity..." />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                className="w-full"
                label="Expertise"
                name="opp-ex"
                rules={[{ required: true, message: 'Please enter expertise needed!' }]}
              >
                <Select
                  mode="multiple"
                  required
                >
                  {expOpts.map((ex) => (
                    <Option key={ex.slug} value={ex.slug}>{ex.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            className="w-full"
            label="Details"
            name="opp-details"
            rules={[{ required: true, message: 'Please enter opportunity details!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Button
            className="w-24 mt-4"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SocialEnterprise;

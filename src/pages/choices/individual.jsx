/* eslint-disable react/no-unescaped-entities */
import { faAngleLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import {
  Button, Checkbox, Col, Divider, Form, Input, Radio, Row, Typography
} from 'antd';
import { individualTypes } from 'configs/individuals';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { apiList, apiPut } from 'services/api';
import useSWR from 'swr';

const short = require('short-uuid');

const { Title } = Typography;

const Individual = () => {
  // const [values, setValues] = useState({ commitment: 'starter', linkedin: 'https://' });
  const [indForm] = Form.useForm();
  const { authToken, user, setUser } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (user.initial) {
      toast.error('You have already created your profile. Please head to your profile to edit it!');
      router.push('/home');
    }
  }, []);

  const handleFinish = async (values) => {
    const nuser = {
      ...user, ...values, initial: true, username: short.generate(), org: ''
    };
    debugger;
    await apiPut('/auth/user/', nuser, authToken, () => {});
    setUser(nuser);
    toast.success('Your profile has been updated. Feel free to head over to the opportunities to see how you can help out!');
    router.push('/home');
  };

  let expOpts = [];
  const exQuery = useSWR(
    'expertise',
    () => apiList('/expertise/', '', authToken)
  );

  if (exQuery.data) {
    expOpts = exQuery.data;
  }

  let indOpts = [];
  const indsQuery = useSWR(
    'industries',
    () => apiList('/industries/', '', authToken)
  );

  if (indsQuery.data) {
    indOpts = indsQuery.data;
  }

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

        <Form layout="vertical" className="mt-4" form={indForm} onFinish={handleFinish}>
          <p className="text-center">
            Enter the expertise you can offer and your level of commitment.
            <br />
            You can update in your profile later.
          </p>
          <Divider>
            <Title className="!my-0" level={5} component="div">
              I can help with
            </Title>
          </Divider>
          <Form.Item
            name="expertise"
            rules={[{ required: true, message: 'Please select your expertise !' }]}
          >
            <Checkbox.Group>
              <Row gutter={8}>
                {expOpts.map((ex) => (
                  <Col className="mt-3" xs={12} md={6}>
                    <Checkbox value={ex.slug}>{ex.name}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Divider>
            <Title className="!my-0" level={5} component="div">
              In the following industries
            </Title>
          </Divider>
          <Form.Item
            name="industries"
            rules={[{ required: true, message: 'Please select the industries you can help with!' }]}
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
              The following best describes me
            </Title>
          </Divider>
          <Form.Item
            name="otype"
            rules={[{ required: true, message: 'Please select your commitement level!' }]}
          >
            <Radio.Group
              name="commitment"
            >
              <Row gutter={8}>
                {individualTypes.map((opt) => (
                  <Col className="mt-3" xs={24} md={6}>
                    <Radio value={opt.value}>
                      <div>
                        <strong>{opt.label}</strong>
                        <p>{opt.extra}</p>
                      </div>
                    </Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </Form.Item>
          <div className="mt-6">
            <Form.Item
              className="w-80"
              name="linkedin"
              label="LinkedIn Profile URL"
            >
              <Input type="url" />
            </Form.Item>
          </div>
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

export default Individual;

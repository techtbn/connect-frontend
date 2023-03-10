import {
  Avatar, Col, Layout, Menu, Row
} from 'antd';
import { userContext } from 'contexts/Auth';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const { Header } = Layout;

const pageItems = [
  {
    label: 'Home',
    key: '/home'
  }, {
    label: 'Opportunities',
    key: '/opportunities'
  }, {
    label: 'Network',
    children: [
      {
        label: 'Organizations',
        key: '/organizations'
      }, {
        label: 'Individuals',
        key: '/individuals'
      }, {
        label: 'Funders',
        key: '/funders'
      }
    ]
  }, {
    label: 'My Engagements',
    key: '/engagements'

  }
];

const userItems = (user) => [{
  label: <Avatar>{user.ucode}</Avatar>,
  children: [
    {
      label: 'Profile & Settings',
      key: '/profile-settings'
    }, {
      label: 'Logout',
      key: '/logout'
    }
  ]
}
];

/*
  <MenuItem key="logout" onClick={() => router.push('/profile-settings')}>
                <Typography textAlign="center">Profile & Settings</Typography>
              </MenuItem>
              <MenuItem key="logout" onClick={() => logout()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
*/

const MainHeader = () => {
  const [current, setCurrent] = useState('/home');
  const { user, logout } = useContext(userContext);

  const router = useRouter();

  return (
    <Header
      style={{ backgroundColor: '#C4D630' }}
    >
      <div className="container mx-auto 2xl:max-w-screen-xl">
        <Row justify="space-between">
          <Col span={16}>
            <div className="logo">
              <img className="w-20" src="/logo-grey.png" alt="" />
            </div>
            <Menu
              className="bg-transparent"
              mode="horizontal"
              items={pageItems}
              selectedKeys={[current]}
              onSelect={(item) => {
                setCurrent(item.key);
                router.push(item.key);
              }}
            />
          </Col>
          <Col span={8}>
            <Menu
              className="bg-transparent justify-end"
              mode="horizontal"
              items={userItems(user)}
              onSelect={(item) => {
                if (item.key === '/logout') {
                  logout(router);
                } else {
                  router.push(item.key);
                }
              }}
            />
          </Col>
        </Row>
      </div>
    </Header>

  );
};

export default MainHeader;

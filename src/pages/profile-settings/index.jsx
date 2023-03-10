import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import MainLayout from 'components/MainLayout';
import EditIndividual from 'components/profileSettings/EditIndividual';
import { userContext } from 'contexts/Auth';
import { useContext, useState } from 'react';
import { AutoForm } from 'uniforms-mui';

const OrgProfile = () => {
  const [value, setValue] = useState(0);
  const [values, setValues] = useState({});

  const { authToken, user } = useContext(userContext);

  const tabsList = [
    { name: 'Profile', component: <EditIndividual puser={user} /> }
    // { name: 'Organization', schema: individualBridge }
    // { name: 'Users' }
  ];

  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        Profile & Settings
      </Typography>
      <Divider />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={(_, val) => setValue(val)}
          aria-label="basic tabs example"
        >
          {tabsList.map((tab) => (
            <Tab label={tab.name} key={tab.name} />
          ))}
        </Tabs>
      </Box>
      {tabsList.map((tab, idx) => (
        <div
          className="mt-4"
          role="tabpanel"
          hidden={value !== idx}
          id={`simple-tabpanel-${idx}`}
          aria-labelledby={`simple-tab-${idx}`}
        >
          {tab.component}
        </div>
      ))}
    </MainLayout>
  );
};

export default OrgProfile;

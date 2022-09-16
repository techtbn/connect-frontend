import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const ChoicesPage = () => {
  const { user } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (user.initial) {
      toast.error('You have already setup your account. Please head to your profile to edit it!');
      router.push('/home');
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/sea.jpeg")',
        backgroundSize: 'cover'
      }}
    >
      <div className="bg-white-60 p-8 text-center text-black" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
        <Typography variant="h4" component="div">
          Which best describes you?
        </Typography>
        <Box
          className="flex-wrap md:flex-nowrap"
          sx={{
            marginTop: '16px',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Link href="/choices/social-enterprise">
            <div className="choice-box w-full md:w-auto font-medium bg-amber-600">
              Social Enterprise
            </div>
          </Link>
          <Divider className="hidden md:block" orientation="vertical" sx={{ borderRightWidth: 2 }} flexItem />
          <div className="MuiDivider-root w-64 block md:hidden" style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }} flexItem />
          <Link href="/choices/individual">
            <div className="choice-box w-full h-2 md:w-auto font-medium bg-teal-400">
              Individual
              <br className="hidden md:block" />
              <span className="block md:hidden">&nbsp;</span>
              Expertise
            </div>
          </Link>
          <Typography variant="h5" component="div">
            or
          </Typography>
          <Link href="/choices/funder">
            <div className="choice-box w-full md:w-auto font-medium bg-cyan-500">
              Funder
            </div>
          </Link>
          {/*
        <Typography variant="h5" component="div">
          or
        </Typography>
        <div className="choice-box w-full md:w-auto font-medium bg-indigo-600">
          Corporate Partner
        </div>
         */}
        </Box>
      </div>
    </Box>
  );
};

export default ChoicesPage;

import { Typography } from 'antd';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const { Title } = Typography;

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
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-cover"
      style={{
        backgroundImage: 'url("/sea.jpeg")'
      }}
    >
      <div className="bg-white-60 p-8 text-center text-black" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
        <Title className="!mt-4" level={1}>
          Which best describes you?
        </Title>
        <div
          className="flex-wrap md:flex-nowrap mt-4 flex items-center justify-center"
          style={{
            backgroundColor: 'transparent'
          }}
        >
          <Link href="/choices/organization">
            <div className="choice-box w-full md:w-auto font-medium bg-amber-600 cursor-pointer">
              Organization
            </div>
          </Link>
          <Link href="/choices/individual">
            <div className="choice-box w-full h-2 md:w-auto font-medium bg-teal-400 cursor-pointer">
              Individual
              <br className="hidden md:block" />
              <span className="block md:hidden">&nbsp;</span>
              Expertise
            </div>
          </Link>
          <Link href="/choices/funder">
            <div className="choice-box w-full md:w-auto font-medium bg-cyan-500 cursor-pointer">
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
        </div>
      </div>
    </div>
  );
};

export default ChoicesPage;

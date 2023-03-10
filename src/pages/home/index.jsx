/* eslint-disable jsx-a11y/anchor-is-valid */
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Col, Divider, Row, Typography
} from 'antd';
import EngageCard from 'components/EngageCard';
import InvitationCard from 'components/InvitationCard';
import MainLayout from 'components/MainLayout';
import OpportunityCard from 'components/OpportunityCard';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useContext } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';

const { Title } = Typography;

const Home = () => {
  const { authToken, user } = useContext(userContext);

  let opps = [];
  const oppQuery = useSWR(
    ['opps', 'home'],
    () => apiList('/opportunities/', 'limit=4', authToken)
  );

  if (oppQuery.data) {
    opps = oppQuery.data;
  }

  let comments = [];
  const commentsQuery = useSWR(
    ['comments', 'home'],
    () => apiList('/comments/', 'limit=4', authToken)
  );

  if (commentsQuery.data) {
    comments = commentsQuery.data;
  }

  let invitations = [];
  const invQuery = useSWR(
    ['invitations'],
    () => apiList('/invitations/', '', authToken)
  );

  if (invQuery.data) {
    invitations = invQuery.data;
  }

  return (
    <MainLayout>
      <Title className="!my-4" level={2} color="textPrimary">
        {`Welcome ${user.first_name}`}
      </Title>
      <Divider className="!my-0" />

      <Row gutter={[8, 8]}>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 18, order: 1 }} className="mt-4">
          <div
            className="py-1 px-4 mb-4 w-full flex items-center justify-between"
            style={{
              background: 'linear-gradient(to right, #C4D630, #f9fbea)'
            }}
          >
            <Title className="!my-2 " level={5}>
              Opportunities
            </Title>
            <Link href="/opportunities">
              <a className="flex items-center">
                View More
                <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
              </a>
            </Link>
          </div>
          <Row gutter={8}>
            {opps.map((opp) => (
              <Col xs={24} md={12}>
                <OpportunityCard opp={opp} />
              </Col>
            ))}
          </Row>
          <div
            className="py-1 px-4 my-4 w-full flex items-center justify-between"
            style={{
              background: 'linear-gradient(to right, #C4D630, #f9fbea)'
            }}
          >
            <Title className="!my-2 " level={5}>
              My Engagements
            </Title>
            <Link href="/engagements">
              <a className="flex items-center">
                View More
                <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
              </a>
            </Link>
          </div>

          <Row gutter={[8, 8]}>
            {comments.map((comm) => (
              <Col xs={24} md={12}>
                <EngageCard comm={comm} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 6, order: 2 }} className="mt-4">
          <div
            className="py-1 px-4 mb-4 w-full flex items-center justify-between"
            style={{
              background: 'linear-gradient(to right, #C4D630, #f9fbea)'
            }}
          >
            <Title className="!my-2 " level={5}>
              Invitations
            </Title>
          </div>

          {invitations.map((inv) => (
            <InvitationCard invitation={inv} />
          ))}

        </Col>
      </Row>

    </MainLayout>
  );
};

export default Home;

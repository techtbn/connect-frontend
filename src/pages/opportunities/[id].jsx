import { faComments, faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CommentCard from 'components/CommentCard';
import CommentModal from 'components/CommentModal';
import MainLayout from 'components/MainLayout';
import { userContext } from 'contexts/Auth';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { apiGet, apiList } from 'services/api';
import useSWR from 'swr';

const qs = require('qs');

const OpportunityView = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { authToken } = useContext(userContext);

  let opp = { org: {} };
  const oppQuery = useSWR(
    id ? ['opp-view', id] : null,
    () => apiGet(`/opportunities/${id}`, authToken)
  );

  if (oppQuery.data) {
    opp = oppQuery.data;
  }

  const jformat = qs.stringify({
    model: 'opportunity',
    object_id: id
  });

  let comments = [];
  const commsQuery = useSWR(
    id ? ['comments-opps', id] : null,
    () => apiList('/comments/', jformat, authToken)
  );

  if (commsQuery.data) {
    comments = commsQuery.data;
  }

  return (
    <MainLayout>
      <div className="my-3 flex justify-between items-center">
        <Typography variant="h4" color="textPrimary">
          {opp.name}
        </Typography>
        <Typography color="textSecondary">
          {`By: ${opp.org.name}`}
        </Typography>
      </div>

      <Divider />
      <Grid container spacing={2}>
        <Grid item className="mt-4" xs={12} md={8}>
          <Typography color="textPrimary" gutterBottom>
            {opp.text}
          </Typography>
        </Grid>
        <Grid item className="mt-4" xs={12} md={4}>
          Documents
        </Grid>
      </Grid>
      {comments.length
        ? (
          <>
            <Divider className="w-full my-4">
              <Button
                variant="contained"
                onClick={() => setVisible(true)}
              >
                <FontAwesomeIcon className="mr-2" icon={faPlus} />
                Add Comment
              </Button>
            </Divider>

            <Masonry
              columns={{
                xs: 1,
                md: 3
              }}
              spacing={2}
            >
              {comments.map((comm) => (
                <CommentCard
                  comm={comm}
                  model="opportunity"
                  objId={id}
                  mutation={['comments-opps', id]}
                />
              ))}
            </Masonry>
          </>
        )
        : (
          <div className="w-full mt-8 text-center">
            <Typography gutterBottom variant="h4" component="div">
              No Comments Found
              <br />
              <Button
                className="mt-4"
                variant="contained"
                onClick={() => setVisible(true)}
              >
                <FontAwesomeIcon className="mr-2" icon={faComments} />
                Begin Conversation
              </Button>
            </Typography>
          </div>
        )}

      <CommentModal
        model="opportunity"
        objId={id}
        visible={visible}
        setVisible={setVisible}
        mutation={['comments-opps', id]}
      />
    </MainLayout>
  );
};

export default OpportunityView;

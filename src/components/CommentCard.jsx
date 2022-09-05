import { faThumbsDown, faThumbsUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { userContext } from 'contexts/Auth';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { apiPost } from 'services/api';
import { useSWRConfig } from 'swr';

const CommentCard = (props) => {
  const { comm, mutation } = props;
  const { authToken } = useContext(userContext);

  const { mutate } = useSWRConfig();

  const handleClick = async (action) => {
    const onSuccess = () => {
      mutate(mutation);
    };

    const value = { action };
    await apiPost(`/comments/${comm.uuid}/engage/`, value, authToken, onSuccess);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography color="textPrimary">
            {comm.text}
          </Typography>
          {comm.image
            ? <img src={comm.image} className="w-full mt-2" alt="Comment1" />
            : null}
          <div className="flex justify-between mt-8">
            <Button
              onClick={() => handleClick('likes')}
            >
              respect
              <FontAwesomeIcon className="mx-1" icon={faThumbsUp} />
              {comm.likes.length
                ? `+${comm.likes.length}`
                : null}
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button
              onClick={() => handleClick('dislikes')}
            >
              {comm.dislikes.length
                ? `-${comm.dislikes.length}`
                : null}
              <FontAwesomeIcon className="mx-1" icon={faThumbsDown} />
              disagree
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

CommentCard.propTypes = {
  mutation: PropTypes.instanceOf(Array).isRequired,
  comm: PropTypes.instanceOf(Object).isRequired
};

export default CommentCard;

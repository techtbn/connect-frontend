import { faThumbsUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
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
          <div className="text-center mt-8">
            <Button
              variant="contained"
              onClick={() => handleClick('likes')}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className="mx-2">respect</span>
              {comm.likes.length
                ? <Chip className="bg-white" label={comm.likes.length} size="small" />
                : null}
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

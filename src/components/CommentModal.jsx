import {
  faCamera, faCancel, faClose, faSave
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { BASE_PATH } from 'constants/site';
import { userContext } from 'contexts/Auth';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

const CommentModal = (props) => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');

  const {
    model, mutation, objId, visible, setVisible
  } = props;
  const { authToken } = useContext(userContext);
  const { mutate } = useSWRConfig();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', comment);
    formData.append('model', model);
    formData.append('objId', objId);
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Token ${authToken}` };
    await axios.post(`${BASE_PATH}/comments/`, formData, { headers });
    toast.success('Comment added!');
    setImage(null);
    setComment('');
    setVisible(false);
    mutate(mutation);
  };

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          p: 2,
          pt: 0,
          width: {
            xs: '100%',
            md: '50%'
          },
          background: 'white'
        }}
      >
        <Typography className="flex items-center justify-between" variant="h6" component="h2">
          Enter Comment
          <IconButton
            onClick={() => setVisible(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </IconButton>
        </Typography>
        <Divider />
        <TextField
          margin="normal"
          required
          fullWidth
          id="comment"
          label="Comment"
          name="comment"
          minRows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          autoFocus
        />
        <div>
          <Button variant="contained" component="label">
            <div className="flex items-center">
              <FontAwesomeIcon className="mr-2" icon={faCamera} />
              Attach An Optional Image
            </div>
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          {image
            ? <span className="ml-2">{image.name}</span>
            : null }
        </div>
        <Divider className="my-4" />
        <div className="flex justify-end">
          <Button className="mr-2 btn-89" variant="outlined" component="label">
            <FontAwesomeIcon
              icon={faCancel}
              className="mr-2"
              onClick={() => setVisible(false)}
            />
            Cancel
          </Button>
          <Button
            className="btn-80"
            variant="contained"
            component="label"
            disabled={!comment}
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

CommentModal.propTypes = {
  model: PropTypes.string.isRequired,
  objId: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  mutation: PropTypes.instanceOf(Array).isRequired,
  setVisible: PropTypes.func.isRequired
};

export default CommentModal;

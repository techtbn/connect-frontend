import {
  faCancel, faClose, faSave
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { userContext } from 'contexts/Auth';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { apiList, apiPost } from 'services/api';
import useSWR from 'swr';

const qs = require('qs');

const InviteModal = (props) => {
  const [values, setValues] = useState({});

  const {
    indv, setIndv
  } = props;
  const { authToken } = useContext(userContext);

  const handleSubmit = async () => {
    const nvalues = { ...values, action: 'individual', user: indv.username };
    await apiPost('/opportunities/invite/', nvalues, authToken);
    toast.success('User invited!');
    setValues({});
    setIndv(null);
  };

  const jformat = qs.stringify({
    otype: 'self'
  }, { indices: false });

  let opps = [];
  const oppQuery = useSWR(
    ['opps', 'self'],
    () => apiList('/opportunities/', jformat, authToken)
  );

  if (oppQuery.data) {
    opps = oppQuery.data;
  }

  const handleChange = (field, val) => {
    setValues({ ...values, [field]: val });
  };

  return (
    <Modal
      open={indv !== null}
      onClose={() => setIndv(null)}
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
          {`Invite  ${indv.first_name} to Opportunity`}
          <IconButton
            onClick={() => setIndv(null)}
          >
            <FontAwesomeIcon icon={faClose} />
          </IconButton>
        </Typography>
        <Divider />
        <RadioGroup
          value={values.oppt}
          onChange={(e) => handleChange('oppt', e.target.value)}
        >
          <Grid container spacing={2}>
            {opps.map((opt) => (
              <Grid container item xs={12} md={6}>
                <FormControlLabel
                  value={opt.uuid}
                  control={<Radio />}
                  label={
                    <ListItemText className="text-left md:w-full" primary={opt.name} />
                    }
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Message"
          name="message"
          minRows={2}
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          multiline
          autoFocus
        />
        <Divider className="my-4" />
        <div className="flex justify-end">
          <Button className="mr-2 btn-89" variant="outlined" component="label">
            <FontAwesomeIcon
              icon={faCancel}
              className="mr-2"
              onClick={() => setIndv(null)}
            />
            Cancel
          </Button>
          <Button
            className="btn-80"
            variant="contained"
            component="label"
            onClick={handleSubmit}
            disabled={!values.message || !values.oppt}
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

InviteModal.propTypes = {
  indv: PropTypes.instanceOf(Object).isRequired,
  setIndv: PropTypes.func.isRequired
};

export default InviteModal;

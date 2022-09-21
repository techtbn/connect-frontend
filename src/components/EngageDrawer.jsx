import { faClose, faSend } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { userContext } from 'contexts/Auth';
import PropTypes from 'prop-types';
import {
  Fragment, useContext, useRef, useState
} from 'react';
import { toast } from 'react-toastify';
import { apiList, apiPost } from 'services/api';
import useSWR, { useSWRConfig } from 'swr';
import stringToColour from 'utility/color';

const qs = require('qs');

const EngageDrawer = (props) => {
  const { engage, setEngage } = props;
  const { authToken } = useContext(userContext);
  const [text, setText] = useState('');

  const messageRef = useRef('');
  const { mutate } = useSWRConfig();

  const jformat = qs.stringify({
    comment: engage.uuid
  }, { indices: false });

  let messages = [];
  const messagesQuery = useSWR(
    ['messages', engage.uuid],
    () => apiList('/messages/', jformat, authToken),
    { refreshInterval: 1000 }
  );

  if (messagesQuery.data) {
    messages = messagesQuery.data;
  }

  const handleClick = async () => {
    mutate(['messages', engage.uuid], async (messes) => {
      const onSuccess = async () => {
        setText('');
        toast.success('Message added!');
        await new Promise((resolve) => setTimeout(resolve, 500));
        messageRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      };

      const values = {
        text,
        comment: engage.id
      };
      const data = await apiPost('/messages/', values, authToken, onSuccess);

      return [...messes, data];
    });
  };

  return (
    <Drawer
      anchor="right"
      open={engage !== null}
      onClose={() => setEngage(null)}
    >
      <Box
        className="flex flex-col items-stretch justify-between h-full"
        sx={{
          width: 360

        }}
      >
        <Box className="p-4 flex items-center">
          <Typography className="grow" component="h1" variant="h5">
            {engage.pfield}
          </Typography>
          <FontAwesomeIcon
            icon={faClose}
            size="lg"
            onClick={() => setEngage(null)}
          />
        </Box>
        <Divider />
        {/*
        <TextField
          className="p-4"
          id="outlined-textarea"
          label={null}
          placeholder="Enter agreement"
          multiline
        o/> */}
        <Divider />
        <List
          className="grow overflow-y-auto"
        >
          <div>
            {messages.map((mess, idx) => (
              <Fragment key={mess.id}>
                <ListItem key={mess.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        mr: 2,
                        backgroundColor: stringToColour('test')
                      }}
                    >
                      {mess.user.ucode}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={(
                      <>
                        <div className="flex items-center justify-between">
                          <span>{mess.user.first_name}</span>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {mess.created}
                          </Typography>
                        </div>

                      </>
                  )}
                    secondary={mess.text}
                  />
                </ListItem>
                {idx !== (messages.length - 1)
                  ? <Divider sx={{ ml: 7 }} variant="inset" component="li" />
                  : null}
              </Fragment>
            ))}
            <div ref={messageRef} />
          </div>
        </List>

        <Divider />
        <div className="flex item-center p-4">
          <TextField
            className="grow"
            id="outlined-textarea"
            label={null}
            placeholder="Enter comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
          />
          <IconButton
            color="primary"
            disabled={!text}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faSend} />
          </IconButton>
        </div>

      </Box>

    </Drawer>
  );
};

EngageDrawer.propTypes = {
  engage: PropTypes.instanceOf(Object).isRequired,
  setEngage: PropTypes.func.isRequired
};

export default EngageDrawer;

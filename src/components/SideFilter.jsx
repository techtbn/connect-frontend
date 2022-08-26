import { faAngleDown, faAngleUp, faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const SideFilter = (props) => {
  const [mobile, setMobile] = useState(true);
  const {
    name, olist, opts, setOpts
  } = props;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = opts.indexOf(value);
    const newChecked = [...opts];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setOpts(newChecked);
  };

  return (
    <Card variant="outlined" className="filter-card">
      <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem
          key="collapse"
          disablePadding
        >
          <ListItemButton
            onClick={() => setMobile(!mobile)}
          >
            <ListItemText primary={`${name} (${opts.length})`} />
            <FontAwesomeIcon icon={mobile ? faAngleDown : faAngleUp} size="sm" />
          </ListItemButton>
        </ListItem>
        {mobile
          ? (
            <>
              <Divider />
              {olist.map((item, i) => (
                <>
                  <ListItem
                    key={item.value}
                    secondaryAction={(
                      <IconButton edge="end" aria-label="comments">
                        <FontAwesomeIcon icon={faCircle} className="filter-circle" style={{ color: item.color }} />
                      </IconButton>

                )}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          onChange={handleToggle(item.value)}
                          checked={opts.includes(item.value)}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                  {i !== olist.length - 1
                    ? <Divider />
                    : null}
                </>
              ))}
            </>
          )
          : null}
      </List>
    </Card>
  );
};

SideFilter.propTypes = {
  name: PropTypes.string.isRequired,
  olist: PropTypes.instanceOf(Array).isRequired,
  opts: PropTypes.instanceOf(Array),
  setOpts: PropTypes.func.isRequired
};

SideFilter.defaultProps = {
  opts: []
};

export default SideFilter;

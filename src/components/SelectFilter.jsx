import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

const SelectFilter = (props) => {
  const {
    name, olist, opts, setOpts, circles
  } = props;

  const handleChange = (e) => {
    const {
      target: { value }
    } = e;
    setOpts(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const olistMap = Object.fromEntries(olist.map((ol) => [ol.value, ol.label]));

  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <InputLabel>
        {name}
      </InputLabel>
      <Select
        multiple
        value={opts}
        onChange={handleChange}
        label={name}
        key={name}
        renderValue={(selected) => selected.map((sel) => olistMap[sel]).join(', ')}
      >
        {olist.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Checkbox checked={opts.includes(item.value)} />
            <ListItemText primary={item.label} secondary={item.extra || null} />
            {circles
              ? <FontAwesomeIcon icon={faCircle} className="ml-4 filter-circle" style={{ color: item.color }} />
              : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectFilter.propTypes = {
  name: PropTypes.string.isRequired,
  olist: PropTypes.instanceOf(Array).isRequired,
  opts: PropTypes.instanceOf(Array),
  setOpts: PropTypes.func.isRequired,
  circles: PropTypes.bool
};

SelectFilter.defaultProps = {
  opts: [],
  circles: false
};

export default SelectFilter;

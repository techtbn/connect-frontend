import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ConfCards from 'components/ConfCards';

const ConferenceApp = () => (
  <div>
    <Typography className="text-white p-2 text-center" style={{ backgroundColor: 'black' }} variant="h3" component="div">
      Impact Networking Board
    </Typography>

    <Box className="flex" sx={{ height: 'calc(100vh - 72px)' }}>
      <div className="flex flex-col h-full basis-1/4" style={{ backgroundColor: '#e6fffb' }}>
        <Typography className="text-white p-2 text-center" style={{ backgroundColor: '#5cdbd3' }} variant="h4" component="div">
          Impact Only
        </Typography>
        <div className="grow">
          <Divider className="my-4"><strong className="text-3xl">Grants</strong></Divider>
          <ConfCards otype="impact-grants" />
        </div>
        <div className="grow">
          <Divider className="my-4"><strong className="text-3xl">Grants & Trading Revenues</strong></Divider>
          <ConfCards otype="impact-grants-revenues" />
        </div>
      </div>
      <div className="flex flex-col basis-1/2" style={{ backgroundColor: '#91d5ff' }}>
        <Typography className="text-white p-2 text-center" style={{ backgroundColor: '#1890ff' }} variant="h4" component="div">
          Impact First Revenue Generating
        </Typography>
        <div className="basis-8/12">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Divider className="my-4"><strong className="text-3xl">Sustainable</strong></Divider>
              <ConfCards otype="rev-gen-sustainable" />
            </div>
            <div>
              <Divider className="my-4"><strong className="text-3xl">Profitable with Surplus Reinvested</strong></Divider>
              <ConfCards otype="rev-gen-surplus" />
            </div>
          </div>
        </div>
        <div className="basis-4/12">
          <div>
            <Divider className="my-4"><strong className="text-3xl">Able to Distribute Profits</strong></Divider>
            <ConfCards otype="rev-gen-distribute-profits" />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full basis-1/4" style={{ backgroundColor: '#2f54eb' }}>
        <Typography className="text-white p-2 text-center" style={{ backgroundColor: '#061178' }} variant="h4" component="div">
          Finance First Socially Driven
        </Typography>
        <div className="grow">
          <Divider className="my-4 text-white"><strong className="text-3xl">Impact Initiatives</strong></Divider>
          <ConfCards otype="fin-first-initiatives" />
        </div>
        <div className="grow">
          <Divider className="my-4 text-white"><strong className="text-3xl">Impact Embedded in Agenda</strong></Divider>
          <ConfCards otype="fin-first-agenda" />
        </div>
      </div>
    </Box>
  </div>
);

export default ConferenceApp;

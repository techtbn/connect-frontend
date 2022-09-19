import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MenuDropdown from 'components/MenuDropdown';
import MobileMenuDropdown from 'components/MobileMenuDropdown';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const pages = [
  {
    name: 'Home',
    link: '/home',
    type: 'single'
  }, {
    name: 'Opportunities',
    link: '/opportunities',
    type: 'single'
  }, {
    name: 'Engagements',
    link: '/engagements',
    type: 'single'
  }, {
    name: 'Dreams',
    link: '/dreams',
    type: 'single'
  }, {
    name: 'Network',
    type: 'multi',
    children: [
      {
        name: 'Social Enterprises',
        link: '/social-enterprises'
      }, {
        name: 'divider'
      }, {
        name: 'Individuals',
        link: '/individuals'
      }, {
        name: 'Funders',
        link: '/funders'
      }
    ]
  }
];

const NavBar = () => {
  const { logout } = useContext(userContext);
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      className="app-bar"
      position="sticky"
      sx={{ backgroundColor: '#C4D630' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 4 }}>
            <img src="logo-grey.png" className="w-20" alt="" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                page.type === 'single'
                  ? (
                    <Link href={page.link} key={page.name}>
                      <MenuItem key={page.link}>
                        <Typography>{page.name}</Typography>
                      </MenuItem>
                    </Link>
                  )
                  : <MobileMenuDropdown page={page} key={page.name} />
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img src="logo-grey.png" className="w-20" alt="" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              page.type === 'single'
                ? (
                  <Link href={page.link} key={page.name}>
                    <Button
                      className="text-slate-800 font-semibold"
                      key={page.link}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2, px: 2, display: 'block'
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                )
                : <MenuDropdown page={page} key={page.name} />
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile & Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Ba" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="logout" onClick={() => logout(router)}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

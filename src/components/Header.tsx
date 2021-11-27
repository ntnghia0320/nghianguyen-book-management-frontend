import React from 'react';
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import getCurrentUser from '../services/user-info';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink, Route, useHistory, useLocation } from 'react-router-dom';
import authService from '../services/auth.service';
import alanBtn from '@alan-ai/alan-sdk-web';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
    appBar: {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      color: '#000000',
      height: 60,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      border: '2px solid #caa79b',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '25%',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    highlighted: {
      color: '#8d6e63'
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isUser, setIsUser] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const currentUser = getCurrentUser();
  const history = useHistory();
  const path = useLocation().pathname;
  const alanKey = process.env.ALAN_KEY || '20879696e4305a1f0af7bd6f97b0ad112e956eca572e1d8b807a3e2338fdd0dc/stage';

  React.useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.role.includes("ROLE_ADMIN"));
      setIsUser(currentUser.role.includes("ROLE_USER"));
    } else {
      setIsAdmin(false);
      setIsUser(false);
    }

    alanBtn({
      key: alanKey,
      onCommand: ({ command }: any) => {
        if (command === 'LearnPythonQuickly') {
          history.push("/home?keyword=Learn Python Quickly");
        }

        if (command === 'PythonProgrammingforBeginners') {
          history.push("/home?keyword=Python Programming for Beginners");
        }

        if (command === 'ReactCleanArchitecture') {
          history.push("/home?keyword=React Clean Architecture");
        }

        if (command === 'HarryPotterandtheSorcererStone') {
          history.push("/home?keyword=Harry Potter and the Sorcerer's Stone");
        }

        if (command === 'TheHobbit') {
          history.push("/home?keyword=The Hobbit");
        }

        if (command === 'TheLordoftheRings') {
          history.push("/home?keyword=The Lord of the Rings");
        }

        if (command === 'TheAlchemist') {
          history.push("/home?keyword=The Alchemist");
        }

        if (command === 'LincolntheUnknown') {
          history.push("/home?keyword=Lincoln the Unknown");
        }

        if (command === 'RichDadPoorDad') {
          history.push("/home?keyword=Rich Dad Poor Dad");
        }

        if (command === 'home') {
          history.push("/home");
        }

        if (command === 'mybooklist') {
          history.push("/my-books-list");
        }

        if (command === 'login') {
          history.push("/login");
        }

        if (command === 'register') {
          history.push("/register");
        }

      }
    })


    console.log("header");
    // eslint-disable-next-line
  }, [currentUser]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    handleMenuClose();
    authService.logout();
    history.push('/home');
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      history.push(path + "?keyword=" + keyword);
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        color="inherit"
        onClick={handleMenuClose}
        component={NavLink}
        activeClassName={classes.highlighted}
        to="/profile"
      >
        Profile
      </MenuItem>
      <MenuItem
        color="inherit"
        onClick={logOut}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {(isUser || isAdmin) &&
        <MenuItem
          color="inherit"
          onClick={handleMobileMenuClose}
          component={NavLink}
          activeClassName={classes.highlighted}
          to="/my-books-list"
        >
          <p>My Books List</p>
        </MenuItem>
      }
      {isAdmin &&
        <div>
          <MenuItem
            color="inherit"
            onClick={handleMobileMenuClose}
            component={NavLink}
            activeClassName={classes.highlighted}
            to="/books-list"
          >
            <p>Books List</p>
          </MenuItem>
          <MenuItem
            color="inherit"
            onClick={handleMobileMenuClose}
            component={NavLink}
            activeClassName={classes.highlighted}
            to="/user-management"
          >
            <p>User Management</p>
          </MenuItem>
        </div>
      }
      {currentUser
        ? (
          <div>
            <MenuItem
              color="inherit"
              onClick={handleMobileMenuClose}
              component={NavLink}
              activeClassName={classes.highlighted}
              to="/profile"
            >
              <p>Profile</p>
            </MenuItem>
            <MenuItem
              color="inherit"
              onClick={logOut}
            >
              <p>Logout</p>
            </MenuItem>
          </div>
        )
        : (
          <div>
            <MenuItem
              color="inherit"
              onClick={handleMobileMenuClose}
              component={NavLink}
              activeClassName={classes.highlighted}
              to="/login"
            >
              <p>Login</p>
            </MenuItem>
            <MenuItem
              color="inherit"
              onClick={handleMobileMenuClose}
              component={NavLink}
              activeClassName={classes.highlighted}
              to="/register"
            >
              <p>Register</p>
            </MenuItem>
          </div>
        )
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        className={classes.appBar}
        position="sticky"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            component={NavLink}
            activeClassName={classes.highlighted}
            to="/home"
          >
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Book Management
          </Typography>
          <Route path={['/home', '/my-books-list', '/books-list', '/user-management']}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={handleKeyDown}
                onChange={onChange}
              />
            </div>
          </Route>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {(isUser || isAdmin) &&
              <MenuItem
                color="inherit"
                component={NavLink}
                activeClassName={classes.highlighted}
                to="/my-books-list"
              >
                <p>My Books List</p>
              </MenuItem>
            }
            {isAdmin &&
              <>
                <MenuItem
                  color="inherit"
                  component={NavLink}
                  activeClassName={classes.highlighted}
                  to="/books-list"
                >
                  <p>Books List</p>
                </MenuItem>
                <MenuItem
                  color="inherit"
                  component={NavLink}
                  activeClassName={classes.highlighted}
                  to="/user-management"
                >
                  <p>User Management</p>
                </MenuItem>
              </>
            }
            {currentUser
              ? (
                <div>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
              )
              : (
                <>
                  <MenuItem
                    color="inherit"
                    component={NavLink}
                    activeClassName={classes.highlighted}
                    to="/login"
                  >
                    <p>Login</p>
                  </MenuItem>
                  <MenuItem
                    color="inherit"
                    component={NavLink}
                    activeClassName={classes.highlighted}
                    to="/register"
                  >
                    <p>Register</p>
                  </MenuItem>
                </>
              )
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

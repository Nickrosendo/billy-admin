import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import store from './store';
import { connect } from 'react-redux';

//auth
import AuthGuard from './components/auth/AuthGuard';

// routes
import OrdersContainer from './routes/orders/OrdersContainer';
import MenuContainer from './routes/menu/MenuContainer';
import HelpContainer from './routes/help/HelpContainer';

// layout components
import Navigation from './components/navigation/Navigation';
import Loading from './components/Loading';

//actions 
import { signOut, fetchProfile } from './store/actions/auth';

import './App.css';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    marginLeft: drawerWidth,
    backgroundColor: 'rgb(255, 180, 106)',
  },

  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    overflowX: 'hidden',
    marginTop: 64,
  },
  grow: {
    flexGrow: 1,
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
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
});

class App extends React.Component {
  state = {
    initialized: false,
    anchorEl: null,
  };

  handleProfileMenuOpen = (event) => {
    console.log('anchorEl: ', event.currentTarget);

    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleCloseProfilePopover = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleSignout = () => {
    console.log('props: ', this.props);
    this.props.signOut();
    this.setState({ anchorEl: null})
  }

  componentDidMount() {
    console.time('firebaseInit');
    store.firebaseAuthIsReady.then(() => {
      this.props.fetchProfile();
      this.setState({ initialized: true });
      console.timeEnd('firebaseInit');
    });
  }

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);    
    if (this.state.initialized && !this.props.firebase.auth.uid) {
      return <AuthGuard />;
    }

    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={this.handleCloseProfilePopover}
      >
        <MenuItem onClick={this.handleCloseProfilePopover}>Profile</MenuItem>
        <MenuItem onClick={this.handleSignout}>Logout</MenuItem>
      </Menu>
    );


    return this.state.initialized ? (
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
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
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns={'material-appbar'}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>                
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          <Navigation />
          <main className={classes.content}>
            <Switch>
              <Route path="/orders" component={OrdersContainer} />
              <Route path="/menu" component={MenuContainer} />
              <Route path="/help" component={HelpContainer} />
              <Redirect from="/" to="/orders" />
            </Switch>
          </main>
        </Router>
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({ firebase: state.firebase });
const mapDispatchToProps = {
  signOut,
  fetchProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { withTheme: true })(App)
);

import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import '../styles/App.css'
import 'typeface-roboto'
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


import { withStyles } from '@material-ui/core/styles';


import { mailFolderListItems, otherMailFolderListItems } from './nav/SideBarItems';
import Search from './nav/Search';






const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Clipped drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Query query={GET_ALL_RECIPES}>
          { ({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;

            return (
              <div>
                <Typography variant="headline" gutterBottom>Recipes</Typography>
                <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
                <Search />

              </div>
            )
          }}
         </Query>
        </main>
      </div>
      );
  }
}

const GET_ALL_RECIPES = gql`
  {
    getAllRecipes{
      _id
      name
      category
      description
      createdDate
    }
  }
`



export default withStyles(styles)(App);


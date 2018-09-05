import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import StarIcon from '@material-ui/icons/Star'
import SendIcon from '@material-ui/icons/Send'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import ReportIcon from '@material-ui/icons/Report'


export const mailFolderListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/profile">
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link to="/recipe/add">
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Add Recipe" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
)

export const otherMailFolderListItems = (
  <div>
    <Link to="/signin">
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Signin" />
      </ListItem>
    </Link>
    <Link to="/signup">
      <ListItem button>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Signup" />
      </ListItem>
    </Link>
    <Link to="/signout">
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
    </Link>
  </div>
)


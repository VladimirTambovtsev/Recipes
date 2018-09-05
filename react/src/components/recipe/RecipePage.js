import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipePage extends Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	redirect = () => {
		this.props.history.push('/')
	}

	render() {	
		const { classes } = this.props;
		const { _id } = this.props.match.params;

		return (
			<Query query={RECIPE_QUERY} variables={{ _id }}>
				{({ data, loading, error }) => {
					if (loading) return <div>Loading..</div>;
					if (error) return (<div>Error: </div>); 
					

					console.log(data);
					return (
						<div>
							<Button onClick={this.redirect} style={{margin: '1em'}}>Back</Button>
							<Card style={{margin: '3em'}}>
					        <CardHeader
					          avatar={
					            <Avatar aria-label="Recipe" >
					              R
					            </Avatar>
					          }
					          action={
					            <IconButton>
					              <MoreVertIcon />
					            </IconButton>
					          }
					          title={data.getRecipe.name}
					          subheader={data.getRecipe.createdDate}
					        />
					        <CardMedia
					          
					          image="/static/images/cards/paella.jpg"
					          title="Contemplative Reptile"
					        />
					        <CardContent>
					          <Typography component="p">
					          	{data.getRecipe.category}
					          </Typography>
					          <Typography component="p">
					            {data.getRecipe.description}
					          </Typography>
					          <Typography component="p">
					            <strong>Liked: {data.getRecipe.likes}</strong>
					          </Typography>
					        </CardContent>
					        <CardActions disableActionSpacing>
					          <IconButton aria-label="Add to favorites">
					            <FavoriteIcon />
					          </IconButton>
					          <IconButton aria-label="Share">
					            <ShareIcon />
					          </IconButton>
					          <IconButton
					            className={classnames(classes.expand, {
					              [classes.expandOpen]: this.state.expanded,
					            })}
					            onClick={this.handleExpandClick}
					            aria-expanded={this.state.expanded}
					            aria-label="Show more"
					          >
					            <ExpandMoreIcon />
					          </IconButton>
					        </CardActions>
					        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					          <CardContent>
					            <Typography paragraph variant="body2">
					              Method:
					            </Typography>
					            <Typography paragraph>
					              {data.getRecipe.instructions}
					            </Typography>
					          </CardContent>
					        </Collapse>
					      </Card>
				      </div>
					)
				}}
			</Query>
		);
	}
}


const RECIPE_QUERY = gql`
	query($_id:ID!) {
	  getRecipe(_id:$_id){
	    _id
	    name
	    category
	    description
	    instructions
	    createdDate
	    likes
	  }
	}
`

export default withStyles(styles)(withRouter(RecipePage));
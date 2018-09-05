import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { ApolloConsumer } from 'react-apollo'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import RecipeItem from '../recipe/RecipeItem'




class Search extends Component {


	render() {
		
		 return (
			<ApolloConsumer>
			{client => (
				<Query query={SEARCH_RECIPES} variables={{ searchTerm: '' }} >
				{ ({ data, loading, error }) => {
					if (error) return <p>Error</p>
					if (loading) return <p>Loading</p>

					return (
						<div>
							<form>
								<TextField
							      id="search"
							      label="Search field"
							      type="search"
							      margin="normal"
							    />
								<Button color="primary" >
						        	Find
						    	</Button>
					    	</form>

					    	<Grid container spacing={24}>
			                    {data.searchRecipes.map(recipe => 
			                      <RecipeItem key={recipe._id} {...recipe} />
			                    )}
			                </Grid>
				    	</div>
					)
				}}
			    </Query>
			)}
		    </ApolloConsumer>
		)
	}
}


const SEARCH_RECIPES = gql`
	query searchRecipes($searchTerm:String) {
	  searchRecipes(searchTerm:$searchTerm) {
	    _id
	    name
	    likes
	    
	  }
	}	
`

export default Search


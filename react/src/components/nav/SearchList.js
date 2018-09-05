import React from 'react'

import Grid from '@material-ui/core/Grid';
import RecipeItem from '../recipe/RecipeItem'

const SearchList = ({data}) => (
	<Grid container spacing={24}>
	    {data.searchRecipes.map(recipe => 
	      <RecipeItem key={recipe._id} {...recipe} />
	    )}
	</Grid>
)

export default SearchList
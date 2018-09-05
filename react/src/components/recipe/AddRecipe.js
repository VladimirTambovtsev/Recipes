import React, { Component } from 'react'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { Errors } from '../nav/Errors'

class AddRecipe extends Component {
	state = {
      name: '',
      category: '',
      description: '',
      instructions: '',
      username: '',
      error: ''
    };

	handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
	};

	handleSubmit = async (event, addRecipe) => {
		event.preventDefault();

		await addRecipe()
		this.props.history.push('/')
	}

	validateForm = () => {
		const { name, category, description, instructions } = this.state;
		const isInvalid = !name || !category || !description || !instructions;

		return isInvalid
	}

	updateCache = (cache, { data: { addRecipe } }) => {
		const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

		cache.writeQuery({ 
			query: GET_ALL_RECIPES,
			data: {
				getAllRecipes: [addRecipe, ...getAllRecipes]
			}
		})
	}

	componentDidMount() {
		try {
			this.setState({
				username: this.props.session.getCurrentUser.username
			})
		} catch(err) {
			this.props.history.push('/signin')
		}
	}


	render() {
		const { name, category, description, instructions, username } = this.state;
		const imageUrl = ''
		return (
		<Mutation 
			mutation={ADD_RECIPE_MUTATION} 
			variables={{ name, imageUrl, category, description, instructions, username }} 
			update={this.updateCache}
		>
		{( addRecipe, { data, loading, error }) => {
			if (error) return <div>Error</div>
			if (loading) return <div>Loading..</div>

			
			return (
				<div>
				<Typography variant="display1" gutterBottom style={{ textAlign: 'center', margin: 20 }}>
			        Add Recipe
			    </Typography>
				<form 
					onSubmit={(event) => this.handleSubmit(event, addRecipe)}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}
				>
					<TextField
						id="name"
						label="New Recipe"
						className="textField"
						value={name}
						onChange={this.handleChange('name')}
						margin="normal"
					/>

					<FormControl >
			          <InputLabel htmlFor="age-simple">Category</InputLabel>
			          <Select
			            value={category}
			            onChange={this.handleChange('category')}
			            style={{width: 150 }}
			            inputProps={{
			              name: 'category',
			              id: 'category-simple',
			            }}
			          >
			            <MenuItem value="">
			              <em>None</em>
			            </MenuItem>
			            <MenuItem value="Breakfast">Breakfast</MenuItem>
			            <MenuItem value="Lunch">Lunch</MenuItem>
			            <MenuItem value="Dinner">Dinner</MenuItem>
			            <MenuItem value="Snacks">Snacks</MenuItem>
			          </Select>
			        </FormControl>
			        
					 <TextField
				          id="multiline-flexible"
				          label="Description"
				          multiline
				          rowsMax="4"
				          value={description}
				          onChange={this.handleChange('description')}
				          margin="normal"
				        />

				      <TextField
				          id="multiline-flexible"
				          label="Instructions"
				          multiline
				          rowsMax="4"
				          value={instructions}
				          onChange={this.handleChange('instructions')}
				          margin="normal"
				        />
				    

					<Button 
						disabled={loading || this.validateForm()} 
						type="submit" 
						color="primary" 
						variant="contained" 
					>
						<AddIcon />
					</Button>

					{error && <Errors error={error} />}
				</form>
				</div>
			)
		}}
		</Mutation>
		)
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

const ADD_RECIPE_MUTATION = gql`
mutation addRecipe($name:String!, $imageUrl:String!, $description:String!, $category:String!, $instructions:String!, $username:String!) {
  addRecipe(name:$name, imageUrl:$imageUrl, description:$description, category:$category, instructions:$instructions, username:$username) {
    name
    description
    category
    instructions
    username
  }
}
`


export default withRouter(AddRecipe)
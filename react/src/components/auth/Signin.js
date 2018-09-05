import React, { Component } from 'react'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo'

import { Errors } from '../nav/Errors'




class Signin extends Component {

    state = {
      username: '',
      password: ''
    };

	handleChange = name => event => {
	    this.setState({
	      [name]: event.target.value,
	    });
	};

	validateForm = () => {
		const { username, password } = this.state;
		let valid = !username || !password
		return valid
	}

	submit = async (event, signinUser) => {
		event.preventDefault()

		const data = await signinUser()
		localStorage.setItem('token', data.data.signinUser.token)	// set token
		await this.props.refetch()	// get user`s data
		this.setState({ username: '', password: '' })
		this.props.history.push('/')
	}

	render() {
		const { username, password } = this.state;
		return (
			<div>
				<h4>Signin</h4>
				<Mutation mutation={SIGNIN_MUTATION} variables={{ username, password }}>
					{( signinUser, { data, loading, error }) => {
						return (
						<form 
							onSubmit={event => this.submit(event, signinUser)} 
							className="container" 
							noValidate autoComplete="off">
					        <TextField
					          id="name"
					          label="username"
					          className="textField"
					          value={this.state.username}
					          onChange={this.handleChange('username')}
					          margin="normal"
					        />
					        <TextField
		          			  id="password-input"
					          label="Password"
					          type="password"
					          className="textField"
					          value={this.state.password}
					          onChange={this.handleChange('password')}
					          margin="normal"
					        />
					        {error && <Errors error={error} />}
					        <Button 
					        	disabled={loading || this.validateForm()}
					        	variant="contained" 
					        	color="primary"
					        	type="submit">
						        Signin
						    </Button>
				        </form>
				        );
					}}
				</Mutation>
			    <Link to="/signup">
				    <Button variant="outlined" color="primary">
				        Create an account
				    </Button>
			    </Link>
			</div>
		)
	}
}

const SIGNIN_MUTATION = gql`
	mutation signinUser($username:String!, $password:String! ) {
	  signinUser(username:$username, password:$password){
	    token
	  }
	}	
`;

export default withRouter(Signin);


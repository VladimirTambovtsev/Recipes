import React, { Component } from 'react'
import gql from 'graphql-tag'
import { withRouter, Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo'

import { Errors } from '../nav/Errors'



class Signup extends Component {

    state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

	handleChange = name => event => {
	    this.setState({
	      [name]: event.target.value,
	    });
	};

	validateForm = () => {
		const { username, email, password, confirmPassword } = this.state;
		let valid = !username || !email || !password || !confirmPassword || password !== confirmPassword
		return valid
	}

	submit = async (event, signupUser) => {
		event.preventDefault()
		
		const data = await signupUser()
		localStorage.setItem('token', data.data.signupUser.token)
		await this.props.refetch()
		this.setState({ username: '', password: '' })
		this.props.history.push('/')
	}

	render() {
		const { username, email, password, confirmPassword } = this.state;
		return (
			<div>
				<h4>Signup</h4>
				<Mutation mutation={SIGNUP_MUTATION} variables={{ username, email, password }}>
					{( signupUser, { data, loading, error }) => {
						return (
							<form 
							  onSubmit={event => this.submit(event, signupUser)} 
							
							  noValidate autoComplete="off"
							>
					        <TextField
					          id="username"
					          label="Username"
					          className="textField"
					          value={username}
					          onChange={this.handleChange('username')}
					          margin="normal"
					        />
					        <TextField
					          id="email"
					          label="Email"
					          className="textField"
					          value={email}
					          onChange={this.handleChange('email')}
					          margin="normal"
					          type="email"
					        />
					        <TextField
		          			  id="password-input"
					          label="Password"
					          type="password"
					          className="textField"
					          value={password}
					          onChange={this.handleChange('password')}
					          margin="normal"
					        />
					        <TextField
		          			  id="confirmPassword-input"
					          label="Confirm password"
					          type="password"
					          className="textField"
					          value={confirmPassword}
					          onChange={this.handleChange('confirmPassword')}
					          margin="normal"
					        />
					        {error && <Errors error={error} />}
					        <Button 
					        	disabled={loading || this.validateForm()}
					        	type="submit" 
					        	variant="contained" 
					        	color="primary"
					        >
						        Signup
						    </Button>
				        </form>
						)
					}}
				</Mutation>
			    <Link to="/signin">
			    	<Button variant="outlined" color="primary">
			        	Already have an account
			    	</Button>
			    </Link>
			</div>
		)
	}
}

const SIGNUP_MUTATION = gql`
	mutation signupUser($username:String!, $email:String!, $password:String! ) {
	  signupUser(username:$username, email:$email, password:$password){
	    token
	  }
	}
`

export default withRouter(Signup)

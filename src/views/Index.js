import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

import { AppContext } from "../libs/contextLib";

class Index extends React.Component
{
	static contextType = AppContext;

	constructor( props )
	{
		super( props );

		this.state = {
			email: '',
			password: '',
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e)
	{
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({ [name]: value });

		e.preventDefault();
	}

	onSubmit(e)
	{
		var email = this.state.email;
		var password = this.state.password;

		fetch( 'https://servizi.anfi.it/login', {
			method: 'POST',
			body: new URLSearchParams( {
				'username': email,
				'password': password
			} )
		})
		.then((response) => response.json() )
		.then((user) => {
			if( user.message )			// Errore. 
			{
				// TODO: sistemare gli errori, che bisogna
				// anche capire come fare
				//
				console.log(user)
			}
			else
			{
				const ctx = {
					isAuthenticated: true,
					id: 0,
					name: '',
					type: '',
					token: ''
				};
					
				ctx.id = user.id;
				ctx.name = user.name;
				ctx.type = user.type;
				ctx.token = user.token;

				sessionStorage.setItem( 'ctx', JSON.stringify( ctx ) );
				window.location.href = '/home';
			}
		})
		.catch((error) => {
			  console.error('Error:', error);
		});

		e.preventDefault();
	}

	render()
	{
		let ctx = this.context;
		if( ctx.isAuthenticated === true )
			return( <Redirect to='/home' /> );

		return (
		<>
			<IndexNavbar />
			<div
				className="page-header section-dark"
				style={{
					backgroundImage:
						"url(" + require("assets/img/cat.jpg").default + ")",
				}}
			>
			<div className="filter" />
			<div className="content-center">
			<Container>
			<Row>
				<Col className="ml-auto mr-auto" md="4">
					<Card className="card-register ml-auto mr-auto">
					<h3 className="title mx-auto">Benvenuto!</h3>

					<Form className="register-form" onSubmit={this.onSubmit}>

						<label>Email</label>
						<Input placeholder="Email" onChange={this.onChange}
							type="text" name="email" />

						<label>Password</label>
						<Input placeholder="Password" onChange={this.onChange}
							type="password" name="password" />

						<Button block type="submit" className="btn-round" color="danger">
							Andiamo!
						</Button>
					</Form>
					</Card>
				</Col>
				<Col md="8">
					<div className="title-brand">
						<h1 className="presentation-title">ANFI 4 Breeders</h1>
					</div>
					<h2 className="presentation-subtitle text-center">
					La vita è già abbastanza complessa. Semplifichiamoci qualcosa.
					</h2>
				</Col>
			</Row>
			</Container>
			</div>
			</div>
			<ApplicationFooter />
		</>
		);
	}
}

export default Index;

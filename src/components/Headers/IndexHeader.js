/*eslint-disable*/
import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components

class IndexHeader extends React.Component
{
	constructor( props )
	{
		super(props);

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
				console.log(user)

			// Qui viene il momento di salvare le cose.
			//
			
		})
		.catch((error) => {
			  console.error('Error:', error);
		});

		e.preventDefault();
	}

	render()
	{
		return (
			<>
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
				<Col className="ml-auto mr-auto" md="6">
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
				<Col md="6">
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
		</>
		);
	}
}

export default IndexHeader;

import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

class RegisterPage extends React.Component
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
		e.preventDefault();
		console.log( 'Click: ' + this.state.password );

	}

	render()
	{
		return (
			<>
			<ExamplesNavbar />
			<div
				className="page-header"
				style={{
					backgroundImage: "url("+require("assets/img/cat.jpg").default +")", 
				}}
			>
			<div className="filter" />
			<Container>
			<Row>
				<Col className="ml-auto mr-auto" lg="4">
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
							Register
						</Button>
					</Form>
					<div className="forgot">
						<Button
							className="btn-link"
							color="danger"
							href="#pablo"
							onClick={(e) => e.preventDefault()}
						>
						Forgot password?
						</Button>
					</div>
					</Card>
				</Col>
			</Row>
			</Container>
			</div>
		</>
	);
	}
}

export default RegisterPage;

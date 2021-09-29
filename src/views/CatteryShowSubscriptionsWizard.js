import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { 
	Container, Row, Col, Button,
	Card, CardBody, CardText, CardImg,
} from 'reactstrap';

import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

// others
import CatteryOpenExpoTable		from "components/Cattery/CatteryOpenExpoTable.js";
import getOpenExpo				from "libs/cattery_open_expo.js"

class CatteryShowSubscriptionsWizard extends Component
{
	constructor( props )
	{
		super( props );

		this.title = props.title;

		this.state = {
			loaded: false,
			total: 0,
			urrent_page: 0,
			last_page: 0,
			data: null,
			target: null,
			cats_for_expo: null,
		};

		sessionStorage.removeItem( 'esw' );
		this.gotoNextStep = this.gotoNextStep.bind(this);

		this.fetchOpenExpo();
	}

	async fetchOpenExpo()
	{
		await getOpenExpo( 1, this );
	}

	async setTargetExpos( expos )
	{
		console.log( 'In Set Target Expos' );
		console.log( expos );
		await this.setState( { target: expos.selectedRows } );
		console.log( this.state );
	}

	// Passaggio all'altra pagina del wizard.
	// Vengono salvate temporaneamente nel session
	//
	gotoNextStep()
	{
		if( this.state.target === null || this.state.target.length === 0 )
		{
			alert( 'Seleziona cortesemente una esposizione, per Diana!' );	
			return false;
		}

		sessionStorage.removeItem( 'esw' );
		sessionStorage.setItem( 'esw', JSON.stringify( this.state.target ) );

		this.props.history.push( '/cattery-domestic-add-subscriptions-2' );
	}

	render() 
	{
		if( this.state.data === null )
			return null;

		console.log( this.state.data );

		return (
			<>
			<ApplicationNavbar />
			<div className="main">
			<div className="section section-gray first-section">
			<Container fluid>
			<Row>
			<Col md='8'>
			<Row>
				<h2>Dove andiamo di bello?</h2>
			</Row>
			<hr />
				<CatteryOpenExpoTable 
					title={this.title}
					total={this.state.total} 
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					data={this.state.data}
					caller={this}
				/>

			</Col>
			<Col md="4">
			<Card color="secondary" style={{marginTop: "120px"}}>
			    <CardImg 
					bottom src={require('assets/img/ribbons.jpg').default}
						alt="Coppe di plastica" />
			    <CardBody>
			        <CardText style={{color:'white'}}>
						L'importante non è partecipare. E' vincere a 
						tutti i costi!!!</CardText>
					<Button className="btn btn-success float-right"
							onClick={() => this.gotoNextStep()} >
							Vediamo con chi andiamo...</Button>
			    </CardBody>
			</Card>
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

export default withRouter(CatteryShowSubscriptionsWizard);

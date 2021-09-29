import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { Container, Col, Row, Button } from 'reactstrap';

import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

// others
import CatterySelectedExpoTable	from "components/Cattery/CatterySelectedExpoTable.js";
import CatsForExposTable		from "components/Cats/CatsForExposTable.js";
import getCatsForExpo			from "libs/cats_for_expo.js"

class CatteryShowSubsWizardPage2 extends Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			target: null,
			cats_for_expo: null,
			selected_cats: null,
		};

		this.gotoNextStep = this.gotoNextStep.bind(this);

		const esw = sessionStorage.getItem( 'esw' );
		if( esw !== null )
		{
			this.state.target = JSON.parse( esw );
			this.getCatsForExpo();
		}
		else
			this.props.history.push( '/cattery-domestic-add-subscriptions' );
	}

	async getCatsForExpo()
	{
		let cats = await getCatsForExpo();
		console.log( cats );
		await this.setState( { cats_for_expo: cats } );
	}

	async setSelectedCats( cats )
	{
		console.log( 'In Set Selected Cats' );
		console.log( cats );
		await this.setState( { selected_cats: cats.selectedRows } );
		console.log( this.state );
	}

	// Passaggio all'altra pagina del wizard.
	// Vengono salvate temporaneamente nel session
	//
	gotoNextStep()
	{
		if( this.state.selected_cats === null || this.state.selected_cats.length === 0 )
		{
			alert( 'No gatti, no expo!' );	
			return false;
		}

		sessionStorage.removeItem( 'csw' );
		sessionStorage.setItem( 'csw', JSON.stringify( this.state.selected_cats ) );


		this.props.history.push( '/cattery-domestic-add-subscriptions-3' );
	}

	render() 
	{
		// Non abbiamo esposizioni. Ciccia
		//
		if( this.state.target === null || this.state.target.length === 0 )
			return null;

		return (
			<>
			<ApplicationNavbar />
			<div className="main">
			<div className="section section-gray first-section">
			<Container fluid>
			<Col>
				<h2>Hai deciso per...</h2>
				<CatterySelectedExpoTable 
					data={this.state.target}
					caller={this}
				/>
			</Col>
			<Col>
				<h2>E chi portiamo?</h2>
				<CatsForExposTable 
					cats={this.state.cats_for_expo}
					caller={this}
				/>
			</Col>
			<Row className="d-flex justify-content-center flex-nowrap">
					<Button onClick={() => this.gotoNextStep() } 
								className="btn-round">
						Chiudiamo il giro!
					</Button>
			</Row>
			</Container>
			</div>
			</div>
			<ApplicationFooter />
			</>
		);
	}
}

export default withRouter(CatteryShowSubsWizardPage2);

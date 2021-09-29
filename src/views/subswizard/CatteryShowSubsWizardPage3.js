import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { Container,  Col } from 'reactstrap';

import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

// others
import CatterySelectedExpoTable	from "components/Cattery/CatterySelectedExpoTable.js";
import CatteryShowSubsConfTable	from "components/Cattery/CatteryShowSubsConfTable.js";

class CatteryShowSubsWizardPage3 extends Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			target: null,
			selected_cats: null,
		};

		const esw = sessionStorage.getItem( 'esw' );
		const csw = sessionStorage.getItem( 'csw' );

		if( esw !== null && csw !== null )
		{
			this.state.target = JSON.parse( esw );
			this.state.selected_cats = JSON.parse( csw );
		}
		else
			this.props.history.push( '/cattery-domestic-add-subscriptions' );
	}

	render() 
	{
		// Non abbiamo esposizioni. Ciccia
		//
		if( this.state.target === null || this.state.target.length === 0 )
			return null;

		if( this.state.selected_cat === null || this.state.target.selected_cat === 0 )
			return null;

		return (
			<>
			<ApplicationNavbar />
			<div className="main">
			<div className="section section-gray first-section">
			<Container fluid>
			<Col>
				<h2>Quindi confermato che andiamo a....</h2>
				<CatterySelectedExpoTable 
					data={this.state.target}
					caller={this}
				/>
			</Col>
			<Col>
				<h2>Perfezioniamo le iscrizioni</h2>
				<CatteryShowSubsConfTable 
					cats={this.state.selected_cats}
					caller={this}
				/>
			</Col>
			</Container>
			</div>
			</div>
			<ApplicationFooter />
			</>
		);
	}
}

export default withRouter(CatteryShowSubsWizardPage3);

import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { 
	Container, Row, Col
} from 'reactstrap';

import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

// others
import CatteryShowSubscriptionsTable	  
							from "components/Cattery/CatteryShowSubscriptionsTable.js";
import getCatteryShowSubscriptions	  
							from "libs/cattery_show_subscriptions.js"

class CatteryShowSubscriptions extends Component
{
	constructor( props )
	{
		super( props );

		this.title = props.title;
		this.who = '';
		this.what = '';

		this.state = {
			loaded: false,
			total: 0,
			current_page: 0,
			last_page: 0,
			data: null,
		};
		
		// Prima pagina - Essenziale
		getCatteryShowSubscriptions( 1, this );
	}

	render()
	{
		// console.log( 'render' );
		// console.log( this.state.loaded );
		// console.log( this.state.data );

		if( this.state.loaded === false )
			return null;
		else
			return (
			<>
			<ApplicationNavbar />
			<div className="main">
			<div className="section section-gray first-section">
			<Container fluid>
			<Row>
				<Col md='6'>
					<h2>Iscrizioni attive a mostre nazionali</h2>
				</Col>
			</Row>
			<hr />
				<CatteryShowSubscriptionsTable 
					title={this.title}
					total={this.state.total} 
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					data={this.state.data}
					what={this.what}
					who={this.who}
				/>
			</Container>
			</div>
			</div>
			<ApplicationFooter />
			</>
		);
	}
}

export default withRouter(CatteryShowSubscriptions);

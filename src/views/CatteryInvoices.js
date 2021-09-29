import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { 
	Container,
	FormGroup, Label, Input,
	Button,
	Row, Col 
} from 'reactstrap';

import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

// others
import CatteryInvoicesTable from "components/Cattery/CatteryInvoicesTable.js";
import getCatteryInvoices from "libs/cattery_invoices.js"

class CatteryInvoices extends Component
{
	constructor( props )
	{
		super( props );

		this.title = props.title;
		this.who = '';

		this.state = {
			loaded: false,
			total: 0,
			current_page: 0,
			last_page: 0,
			data: null,
		};
		
		// Mi stanno forse chiedendo una ricerca... ma anche no, ovviamente
		//
		let query = new URLSearchParams(props.history.location.search);
		this.who = query.get( 'who' ) ? query.get( 'who' ) : '';

		props.history.replace( { pathname: '/cattery-invoices' } );

		// Prima pagina - Essenziale
		getCatteryInvoices( 1, this, this.who );			
	}

	render()
	{
		// console.log( 'render' );
		// console.log( this.state.loaded );
		// console.log( this.state.total );

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
					<h2>Fatture e ricevute</h2>
				</Col>
				<Col md='6'>
					<form className="form-inline float-right" id="search_form"> 
						<FormGroup row style={{marginTop:"30px", paddingRight:"20px"}}>
						<Label for="search">Filtro per anno</Label>
							<Input type="text" name="who" id="who" 
														defaultValue={this.who}
								style={{marginLeft:"10px"}}/>
							<Button className="btn-icon" color="secondary"
								style={{marginLeft:"10px"}}>
								<i className="fa fa-search" />
							</Button>
						</FormGroup>
					</form>
				</Col>
			</Row>
			<hr />
				<CatteryInvoicesTable
					title={this.title}
					total={this.state.total} 
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					data={this.state.data}
					who={this.state.who}
				/>
			</Container>
			</div>
			</div>
			<ApplicationFooter />
			</>
		);
	}
}

export default withRouter(CatteryInvoices);

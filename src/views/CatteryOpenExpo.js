import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { 
	Container,
	FormGroup, Label, Input,
	Row, Col, Button,
} from 'reactstrap';

import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

// others
import CatteryOpenExpoTable	from "components/Cattery/CatteryOpenExpoTable.js";
import getOpenExpo			from "libs/cattery_open_expo.js"

class CatteryOpenExpo extends Component
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
		getOpenExpo( 1, this );
	}

	render()
	{
		// console.log( 'render' );
		// console.log( this.state.loaded );
		console.log( this.state.data );

		const what = this.what;

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
					<h2>Iscrizioni mostre nazionali</h2>
				</Col>
				<Col md='6'>
					<form className="form-inline float-right" id="search_form"> 
						<FormGroup row style={{marginTop:"30px", paddingRight:"20px"}}>

						<Label>Ricerca</Label>
						<div className="form-check-radio form-check-inline"
							style={{marginTop:"15px", marginLeft:"10px"}}>
				        <Label className="form-check-label">
				            <Input type="radio" name="what" id="what2" value="cat" 
								defaultChecked = { what === 'cat' || what === '' ? 
									1 : 0 } />
								Gatto
				            <span className="form-check-sign"></span>
				        </Label>
						</div>
						<div className="form-check-radio form-check-inline"
							style={{marginTop:"15px", marginLeft:"10px"}}>
				        <Label className="form-check-label">
				            <Input type="radio" name="what" id="what2" value="location" 
								defaultChecked = { what === 'location' ? 1 : 0 } />
								Location
				            <span className="form-check-sign"></span>
				        </Label>
						</div>
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
				<CatteryOpenExpoTable 
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

export default withRouter(CatteryOpenExpo);

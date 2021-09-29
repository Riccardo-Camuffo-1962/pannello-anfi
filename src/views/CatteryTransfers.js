import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { 
	Container,
	FormGroup, Label, Input,
	Button, Modal, Table,
	Row, Col 
} from 'reactstrap';

import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

// others
import CatteryTransfersTable from "components/Cattery/CatteryTransfersTable.js";
import getCatteryTransfers from "libs/cattery_transfers.js"

class CatteryTransfers extends Component
{
	constructor( props )
	{
		super( props );

		this.title = props.title;
		this.who = '';
		this.what = '';
		this.toggle = this.toggle.bind(this);


		this.state = {
			loaded: false,
			total: 0,
			current_page: 0,
			last_page: 0,
			data: null,
			openOwnerModal: false,
			newOwner : null,
		};
		
		// Mi stanno forse chiedendo una ricerca... ma anche no, ovviamente
		//
		let query = new URLSearchParams(props.history.location.search);
		this.what = query.get( 'what' ) ? query.get( 'what' ) : '';
		this.who = query.get( 'who' ) ? query.get( 'who' ) : '';

		props.history.replace( { pathname: '/cattery-transfers' } );

		// Prima pagina - Essenziale
		getCatteryTransfers( 1, this, this.what, this.who );			
	}

	toggle ( value )
	{
		if( value !== this.state.openOwnerModal )
			this.setState( { openOwnerModal: value } );
	}

	render()
	{
		// console.log( 'render del babbo per new Owner' );
		// console.log( this.state.newOwner );
		// console.log( this.state.total );
		// console.log( this.state.openOwnerModal );

		const what = this.what;
		const owner = this.state.newOwner;

		// Informazioni associate al nuovo proprietario
		//
		var nome_completo = '';
		var indirizzo = '';
		var fisso = '';
		var cellulare = '';
		var email = '';
		var affisso = '';
		var socio = '';

		if( owner )
		{
			nome_completo = owner.nome_completo;
			fisso = owner.telefono ? owner.telefono : 'Non disponibile';
			cellulare = owner.cellulare ? owner.cellulare : 'Non disponibile';
			email = owner.email ? owner.email : 'Non disponibile';
			affisso = owner.prefisso ? owner.prefisso : owner.suffisso ? 
															owner.suffisso : '';
			indirizzo = <>{owner.indirizzo}<br />{owner.cap}{' '}{ owner.citta}</>; // +' ('+									owner.provincia.sigla+')';

			socio = owner.tipo === 'Cliente' ? 'No' : 
				<>Sezione: {owner.sezione}<br />
				  Tessera: {owner.tessera}<br />
				  Codice: {owner.codice}<br />
				  Associato dal: {owner.anno_iscrizione}<br />
				  Affisso: {affisso}<br />
				  Razza: {owner.razza}
				</>;
		}

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
					<h2>Passaggi proprietà</h2>
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
							 <Input type="radio" name="what" id="what2" value="owner" 
								defaultChecked = { what === 'owner' ? 1 : 0 } />
								Nuovo proprietario
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
				<CatteryTransfersTable
					title={this.title}
					total={this.state.total} 
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					data={this.state.data}
					who={this.who}
					controller={this}
				/>
			</Container>
			</div>
			</div>
			<Modal className='modal-lg' isOpen={this.state.openOwnerModal} 
							toggle={() => this.toggle(false) } style={{display:'block'}}>
				<div className="modal-header">
					<h5 className="modal-title">Dettaglio nuovo proprietario</h5>
				    <button
						aria-label="Close" className="close"
						data-dismiss="modal" type="button"
				        onClick={() => this.toggle(false)} >
				        <span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">
				<Table bordered>	
				<tbody>
					<tr>
						<th>Cognome e nome</th>
						<td>{nome_completo}</td>
					</tr>
					<tr>
						<th>Indirizzo</th>
						<td>{indirizzo}</td>
					</tr>
					<tr>
						<th>Recapiti telefonici</th>
						<td>Fisso: {fisso}<br />
							Cellulare: {cellulare} 
						</td>
					</tr>
					<tr>
						<th>Posta elettronica</th>
						<td>{email}</td>
					</tr>
					<tr>
						<th>Socio ANFI</th>
						<td>{socio}</td>
					</tr>
				</tbody>	
				</Table>
				</div>
				<div className="modal-footer">
					<div className="left-side">
						&nbsp;
					</div>
					<div className="divider" />
					<div className="right-side">
						<Button
							className="btn-link"
							color="danger"
							type="button"
							onClick={() => this.toggle(false) }>
								E bella lì
						</Button>
					</div>
				</div>

			</Modal>
			<ApplicationFooter />
			</>
		);
	}
}

export default withRouter(CatteryTransfers);

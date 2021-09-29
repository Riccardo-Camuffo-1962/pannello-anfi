import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Modal, Table, Row } from 'reactstrap';

import getCatteryBirthReports     from "libs/cattery_birth_reports.js";

class CatteryBirthReportsModal extends Component
{
	constructor( props )
	{
		super( props );

		this.toggle = this.toggle.bind(this);

		this.state = {
			id: props.id,
			loaded: false,
			current_page: 0,
			last_page: 0,
			total: 0,
			data: 0,
			live: props.live, 
			sire: props.sire,
			dam: props.dam
		}

		this.getData();
	}

	async getData()
	{
		await getCatteryBirthReports( 0, this, 'id_denuncia', this.state.id );
	}

	UNSAFE_componentWillReceiveProps(props) 
	{
		this.setState( { id: props.id } );
		this.setState( { live: props.live } );
		this.setState( { sire: props.sire } );
		this.setState( { dam: props.dam } );

		// props.caller.setState( { reportToShow: 0 } );
		props.caller.setState( { live: false } );
	}

	toggle( value )
	{
		if( value === false )
		{
			this.setState( { live: false } );
			this.setState( { id: 0 } );
		}
		else
			this.setState( { live: true } );
	}


	render()
	{
		if( this.state.loaded === false )
			return null;

		console.log( this.state.data );
		const denuncia = this.state.data[0].denuncia;

		const mating_date = denuncia.data_monta ? new Intl.DateTimeFormat('it-IT', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date(denuncia.data_monta)) : '';

		const birth_date = denuncia.data_nascita ? new Intl.DateTimeFormat('it-IT', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date(denuncia.data_nascita)) : '';

		const report_date = denuncia.data_denuncia ? new Intl.DateTimeFormat('it-IT', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date(denuncia.data_denuncia)) : '';


		return( 
			<Modal className="modal-xxl" isOpen={this.state.live} 
													toggle={() => this.toggle(false) }>
				<div className="modal-header">
					<h5 className="modal-title">
			            Dettaglio denuncia di nascita: <strong>{denuncia.numero}</strong>
					</h5>
					<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => this.setState({live: false })}>
								<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">
					<Row>
						<Table striped>
							<tbody>
							<tr>
								<td><strong>Data monta: </strong>{mating_date}</td>	
								<td><strong>Data di nascita: </strong>{birth_date}</td>	
								<td><strong>Data denuncia:</strong> {report_date}</td>	
							</tr>
							</tbody>
						</Table>
					</Row>
					<Row>
						<Table borderless>
							<tbody>
							<tr>
								<td><strong>Padre: </strong>{this.state.sire}</td>
								<td><strong>Madre: </strong>{this.state.dam}</td>
							</tr>
							</tbody>
						</Table>
					</Row>
					<Row>
					<Table bordered>
					<thead>
					<tr>
						<th>Num.</th>
						<th>Sesso</th>
						<th>Razza</th>
						<th>Colore</th>
						<th>Occhi</th>
						<th>Data reg.</th>
						<th>Reg.#</th>
						<th>Nome</th>
						<th>Deceduto</th>
					</tr>
					</thead>
					<tbody>
					{ this.state.data.map(( k, i ) => {

						let deceduto = k.deceduto === 1 ? 'Si' : 'No';
						let cat_name = '';
						let regno = '';
						let regdate = '';

						if( Object.keys(k.gatto).length !== 0 )
						{
							cat_name = k.gatto.nome;
							regno = k.gatto.libro.codice+' '+k.gatto.codice;
							regdate = k.gatto.data_registrazione ? 
									new Intl.DateTimeFormat('it-IT', {
										month: '2-digit',
										day: '2-digit',
										year: 'numeric',
									}).format(new Date(k.gatto.data_registrazione)) : '';
						}

						return (
						<tr key={i}>
							<td>{i+1}</td>
							<td>{k.sesso}</td>
							<td>{k.razza.codice}</td>
							<td>{k.colore.codice}</td>
							<td>{k.occhi.descrizione}</td>
							<td>{regdate}</td>
							<td>{regno}</td>
							<td>{cat_name}</td>
							<td>{deceduto}</td>
						</tr>
						)
					 })}
					</tbody>
					</Table>
					</Row>
					<Row>
					<p style={{fontWeight: "bold", color:"#f33816"}}>Note: {denuncia.segni}</p>
					</Row>
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
								Prendo atto
						</Button>
					</div>
				</div>
				</Modal>
		);
	}
}

export default withRouter(CatteryBirthReportsModal);

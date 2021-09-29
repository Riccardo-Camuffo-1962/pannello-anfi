import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

import DataTable, { createTheme } from 'react-data-table-component';
import getCatteryTransfers		  from "libs/cattery_transfers.js"

class CatteryTransfersTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onChangePage = this.onChangePage.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.title = props.title;
		this.who = props.who;

		this.state = {
			loaded: false,
			current_page: props.current_page,
			last_page: props.last_page,
			total: props.total,
			data: props.data,
			controller: props.controller,
		}

		this.columns = [
			{
				name: 'Gatto',
				sortable: false,
				cell: row => row.catname,
			},
			{
				name: 'Nuovo proprietario',
				sortable: false,
				cell: row =>row.new_owner
			},
			{
				name: 'Vecchio proprietario',
				sortable: false,
				cell: row => row.old_owner,
			},
			{
				name: 'Data cessione',
				sortable: false,
				cell: row => row.transfer_date,
			},
			{
				name: 'Data registrazione',
				sortable: false,
				cell: row => row.registration_date,
			},
			{
				name: '',
				sortable: false,
				cell: row => <><Button className="btn-link"
								title="Dettaglio nuovo proprietario"
							onClick=
								{()=>this.handleClick(row.id)}>
							<i className="fa fa-2x fa-user"></i></Button></>
			}
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			}
		});
	}

	onChangePage( page )
	{
		getCatteryTransfers( page, this, this.what, this.who );
	}

	handleClick( id )
	{
		// console.log( id );
		this.state.controller.setState( { newOwner: this.state.data[id].nuovoproprietario } );
		this.state.controller.toggle( true );
	}

	render()
	{
		// console.log( 'in render' );
		// console.log( this.state.data );

		var data = [];

		this.state.data.forEach(function(transfer, index, array) {

			const catname = transfer.gatto.nome;
			var old_owner = transfer.vecchioproprietario.nome_completo;
			var new_owner;
			var no = transfer.nuovoproprietario.nome_completo;
			var coint1 = '';
			var coint2 = '';

			if( transfer.idcointestatario1 !== null )
				coint1 = transfer.cointestatario1.nome_completo;

			if( transfer.idcointestatario2 !== null )
				coint2 = transfer.cointestatario2.nome_completo;

			if(coint1 !== '' && coint2 !== '' )
				new_owner = <p>{no}<br /><small>C1:{' '}{coint1}<br />C2:{' '}{coint2}</small></p>
			else if( coint1 !== '' )
				new_owner = <p>{no}<br /><small>C1:{' '}{coint1}</small></p>
			else
				new_owner = no;


			const transfer_date = transfer.data_acquisto ? 
				new Intl.DateTimeFormat('it-IT', { 
					month: '2-digit', 
					day: '2-digit',
					year: 'numeric', 
				}).format(new Date(transfer.data_acquisto)) : '';

			const registration_date = transfer.data_passaggio ? 
				new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(transfer.data_passaggio)) : '';

			data.push({
				id: index,
				catname: catname,
				new_owner: new_owner,
				old_owner: old_owner,
				transfer_date: transfer_date,
				registration_date: registration_date,
				coint1: coint1,
				coint2: coint2,
			});
		})

		return (
			<DataTable
				title={this.title}
				columns={this.columns}
				data={data}
				pagination="true"
				paginationRowsPerPageOptions={[10]}
				paginationTotalRows={this.state.total}
				paginationServer="true"
				paginationComponentOptions = { {
					rowsPerPageText: '', 
					noRowsPerPage: true, 
					rangeSeparatorText: 'di', 
					selectAllRowsItem: false, 
					selectAllRowsItemText: '' } }
				onChangePage = {this.onChangePage}
				theme = 'panel'
			/>	
		);
	}
}

export default withRouter(CatteryTransfersTable);

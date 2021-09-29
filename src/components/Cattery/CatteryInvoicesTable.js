import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'reactstrap';

import DataTable, { createTheme } from 'react-data-table-component';
import getCatteryInvoices	 from "libs/cattery_invoices.js"

class CatteryInvoicesTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onChangePage = this.onChangePage.bind(this);
		this.downloadInvoice = this.downloadInvoice.bind(this);
		this.title = props.title;
		this.who = props.who;

		this.state = {
			loaded: false,
			current_page: props.current_page,
			last_page: props.last_page,
			total: props.total,
			data: props.data
		}

		this.columns = [
			{
				name: 'Numero documento',
				sortable: false,
				cell: row => row.number,
			},
			{
				name: 'Data emissione',
				sortable: false,
				cell: row => row.issue_date,
			},
			{
				name: 'Tipo',
				sortable: false,
				cell: row => row.type,
			},
			{
				name: '',
				sortable: false,
				cell: row => <><Button className="btn-link"
								title="Scarica documento in PDF"
							onClick=
								{() => this.downloadInvoice(row.id)} >
							<i className="fa fa-2x fa-file-pdf-o"></i></Button></>
			},
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			}
		});
	}

	onChangePage( page )
	{
		getCatteryInvoices( page, this, this.who );
	}

	downloadInvoice( id )
	{
		window.location.href = 'https://servizi.anfi.it/fattura_ricevuta/pdf/'+id;
	}

	render()
	{
		// console.log( 'in render' );
		// console.log( this.state.data );

		var data = [];

		this.state.data.forEach(function(invoice, index, array) {

			const id = invoice.id;
			const number = invoice.numero+'/'+invoice.anno;
			const type = invoice.tipo.charAt(0).toUpperCase() + invoice.tipo.slice(1);

			const issue_date = invoice.data_emissione ? 
				new Intl.DateTimeFormat('it-IT', { 
					month: '2-digit', 
					day: '2-digit',
					year: 'numeric', 
				}).format(new Date(invoice.data_emissione)) : '';

			data.push({
				id: id,
				number: number,
				type: type,
				issue_date: issue_date,
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

export default withRouter(CatteryInvoicesTable);

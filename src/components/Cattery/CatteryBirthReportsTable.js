import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'reactstrap';

import DataTable, { createTheme } from 'react-data-table-component';
import CatteryBirthReportsModal	  from "components/Cattery/CatteryBirthReportsModal.js";

import getCatteryBirthReports	  from "libs/cattery_birth_reports.js"

class CatteryBirthReportsTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onChangePage = this.onChangePage.bind(this);
		this.downloadRegistrationRequest = this.downloadRegistrationRequest.bind(this);

		this.title = props.title;
		this.who = props.who;
		this.what = props.what;

		this.state = {
			loaded: false,
			current_page: props.current_page,
			last_page: props.last_page,
			total: props.total,
			data: props.data,
			reportToShow: 0,
			live: false,
			sire: '',
			dam: '',
		}

		this.columns = [
			{
				name: 'Numero denuncia',
				sortable: false,
				cell: row => row.report_id,
			},
			{
				name: 'Data nascita',
				sortable: false,
				cell: row => row.birth_date,
			},
			{
				name: 'Padre',
				sortable: false,
				cell: row => row.sire,
			},
			{
				name: 'Madre',
				sortable: false,
				cell: row => row.dam,
			},
			{
				name: 'Data denuncia',
				sortable: false,
				cell: row => row.report_date,
			},
			{
				name: '',
				sortable: false,
				cell: row => <><Button className="btn-link"
								title="Visualizza domanda di iscrizione"
							onClick=
								{()=>this.openRegistrationRequestDetails(row.id, 
																row.sire, row.dam )}>
						<i className="fa fa-2x fa-file-text-o"></i></Button>
								<Button className="btn-link"
								title="Scarica Domanda di Iscrizione in PDF"
							onClick=
								{() => this.downloadRegistrationRequest(row.id)}>
							<i className="fa fa-2x fa-file-pdf-o"></i></Button></>
			},
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			}
		});
	}

	downloadRegistrationRequest( birth_report_id  )
	{
		window.location.href='https://servizi.anfi.it/denunce_nascita/'+birth_report_id+
							 '/pdfdomanda';
	}

	async openRegistrationRequestDetails( birth_report_id, sire, dam  )
	{
		await this.setState( { sire: sire } );
		await this.setState( { dam: dam } );
		await this.setState( { reportToShow: birth_report_id } );
		await this.setState( { live: true } );
	}

	onChangePage( page )
	{
		getCatteryBirthReports( page, this, this.what, this.who );
	}

	render()
	{
		// console.log( 'in render' );
		// console.log( this.state.live );
		// console.log( this.state.reportToShow );

		var data = [];

		if( this.state.is_loaded === false )
			return null;

		this.state.data.forEach(function(report, index, array) {

			const id = report.id;
			const report_id = report.numero;

			const report_date = report.data_denuncia ? new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(report.data_denuncia)) : '';


			const birth_date = report.data_nascita ? 
				new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(report.data_nascita)) : '';

			data.push({
				id: id,
				report_id: report_id,
				report_date: report_date,
				birth_date: birth_date,
				sire: report.padre ? report.padre.nome : '',
				dam: report.madre ? report.madre.nome : '',
				report: report,
			});
		})

		return (
			<>
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
			{ 
				this.state.live === true ? (
					<CatteryBirthReportsModal live={this.state.live}
						caller={this}
						sire={this.state.sire}
						dam={this.state.dam}
						id={this.state.reportToShow} /> ) : ( null )
			}
			</>
		);
	}
}

export default withRouter(CatteryBirthReportsTable);

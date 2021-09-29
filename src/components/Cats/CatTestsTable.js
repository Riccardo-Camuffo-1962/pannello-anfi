import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DataTable, { createTheme } from 'react-data-table-component';
import getCatTests	from "libs/cat_tests.js"

class CatTestsTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onChangePage = this.onChangePage.bind(this);

		this.cat = props.cat;
		this.title = props.title;

		this.state = {
			loaded: false,
			total: props.total,
			current_page: props.current_page,
			last_page: props.last_page,
			data: props.data
		}

		this.columns = [
			{
				name: 'Codice test',
				sortable: false,
				cell: row => row.code,
			},
			{
				name: 'Descrizione',
				sortable: false,
				cell: row => row.description,
			},
			{
				name: 'Data test',
				sortable: false,
				cell: row => row.test_date,
			},
			{
				name: 'Data registrazione',
				sortable: false,
				cell: row => row.registration_date,
			},
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			},
		});
	}

	async onChangePage( page, totalRows )
	{
		await getCatTests( page, this, this.cat.id );
	}

	render()
	{
		// console.log( 'in render' );

		var data = [];

		this.state.data.forEach(function(test, index, array) {

			const code = test.malattia.codice;
			const description = test.malattia.descrizione;

			const test_date = test.data_test ? new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(test.data_test)) : '';

			const registration_date = test.data_registrazione ? 
				new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(test.data_registrazione)) : '';

			data.push({
				code: code,
				description: description,
				test_date: test_date,
				registration_date: registration_date,
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

export default withRouter(CatTestsTable);

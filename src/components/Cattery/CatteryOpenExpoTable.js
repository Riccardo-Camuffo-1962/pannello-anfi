import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DataTable, { createTheme } from 'react-data-table-component';
import getOpenExpo				  from "libs/cattery_open_expo.js"

class CatteryOpenExpoTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onChangePage = this.onChangePage.bind(this);
		this.onSelectedRowsChange = this.onSelectedRowsChange.bind(this);

		this.title = props.title;

		console.log( props );

		this.state = {
			loaded: false,
			current_page: props.current_page,
			last_page: props.last_page,
			total: props.total,
			data: props.data,
		}

		this.columns = [
			{
				name: 'Esposizione',
				sortable: false,
				width: '30%',
				cell: row => row.location,
			},
			{
				name: 'Data',
				sortable: false,
				cell: row => row.expo_date,
			},
			{
				name: 'Data chiusura',
				sortable: false,
				cell: row => row.closing_date,
			},
			{
				name: 'Organizzatore',
				sortable: false,
				cell: row => row.organizer,
			},
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			}
		});
	}

	onSelectedRowsChange( rows )
	{
		// Rigiro al babbo wizard
		//
		this.props.caller.setTargetExpos( rows );
	}

	onChangePage( page )
	{
		getOpenExpo( page, this );
	}

	render()
	{
		// console.log( 'in render' );
		// console.log( this.state.data );
		// console.log( this.state.reportToShow );

		var data = [];

		if( this.state.is_loaded === false )
			return null;

		this.state.data.forEach(function(expo, index, array) {

			const id = expo.id;
			const location = expo.name;

			const expo_date = expo.date ? new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(expo.date)) : '';

			const closing_date = expo.data_chiusura ? new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(expo.data_chiusura)) : '';

			const organizer = expo.account.name;

			data.push({
				id: id,
				location: location,
				expo_date: expo_date,
				closing_date: closing_date,
				organizer: organizer,
			});
		})

		return (
			<>
			<DataTable
				title={this.title}
				columns={this.columns}
				data={data}
				selectableRows="true"
				pagination="true"
				paginationRowsPerPageOptions={[20]}
				paginationTotalRows={this.state.total}
				paginationServer="true"
				paginationComponentOptions = { {
					rowsPerPageText: '', 
					noRowsPerPage: true, 
					rangeSeparatorText: 'di', 
					selectAllRowsItem: false, 
					selectAllRowsItemText: '' } }
				onChangePage = {this.onChangePage}
				onSelectedRowsChange = {this.onSelectedRowsChange}
				theme = 'panel'
				
			/>	
			</>
		);
	}
}

export default withRouter(CatteryOpenExpoTable);

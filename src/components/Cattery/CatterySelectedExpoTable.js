import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DataTable, { createTheme } from 'react-data-table-component';

class CatterySelectedExpoTable extends Component
{
	constructor( props )
	{
		super( props );

		this.title = props.title;

		console.log( props );

		this.state = {
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

	UNSAFE_componentWillReceiveProps(props) 
	{
		this.setState( { data: props.data } );
	}

	render()
	{
		if( this.state.data == null )
			return null;

		console.log( 'in render' );
		console.log( this.state.data );
		// console.log( this.state.reportToShow );

		return (
			<>
			<DataTable
				title={this.title}
				columns={this.columns}
				data={this.state.data}
				theme = 'panel'
			/>	
			</>
		);
	}
}

export default withRouter(CatterySelectedExpoTable);

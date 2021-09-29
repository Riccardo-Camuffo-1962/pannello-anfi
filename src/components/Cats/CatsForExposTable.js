import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DataTable, { createTheme } from 'react-data-table-component';

class CatsForExposTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onSelectedRowsChange = this.onSelectedRowsChange.bind(this);

		this.state = {
			cats: props.cats,
		};

		this.columns = [
			{
				name: 'Codice',
				sortable: false,
				width: '190px',
				cell: row => row.code,
			},
			{
				name: 'Nome',
				sortable: false,
				width: '300px',
				cell: row => row.name,
			},
			{
				name: 'Data di nascita',
				sortable: false,
				cell: row => row.birth_date,
			},
			{
				name: 'Sesso',
				sortable: false,
				width: '100px',
				cell: row => row.sex,
			},
			{
				name: 'Colore',
				sortable: false,
				cell: row => row.color,
			},
			{
				name: 'Allevatore',
				sortable: false,
				cell: row => row.breeder,
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
		this.setState( { cats: props.cats } );
	}

	onSelectedRowsChange( rows )
	{
		this.props.caller.setSelectedCats( rows );
	}

	render()
	{
		if( this.state.cats === null )
			return null;

		var data = [];

		this.state.cats.forEach(function(cat, index, array) {

			const code = cat.libro.codice+' '+cat.codice;
			const cattery = cat.prefisso ? cat.prefisso : 
									cat.suffisso ? cat.suffisso : '';

			const name = cat.prefisso ? cattery+' '+cat.nome :
										cat.nome+' '+cattery;

			const color = cat.genotipoColore.codice;

			const birth_date = new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(cat.data_nascita));

			data.push({
				id: cat.id,
				code: code,
				name: name,
				birth_date: birth_date,
				sex: cat.sesso,
				color: color,
				breeder: cat.allevatore.nome_completo
			});
		})

		return (
			<DataTable
				columns={this.columns}
				data={data}
				selectableRows="true"
				pagination="true"
				paginationTotalRows={this.state.cats.length}
				paginationComponentOptions = { {
					rowsPerPageText: '', 
					noRowsPerPage: true, 
					rangeSeparatorText: 'di', 
					selectAllRowsItem: false, 
					selectAllRowsItemText: '' } }
				theme = 'panel'
				onSelectedRowsChange = {this.onSelectedRowsChange}
			/>	
		);
	}
}

export default withRouter(CatsForExposTable);

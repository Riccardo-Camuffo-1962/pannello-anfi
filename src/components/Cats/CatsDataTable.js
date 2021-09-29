import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DataTable, { createTheme } from 'react-data-table-component';
import getCats	 from "libs/cats.js"

class CatsDataTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onChangePage = this.onChangePage.bind(this);
		this.title = props.title;

		console.log( props );

		this.what = props.what;
		this.search = props.search;
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
				width: '125px',
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
				width: '150px',
				cell: row => row.color,
			},
			{
				name: 'Proprietario',
				sortable: false,
				cell: row => row.owner,
			},
			{
				name: 'Allevatore',
				sortable: false,
				cell: row => row.breeder,
			},
			{
				name: '',
				sortable: false,
				cell: row => <button className='btn-link' 
							  style={{color:'#66615B'}}
							  onClick={() => this.gotoDetails(row.id) }>
								<i className="fa fa-info-circle fa-2x"></i>
								</button>,
			},
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			}
		});
	}

	onChangePage( page, totalRows )
	{
		console.log( this.what, this.search, this.who );

		getCats( page, this, this.what, this.search, this.who );
	}

	gotoDetails( catid )
	{
		let path = '/cat-details/'+catid;
		this.props.history.push(path);
	}


	render()
	{
		// console.log( 'in render' );
		// console.log( this.state.data );

		var data = [];

		this.state.data.forEach(function(cat, index, array) {

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
				owner: cat.proprietario.nome_completo,
				breeder: cat.allevatore.nome_completo
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

export default withRouter(CatsDataTable);

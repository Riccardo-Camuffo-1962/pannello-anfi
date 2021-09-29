import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DataTable, { createTheme }	from 'react-data-table-component';
import getCatOffspring				from "libs/cat_offspring.js"

class CatOffspringTable extends Component
{
	constructor( props )
	{
		super( props );

		console.log( 'CatOffspringTable' );
		console.log( props );

		this.onChangePage = this.onChangePage.bind(this);

		this.cat = props.cat;
		this.title = props.title;

		this.state = {
			loaded: false,
			total: props.total,
			current_page: props.current_page,
			last_page: props.last_page,
			data: props.data,
		}

		this.columns = [
			{
				name: 'Data di nascita',
				sortable: false,
				width: '20%',
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
				name: 'Cuccioli',
				sortable: false,
				cell: row => row.kittens,
			},
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			},
		});
	}

	async onChangePage( page )
	{
		const what = this.cat.sesso === 'M' ? 'padre' : 'madre';
		await getCatOffspring( page, this, what, this.cat.name );
	}

	getKittens( kittens )
	{
		if( kittens === undefined )
			return null;

		var fragment = '<p style="text-align: left">';
		kittens.forEach(function(k, i, array) {

			if( Object.keys(k.gatto).length !== 0 )
				fragment += i === 0 ? k.gatto.nome : "<br />"+k.gatto.nome;
		});

		fragment += '</p>';
		return fragment;
	}

	render()
	{
		// console.log( 'in render' );

		console.log( this.state.data );

		var data = [];

		var mySelf = this;
		this.state.data.forEach(function(l, index, array) {

			const birth_date = 
				l[0].gatto.data_nascita ? new Intl.DateTimeFormat('it-IT', { 
					month: '2-digit', 
					day: '2-digit',
					year: 'numeric', 
					}).format(new Date(l[0].gatto.data_nascita)) : '';

			const sire = l[0].gatto.padre ? l[0].gatto.padre.nome : '';
			const dam = l[0].gatto.madre ? l[0].gatto.madre.nome : '';

			const kittens = mySelf.getKittens( l ); 
			const kitties = <div dangerouslySetInnerHTML={{ __html: kittens }} />

			data.push({
				birth_date: birth_date,
				sire: sire,
				dam: dam,
				kittens: kitties,
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

export default withRouter(CatOffspringTable);

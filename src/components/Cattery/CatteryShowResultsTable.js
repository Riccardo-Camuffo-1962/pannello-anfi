import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DataTable, { createTheme } from 'react-data-table-component';
import getCatteryShowResults	  from "libs/cattery_show_results.js"
import remapClass				  from "libs/remap_class.js"
import safeConvertDate			  from "libs/safe_convert_date.js"

class CatteryShowResultsTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onChangePage = this.onChangePage.bind(this);

		this.title = props.title;
		this.who = props.who;
		this.what = props.what;

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
				cell: row => row.location,
			},
			{
				name: 'Data',
				width: '10%',
				sortable: false,
				cell: row => row.expo_date,
			},
			{
				name: 'Gatto',
				sortable: false,
				cell: row => row.cat,
			},
			{
				name: 'Classe',
				sortable: false,
				cell: row => row.fifeClass,
			},
			{
				name: 'Risultati',
				sortable: false,
				cell: row => row.results,
			},
			{
				name: 'Giudice',
				sortable: false,
				cell: row => row.judge,
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
		getCatteryShowResults( page, this, this.what, this.who );
	}

	getResultsFragment( expo )
	{
		var title = '';
		if( expo.titolo !== null )
			title = expo.titolo.substr(0,2) !== 'EX' ? 
											'EX 1 '+expo.titolo : expo.titolo; 
		const biv = expo.biv ? 'BIV' : '';
		const nomination = expo.nomination ? 'NOM' : '';

		var fragment = title;
		if( biv !== '' )
			fragment += '<br />'+biv;
		
		if( nomination !== '' )
			fragment += '<br />'+nomination;

		if( expo.best )
			fragment += '<br />'+expo.best;
		
		if( expo.bestofbest )
			fragment += '<br />'+expo.bestofbest;

		return fragment;
	}

	render()
	{
		// console.log( 'in render' );
		// console.log( this.state.data );
		// console.log( this.state.reportToShow );

		var data = [];

		if( this.state.is_loaded === false )
			return null;

		const mySelf = this;
		this.state.data.forEach(function(expo, index, array) {

			const id = expo.id;
			const location = expo.esposizione.name;

			const expo_date = safeConvertDate( expo.data_esposizione );

			const cat = expo.gatto.nome;
			const fifeClass = remapClass(String(expo.category));
			const fragment = mySelf.getResultsFragment( expo ) 
			const results = <div dangerouslySetInnerHTML={{ __html: fragment }} />;

			const p = fifeClass.title !== '' ? 'Titolo: '+fifeClass.title : '';
			const t = fifeClass.name;

			data.push({
				id: id,
				expo_date: expo_date,
				location: location,
				cat: cat,
				fifeClass: <><p>{t}<br />{p}</p></>,
				results: results,
				judge: expo.giudice,
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
			</>
		);
	}
}

export default withRouter(CatteryShowResultsTable);

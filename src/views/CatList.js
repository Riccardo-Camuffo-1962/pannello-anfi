import React, { Component } from "react";

// others
import CatsDataTable from "components/Cats/CatsDataTable.js";
import getCats from "libs/cats.js"

class CatList extends Component
{
	constructor( props )
	{
		super( props );

		console.log( props );

		this.title = props.title;
		this.what = props.what;
		this.search = props.search;
		this.who = props.who;

		this.state = {
			loaded: false,
			total: 0,
			current_page: 0,
			last_page: 0,
			data: null,
		};

		// Prima pagina - Essenziale
		getCats( 1, this, props.what, props.search, props.who );			
	}

	render()
	{
		// console.log( 'render' );
		// console.log( this.state.loaded );
		// console.log( this.state.total );

		if( this.state.loaded === false )
			return null;
		else
			return (
			<>
				<CatsDataTable 
					title={this.title}
					total={this.state.total} 
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					data={this.state.data}
					search={this.search}
					what={this.what}
					who={this.who}
				/>
			</>
			);
	}
}

export default CatList;

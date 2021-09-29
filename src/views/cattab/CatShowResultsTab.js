import { Component } from "react";

import {
	Container,
} from 'reactstrap';

import getCatteryShowResults	  from "libs/cattery_show_results.js"
import CatteryShowResultsTable	  from "components/Cattery/CatteryShowResultsTable.js";

class CatShowResultsTab extends Component
{
	constructor( props )
	{
		super( props );
		
		this.title = '';
		this.what = 'cat';
		this.who = props.cat.nome;

		this.state = {
			cat: props.cat,
			loaded: false,
			total: 0,
			current_page: 0,
			last_page: 0,
			data: null,
		};
		
		// Prima pagina - Essenziale
		this.getData();
	}

	async getData()
	{
		await getCatteryShowResults( 1, this, this.what, this.who );	
	}

	render() 
	{
		if( this.state.loaded === false )
			return null;

		return (
			<>
			<Container fluid style={{marginTop: "30px", textAlign: 'left' }}>
				<CatteryShowResultsTable 
					title={this.title}
					total={this.state.total} 
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					data={this.state.data}
					what={this.what}
					who={this.who}
				/>
			</Container>
			</>
		);
	}
}

export default CatShowResultsTab;

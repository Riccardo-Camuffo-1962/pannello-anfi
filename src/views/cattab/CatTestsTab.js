import { Component } from "react";
import { withRouter } from 'react-router-dom';

import { Container } from 'reactstrap';

import getCatTests		from "libs/cat_tests.js"
import CatTestsTable	from "components/Cats/CatTestsTable.js";

class CatTestsTab extends Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			loaded : false,
			cat: props.cat,
			current_page: 1,
			last_page: 0,
			total: 0,
			data: [],
		};

		this.getData( props.cat.id );
	}

	async getData( id )
	{
		await getCatTests( 1, this, id );	// Prima pagina
	}

	render()
	{
		if( this.state.loaded === false )
			return null;
		else
			return (
			<>
				<Container fluid style={{marginTop: "20px" }}>
				<CatTestsTable 
					cat={this.state.cat}
					title=''
					total={this.state.total} 
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					data={this.state.data}
				/>
				</Container>
			</>
			);
	}
}

export default withRouter(CatTestsTab);

import { Component } from "react";
import { Container } from 'reactstrap';

import getCatOffspring			  from "libs/cat_offspring.js"
import CatOffspringTable		  from "components/Cats/CatOffspringTable.js";

class CatOffspingTab extends Component
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

		this.getData( props.cat.nome, props.cat.sesso );
	}

	async getData( name, sex )
	{
		const what = sex === 'M' ? 'padre' : 'madre';
		await getCatOffspring( 1, this, what, name );	// Prima pagina
	}

	render()
	{
		if( this.state.loaded === false )
			return null;
		else
			return (
			<>
				<Container fluid style={{marginTop: "20px" }}>
				<CatOffspringTable 
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

export default CatOffspingTab;

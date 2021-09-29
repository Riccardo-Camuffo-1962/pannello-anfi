import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class PedigreeCell extends Component
{
	render()
	{

		if( this.props.cell === undefined )
			return null;
		else
			return (
			<>
				<p><strong>{this.props.cell.name}</strong></p>
				<p>{this.props.cell.birth_date}</p>
				<p>{this.props.cell.color}</p>
				<p>{this.props.cell.regno}</p>
			</>
			)
	}
}

export default withRouter(PedigreeCell);

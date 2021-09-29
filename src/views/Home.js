import React from "react";

import { Container, Row, Table } from 'reactstrap';

// core components!
import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

import getControlPanel	 from "libs/control_panel.js"

// cards
//
import CatsHomeCard			from "views/homecards/CatsHomeCard.js";
import InCatteryHomeCard	from "views/homecards/InCatteryHomeCard.js";
import LittersHomeCard		from "views/homecards/LittersHomeCard.js";
import ExpoHomeCard			from "views/homecards/ExpoHomeCard.js";

class Home extends React.Component
{
	constructor( props )
	{
		super( props );	

		this.state = {
			fact: null
		};

		this.getData();
	}

	async getData()
	{
		let fact = await getControlPanel();
		this.setState( {fact: fact} );
	}

	render()
	{
		if( this.state.fact == null )
			return null;

		console.log( this.state.fact.breeder );
		const breeder = this.state.fact.breeder;

		var fisso = breeder.telefono ? breeder.telefono : 'Non disponibile';
		var cellulare = breeder.cellulare ? breeder.cellulare : 'Non disponibile';
		var email = breeder.email ? breeder.email : 'Non disponibile';
		var affisso = breeder.prefisso ? breeder.prefisso : breeder.suffisso ? 
															breeder.suffisso : '';

		var socio = breeder.tipo === 'Cliente' ? 'No' : 
				<>Sezione: {breeder.sezione}<br />
				  Tessera: {breeder.tessera}<br />
				  Codice: {breeder.codice}<br />
				  Associato dal: {breeder.anno_iscrizione}<br />
				  Affisso: {affisso}<br />
				  Razza: {breeder.razza}
				</>;

		return (
			<>
				<ApplicationNavbar />
				<div className="main">
				<div className="section section-gray first-section">
					<Container>
						<h2>Dashboard</h2>
						<div style={{marginTop: "20px"}}>
						<Row>
							<CatsHomeCard fact={this.state.fact} />
							<InCatteryHomeCard fact={this.state.fact} />
							<LittersHomeCard fact={this.state.fact} />
							<ExpoHomeCard fact={this.state.fact} />
						</Row>
						<h3>Io in ANFI</h3>
						<hr />
						<Row>
							<Table bordered>	
							<tbody>
								<tr>
									<th>Cognome e nome</th>
									<td>{breeder.nome_completo}</td>
								</tr>
								<tr>
									<th>Indirizzo</th>
									<td>{breeder.indirizzo}<br />
										{breeder.cap} {breeder.citta} 
									</td>
								</tr>
								<tr>
									<th>Recapiti telefonici</th>
									<td>Fisso: {fisso}<br />
										Cellulare: {cellulare} 
									</td>
								</tr>
								<tr>
									<th>Posta elettronica</th>
									<td>{email}</td>
								</tr>
								<tr>
									<th>Socio ANFI</th>
									<td>{socio}</td>
								</tr>
								{ breeder.cointestazione_affisso ? (
									<tr>
										<th>Cointestazione affisso</th>
										<td>{breeder.cointestazione_affisso}</td>
									</tr>
								  ) : ( null )
								}
							</tbody>	
							</Table>
						</Row>
						</div>
					</Container>
				</div>
				</div>
				<ApplicationFooter />
			</>

		);
	}
}

export default Home;

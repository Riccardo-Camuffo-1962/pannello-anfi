import { Component } from "react";

import {
	Container,
	Table
} from 'reactstrap';

class CatBreederTab extends Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			cat: props.cat,
		};
	}

	render()
	{
		var breeder = this.state.cat.allevatore;

		if( breeder === undefined )
		{
			return (
			<>
				<Container style={{marginTop: "30px" }}>
					<center><h2>Allevatore non pervenuto</h2></center>
				</Container>
			</>
			);
		}


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
				<Container style={{marginTop: "30px" }}>
				<Table bordered>	
				<tbody>
					<tr>
						<th>Cognome e nome</th>
						<td>{breeder.nome_completo}</td>
					</tr>
					<tr>
						<th>Indirizzo</th>
						<td>{breeder.indirizzo}<br />
							{breeder.cap} {breeder.citta} ({breeder.provincia.sigla})</td>
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
				</Container>
			</>
		);
	}
}

export default CatBreederTab;

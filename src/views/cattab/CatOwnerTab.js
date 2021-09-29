import { Component } from "react";

import {
	Container,
	Table
} from 'reactstrap';

class CatOwnerTab extends Component
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
		var owner = this.state.cat.proprietario;
		console.log( this.state.cat );

		if( owner === undefined )
		{
			return (
			<>
				<Container style={{marginTop: "30px" }}>
					<center><h2>Proprietario ignoto</h2></center>
				</Container>
			</>
			);
		}

		var fisso = owner.telefono ? owner.telefono : 'Non disponibile';
		var cellulare = owner.cellulare ? owner.cellulare : 'Non disponibile';
		var email = owner.email ? owner.email : 'Non disponibile';
		var affisso = owner.prefisso ? owner.prefisso : owner.suffisso ? 
															owner.suffisso : '';
		var socio = owner.tipo === 'Cliente' ? 'No' : 
				<>Sezione: {owner.sezione}<br />
				  Tessera: {owner.tessera}<br />
				  Codice: {owner.codice}<br />
				  Associato dal: {owner.anno_iscrizione}<br />
				  Affisso: {affisso}<br />
				  Razza: {owner.razza}
				</>;

		return ( 
			<>
				<Container style={{marginTop: "30px" }}>
				<Table bordered>	
				<tbody>
					<tr>
						<th>Cognome e nome</th>
						<td>{owner.nome_completo}</td>
					</tr>
					<tr>
						<th>Indirizzo</th>
						<td>{owner.indirizzo}<br />
							{owner.cap} {owner.citta} ({owner.provincia.sigla})</td>
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
				</tbody>	
				</Table>
				</Container>
			</>
		);
	}
}

export default CatOwnerTab;

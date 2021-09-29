import { Component } from "react";
import { withRouter } from 'react-router-dom';

import {
	Container,
	Table, Row, Col
} from 'reactstrap';

class CatDetailsTab extends Component
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
		var cat = this.state.cat;

		var cattery = cat.padre.prefisso ? cat.padre.prefisso :
		                            cat.padre.suffisso ? cat.padre.suffisso : '';

		// Babbo e mamma benedici....
		//
		const sire = cat.padre.prefisso ? cattery+' '+cat.padre.nome : 
														cat.padre.nome+' '+cattery;
		cattery = cat.madre.prefisso ? cat.madre.prefisso :
		                            cat.madre.suffisso ? cat.madre.suffisso : '';
		const dam = cat.madre.prefisso ? cattery+' '+cat.madre.nome :
			                             cat.madre.nome+' '+cattery;

		const code = cat.libro.codice+' '+cat.codice;
		const razza = cat.razza ? cat.razza.descrizione : 'Non registrata';
		const sex = cat.sesso ? cat.sesso === 'F' ? 'Femmina' : 'Maschio' : 'ignoto';
		const birth_date = new Intl.DateTimeFormat('it-IT', {
			                month: '2-digit',
			                day: '2-digit',
			                year: 'numeric',
			                }).format(new Date(cat.data_nascita));
		const reproduction = cat.eccellenza_expo ? 'Eccellenza expo' : 
								cat.certificato_medico ? 'Cert.assenza anomalie' : 
																	'Assente';
		var neuter = '';
		if( cat.neutro )
			neuter = '<i class="fa fa-neuter fa-2x" title="Neutro"></i>';
		else if( cat.sex === 'M' )
			neuter = '<i class="fa fa-mars fa-2x" title="Intero"></i>';
		else
			neuter = '<i class="fa fa-venus fa-2x" title="Intero"></i>';

		var not_at_home = '';
		if( cat.non_in_allevamento )
			if( cat.inhousing )
				not_at_home = 
					'<i class="fa fa-home fa-2x" title="In housing" style="color:#fbc658"></i>';
			else
				not_at_home = 
					'<i class="fa fa-home fa-2x" title="Non in allevamento" style="color:#f5593d"></i>';
		else
			not_at_home = 
					'<i class="fa fa-home fa-2x" title="In allevamento" style="color:#6bd098"></i>';

		var deceased = '';
		var death_date = '';
		if( cat.deceduto )
		{
			if( cat.data_decesso )
				death_date = new Intl.DateTimeFormat('it-IT', {
					                month: '2-digit',
					                day: '2-digit',
					                year: 'numeric',
					                }).format(new Date(cat.data_decesso));
				deceased = '<i class="fa fa-check-square-o fa-2x" title="Deceduto" style="color:#f5593d; vertical-align: middle; margin-right: 10px"></i>';
				if( death_date )
					deceased += '<span>['+death_date+']</span>';
		}
		else
			deceased = '<i class="fa fa-square-o fa-2x" title="Vivo" style="color:#6bd098"></i>';

		var not_for_breeding = '';
		if( cat.not_for_breeding )
			not_for_breeding = '<i class="fa fa-check-square-o fa-2x" title="Not for breeding" style="color:#fbc658"></i>';
		else
			not_for_breeding = '<i class="fa fa-square-o fa-2x" title="Nessuna limitazione" style="color:#6bd098"></i>';

		var other = '';
		if( cat.annullato )
			other = '<i class="fa fa-check-square-o" title="Annullato" style="color:#fbc658"></i>&nbsp;Annullato';
		else
			other = '<i class="fa fa-square-o" title="Non annullato"></i>&nbsp;Annullato';

		if( cat.riregistrato )
			other += '<br /><i class="fa fa-check-square-o" title="Annullato" style="color:#fbc658"></i>&nbsp;Riregistrato';
		else
			other += '<i class="fa fa-square-o" title="Non riregistrato"></i>&nbsp;Riregistrato';

		return (
		<>
			<Container style={{marginTop: "30px" }}>
				<Row>
				<Col>
				<Table>
					<tbody>
					<tr>
						<th width="30%">Padre</th>
						<td>{sire}</td>
					</tr>
					<tr>
						<th width="30%">Sesso</th>
						<td>{sex}</td>
					</tr>
					<tr>
						<th width="30%">Razza</th>
						<td>{razza}</td>
					</tr>
					<tr>
						<th width="30%">Data di nascita</th>
						<td>{birth_date}</td>
					</tr>
					<tr>
						<th width="30%">Colore</th>
						<td>{cat.genotipoColore.codice}&nbsp;
								({cat.genotipoColore.descrizione})</td>
					</tr>
					<tr>
						<th width="30%"># Registrazione</th>
						<td>{code}</td>
					</tr>
					<tr>
						<th width="30%">Microchip</th>
						<td>{cat.chip}</td>
					</tr>
					<tr>
						<th width="30%">Occhi</th>
						<td> { cat.occhi ? (
								cat.occhi.descrizione ) : '' }</td>
					</tr>
					</tbody>
				</Table>
				</Col>
				<Col>
				<Table>
					<tbody>
					<tr>
						<th width="50%">Madre</th>
						<td>{dam}</td>
					</tr>
					<tr>
						<th width="50%">Idoneità riproduzione</th>
						<td>{reproduction}</td>
					</tr>
					<tr>
						<th width="50%">Stato fisiologico riproduttivo</th>
						<td><div dangerouslySetInnerHTML={{ __html: neuter }} /></td>
					</tr>
					<tr>
						<th width="30%">In allevamento</th>
						<td><div dangerouslySetInnerHTML={{ __html: not_at_home }} /></td>
					</tr>
					<tr>
						<th width="30%">Deceduto</th>
						<td><div dangerouslySetInnerHTML={{ __html: deceased }} /></td>
					</tr>
					<tr>
						<th width="30%">Not for breeding</th>
						<td><div dangerouslySetInnerHTML={{ __html: not_for_breeding }} /></td>
					</tr>
					<tr>
						<th width="30%">Altro</th>
						<td><div dangerouslySetInnerHTML={{ __html: other }} /></td>
					</tr>
					</tbody>
				</Table>
				</Col>
				</Row>
			</Container>
		</>
		);
	}
}

export default withRouter(CatDetailsTab);

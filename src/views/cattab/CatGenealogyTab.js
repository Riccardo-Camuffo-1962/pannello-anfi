import { Component } from "react";
import { withRouter } from 'react-router-dom';

import {
	Container, Button,
	Table, Row
} from 'reactstrap';

import getCat		from "libs/cat.js"
import PedigreeCell	from "components/Cats/PedigreeCell.js"

class CatGenealogyTab extends Component
{
	constructor( props )
	{
		super( props );

		this.ped = [];
		this.gen = [];

		this.state = {
			currentCat: props.cat,
			cat: null,
			loaded: false,
		};

		this.downloadPedigree = this.downloadPedigree.bind( this );
		this.getPedigree( this.state.currentCat, 5 );
	}

	async getPedigree( cat, ngen )
	{
		const sire = cat.padre ? cat.padre : null;
		const dam = cat.madre ? cat.madre : null;

		await this.getGenealogy( sire, 1, ngen, 'sire', 'SIRE' );
		await this.getGenealogy( dam, 1, ngen, 'dam', 'DAM' );
	}

	async getGenealogy( cat, level, gen, type, branch, cell = '' )
	{
		if( level === ( gen + 1 ) )
			return;

		var catname = ' - ';
		var regno = '';
		var color = '';
		var birth_date = '';

		var sire = null;
		var dam = null;

		// Costruzione del codice
		//
		let code = level+branch[0]+type[0].toUpperCase();

		let catno = 0;
		let sirecell = '';
		let damcell = '';

		if( cell )
		{
			let c = this.getPosition( cell );
			if( c )
			{
				catno = c.pos;
				sirecell = c.sire;
				damcell = c.dam;
			}
			else
			{
				catno = this.ped[code].lenght + 1;
				sirecell = '';
				damcell = '';
			}
		}
		else
		{
			if( this.ped[ code ] === undefined )
			{
				this.ped[code] = [];
				catno = 1;
			}
			else
				catno = this.ped[code].length + 1;
		}

		// Occupo la posizione nell'array di controllo che determina le posizioni
		// dei gatti nelle celle (codice completo - genCode ). In questo modo per
		// ogni genealogia ho l'ordine esatto del gatto del gruppo di celle afferenti.
		//
		this.ped[code].push( { [catno]: 'locked' } );

		if( cat !== null )
		{
			await getCat( this, cat.id );

			cat = this.state.cat;
			if( cat !== null )
			{

				// Informazioni sul gatto da registrare
				//
				catname = cat.pretitolo ? cat.pretitolo+'\u00a0' : '';
				catname += cat.prefisso ? cat.prefisso+'\u00a0'+cat.nome : 
								cat.postfisso ? cat.name+'\u00a0'+cat.postfisso:cat.nome;
				catname += cat.posttitolo? cat.posttitolo : '';

				regno = cat.libro.codice+' '+cat.codice;
				color = cat.genotipoColore.codice ? cat.genotipoColore.codice : '';

				if( cat.data_nascita )
					birth_date = new Intl.DateTimeFormat('it-IT', {
								month: '2-digit',
								day: '2-digit',
								year: 'numeric',
								}).format(new Date(cat.data_nascita));
				else
					birth_date = '';

				sire = cat.padre ? cat.padre : null;
				dam = cat.madre ? cat.madre : null;
			}
			else
			{
				sire = null;
				dam = null;
			}
		}
		
		// Colpo di scena. Salvo tutto
		//
		let genCode = code+catno;
		this.gen[genCode] = { 
			id: cat ? cat.id : 0,
			name: catname,
			regno: regno,
			birth_date: birth_date,
			color: color
		};

		await this.getGenealogy( sire, level+1, gen, 'SIRE', branch, sirecell, damcell );
		await this.getGenealogy( dam,  level+1, gen, 'DAM', branch, sirecell, damcell );
	}

	getPosition( cell )
	{
		const cells = {
			/* Linea maschile */
			"2SS1": { pos: 1, sire: "3SS1", dam: "3SD1" },
			"2SD1": { pos: 1, sire: "3SS2", dam: "3SD2" },

			"3SS1": { pos: 1, sire: "4SS1", dam: "4SD1" },
			"4SS1": { pos: 1, sire: "5SS1", dam: "5SD1" },
			"4SD1": { pos: 1, sire: "5SS2", dam: "5SD2" },
			"5SS1": { pos: 1, sire: "", dam: "" },
			"5SD1": { pos: 1, sire: "", dam: "" },
			"5SS2": { pos: 2, sire: "", dam: "" },
			"5SD2": { pos: 2, sire: "", dam: "" },

			"3SD1": { pos: 1, sire: "4SS2", dam: "4SD2" },
			"4SS2": { pos: 2, sire: "5SS3", dam: "5SD3" },
			"4SD2": { pos: 2, sire: "5SS4", dam: "5SD4" },
			"5SS3": { pos: 3, sire: "", dam: "" },
			"5SD3": { pos: 3, sire: "", dam: "" },
			"5SS4": { pos: 4, sire: "", dam: "" },
			"5SD4": { pos: 4, sire: "", dam: "" },

			"3SS2": { pos: 2, sire: "4SS3", dam: "4SD3" },
			"4SS3": { pos: 3, sire: "5SS5", dam: "5SD5" },
			"4SD3": { pos: 3, sire: "5SS6", dam: "5SD6" },
			"5SS5": { pos: 5, sire: "", dam: "" },
			"5SD5": { pos: 5, sire: "", dam: "" },
			"5SS6": { pos: 6, sire: "", dam: "" },
			"5SD6": { pos: 6, sire: "", dam: "" },

			"3SD2": { pos: 2, sire: "4SS4", dam: "4SD4" },
			"4SS4": { pos: 4, sire: "5SS7", dam: "5SD7" },
			"4SD4": { pos: 4, sire: "5SS8", dam: "5SD8" },
			"5SS7": { pos: 7, sire: "", dam: "" },
			"5SD7": { pos: 7, sire: "", dam: "" },
			"5SS8": { pos: 8, sire: "", dam: "" },
			"5SD8": { pos: 8, sire: "", dam: "" },

			/* Linea femminile */
			"2DS1": { pos: 1, sire: "3DS1", dam: "3DD1" },
			"2DD1": { pos: 1, sire: "3DS2", dam: "3DD2" },

			"3DS1": { pos: 1, sire: "4DS1", dam: "4DD1" },
			"4DS1": { pos: 1, sire: "5DS1", dam: "5DD1" },
			"4DD1": { pos: 1, sire: "5DS2", dam: "5DD2" },
			"5DS1": { pos: 1, sire: "", dam: "" },
			"5DD1": { pos: 1, sire: "", dam: "" },
			"5DS2": { pos: 2, sire: "", dam: "" },
			"5DD2": { pos: 2, sire: "", dam: "" },

			"3DD1": { pos: 1, sire: "4DS2", dam: "4DD2" },
			"4DS2": { pos: 2, sire: "5DS3", dam: "5DD3" },
			"4DD2": { pos: 2, sire: "5DS4", dam: "5DD4" },
			"5DS3": { pos: 3, sire: "", dam: "" },
			"5DD3": { pos: 3, sire: "", dam: "" },
			"5DS4": { pos: 4, sire: "", dam: "" },
			"5DD4": { pos: 4, sire: "", dam: "" },

			"3DS2": { pos: 2, sire: "4DS3", dam: "4DD3" },
			"4DS3": { pos: 3, sire: "5DS5", dam: "5DD5" },
			"4DD3": { pos: 3, sire: "5DS6", dam: "5DD6" },
			"5DS5": { pos: 5, sire: "", dam: "" },
			"5DD5": { pos: 5, sire: "", dam: "" },
			"5DS6": { pos: 6, sire: "", dam: "" },
			"5DD6": { pos: 6, sire: "", dam: "" },
			"3DD2": { pos: 2, sire: "4DS4", dam: "4DD4" },
			"4DS4": { pos: 4, sire: "5DS7", dam: "5DD7" },
			"4DD4": { pos: 4, sire: "5DS8", dam: "5DD8" },
			"5DS7": { pos: 7, sire: "", dam: "" },
			"5DD7": { pos: 7, sire: "", dam: "" },
		    "5DS8": { pos: 8, sire: "", dam: "" },
		    "5DD8": { pos: 8, sire: "", dam: "" },
		};

		// 1SS1 e 1DD1 funzionano sempre. Non devono essere infatti trasposti
		// 
		if( cells[cell] !== undefined )
			return cell[cell];
		else
			return {};
	}

	downloadPedigree()
	{
		window.location.href = 'https://servizi.anfi.it/gatto/'+
													this.state.currentCat.id+'/cg';
	}

	render()
	{
		return (
			<>
			<Container fluid style={{marginTop: "20px" }}>
			<Row>
			<Table bordered size="sm" id='pedigree_table'>
				<thead>
				<tr>
					<th width="20%">Prima generazione</th>
					<th width="20%">Seconda generazione</th>
					<th width="20%">Terza generazione</th>
					<th width="20%">Quarta generazione</th>
					<th width="20%">Quinta generazione</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td rowSpan="16" id="1SS1">
						<PedigreeCell cell={this.gen['1SS1']} /></td>
					<td rowSpan="8" id="2SS1">
						<PedigreeCell cell={this.gen['2SS1']} /></td>
					<td rowSpan="4" id="3SS1">
						<PedigreeCell cell={this.gen['3SS1']} /></td>
					<td rowSpan="2" id="4SS1">
						<PedigreeCell cell={this.gen['4SS1']} /></td>
					<td rowSpan="1" id="5SS1">
						<PedigreeCell cell={this.gen['5SS1']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5SD1">
						<PedigreeCell cell={this.gen['5SD1']} /></td>
				</tr>
				<tr>
					<td rowSpan="2" id="4SD1">
						<PedigreeCell cell={this.gen['4SD1']} /></td>
					<td rowSpan="1" id="5SS2">
						<PedigreeCell cell={this.gen['5SS2']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5SD2">
						<PedigreeCell cell={this.gen['5SD2']} /></td>
				</tr>
				<tr>
					<td rowSpan="4" id="3SD1">
						<PedigreeCell cell={this.gen['3SD1']} /></td>
					<td rowSpan="2" id="4SS2">
						<PedigreeCell cell={this.gen['4SS2']} /></td>
					<td rowSpan="1" id="5SS3">
						<PedigreeCell cell={this.gen['5SS3']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5SD3">
						<PedigreeCell cell={this.gen['5SD3']} /></td>
				</tr>
				<tr>
					<td rowSpan="2" id="4SD2">
						<PedigreeCell cell={this.gen['4SD2']} /></td>
					<td rowSpan="1" id="5SS4">
						<PedigreeCell cell={this.gen['5SS4']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5SD4">
						<PedigreeCell cell={this.gen['5SD4']} /></td>
				</tr>
				<tr>
					<td rowSpan="8" id="2SD1">
						<PedigreeCell cell={this.gen['2SD1']} /></td>
					<td rowSpan="4" id="3SS2">
						<PedigreeCell cell={this.gen['3SS2']} /></td>
					<td rowSpan="2" id="4SS3">
						<PedigreeCell cell={this.gen['4SS3']} /></td>
					<td rowSpan="1" id="5SS5">
						<PedigreeCell cell={this.gen['5SS5']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5SD5">
						<PedigreeCell cell={this.gen['5SD5']} /></td>
				</tr>
				<tr>
					<td rowSpan="2" id="4SD3">
						<PedigreeCell cell={this.gen['4SD3']} /></td>
					<td rowSpan="1" id="5SS6">
						<PedigreeCell cell={this.gen['5SS6']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5SD6">
						<PedigreeCell cell={this.gen['5SD6']} /></td>
				</tr>
				<tr>
					<td rowSpan="4" id="3SD2">
						<PedigreeCell cell={this.gen['3SD2']} /></td>
					<td rowSpan="2" id="4SS4">
						<PedigreeCell cell={this.gen['4SS4']} /></td>
					<td rowSpan="1" id="5SS7">
						<PedigreeCell cell={this.gen['5SS7']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5SD7">
						<PedigreeCell cell={this.gen['5SD7']} /></td>
				</tr>
				<tr>
					<td rowSpan="2" id="4SD4">
						<PedigreeCell cell={this.gen['4SD4']} /></td>
					<td rowSpan="1" id="5SS8">
						<PedigreeCell cell={this.gen['5SS8']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5SD8">
						<PedigreeCell cell={this.gen['5SD8']} /></td>
				</tr>

				<tr>
			    <td rowSpan="16" id="1DD1">
						<PedigreeCell cell={this.gen['1DD1']} /></td>
			    <td rowSpan="8" id="2DS1">
						<PedigreeCell cell={this.gen['2DS1']} /></td>
			    <td rowSpan="4" id="3DS1">
						<PedigreeCell cell={this.gen['3DS1']} /></td>
			    <td rowSpan="2" id="4DS1">
						<PedigreeCell cell={this.gen['4DS1']} /></td>
			    <td rowSpan="1" id="5DS1">
						<PedigreeCell cell={this.gen['5DS1']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5DD1">
						<PedigreeCell cell={this.gen['5DD1']} /></td>
				</tr>
				<tr>
					<td rowSpan="2" id="4DD1">
						<PedigreeCell cell={this.gen['4DD1']} /></td>
					<td rowSpan="1" id="5DS2">
						<PedigreeCell cell={this.gen['5DS2']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5DS2">
						<PedigreeCell cell={this.gen['5DD2']} /></td>
				</tr>
				<tr>
					<td rowSpan="4" id="3DD1">
						<PedigreeCell cell={this.gen['3DD1']} /></td>
					<td rowSpan="2" id="3DS2">
						<PedigreeCell cell={this.gen['4DS2']} /></td>
					<td rowSpan="1" id="5DS3">
						<PedigreeCell cell={this.gen['5DS3']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5DD3">
						<PedigreeCell cell={this.gen['5DD3']} /></td>
				</tr>
				<tr>
					<td rowSpan="2" id="4DD2">
						<PedigreeCell cell={this.gen['4DD2']} /></td>
					<td rowSpan="1" id="5DS4">
						<PedigreeCell cell={this.gen['5DS4']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5DD4">
						<PedigreeCell cell={this.gen['5DD4']} /></td>
				</tr>
				<tr>
					<td rowSpan="8" id="2DD1">
						<PedigreeCell cell={this.gen['2DD1']} /></td>
					<td rowSpan="4" id="3DS2">
						<PedigreeCell cell={this.gen['3DS2']} /></td>
					<td rowSpan="2" id="4DS3">
						<PedigreeCell cell={this.gen['4DS3']} /></td>
					<td rowSpan="1" id="5DS5">
						<PedigreeCell cell={this.gen['5DS5']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5DD5">
						<PedigreeCell cell={this.gen['5DD5']} /></td>
				</tr>
				<tr>
					<td rowSpan="2" id="4DD3">
						<PedigreeCell cell={this.gen['4DD3']} /></td>
					<td rowSpan="1" id="5DS6">
						<PedigreeCell cell={this.gen['5DS6']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5DD6">
						<PedigreeCell cell={this.gen['5DD6']} /></td>
				</tr>
				<tr>
					<td rowSpan="4" id="3DD2">
						<PedigreeCell cell={this.gen['3DD2']} /></td>
					<td rowSpan="2" id="4DS4">
						<PedigreeCell cell={this.gen['4DS4']} /></td>
					<td rowSpan="1" id="5DS7">
						<PedigreeCell cell={this.gen['5DS7']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5DD7">
						<PedigreeCell cell={this.gen['5DD7']} /></td>
				</tr>
				<tr>
					<td rowSpan="2" id="4DD4">
						<PedigreeCell cell={this.gen['4DD4']} /></td>
					<td rowSpan="1" id="5DS8">
						<PedigreeCell cell={this.gen['5DS8']} /></td>
				</tr>
				<tr>
					<td rowSpan="1" id="5DD8">
						<PedigreeCell cell={this.gen['5DD8']} /></td>
				</tr>
				</tbody>
			</Table>
			</Row>
			<Row className="d-flex justify-content-center flex-nowrap">
					<Button onClick={() => this.downloadPedigree() } 
								className="btn-round">
						Scarica Certificato Genealogico
					</Button>
			</Row>
			</Container>
			</>
		);
	}
}

export default withRouter(CatGenealogyTab);

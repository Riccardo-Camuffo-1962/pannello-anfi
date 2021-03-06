import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Row, Input, Label } from 'reactstrap';
import AsyncSelect from "react-select/async";

import DataTable, { createTheme } from 'react-data-table-component';

import getCategoriesForSubscription	from "libs/get_categories_for_subscription.js"
import remapClass					from "libs/remap_class.js"

import { Notifications }		  from "components/Notifications/Notifications.js";

class CatteryShowSubsConfTable extends Component
{
	constructor( props )
	{
		super( props );

		this.title = props.title;

		this.state = {
			cats: props.cats,
			options: [],
			copts: [],
			opts: [],
		}

		this.onChange         = this.onChange.bind(this);
		this.onChangeSelected = this.onChangeSelected.bind(this);
		this.getClasses		  = this.getClasses.bind(this);

		this.columns = [
			{
				name: 'Codice',
				sortable: false,
				width: '190px',
				cell: row => row.code,
			},
			{
				name: 'Nome',
				sortable: false,
				width: '250px',
				cell: row => <>{row.name}<br />
							   {row.birth_date} - {row.sex}<br />
							   {row.color} 
							 </>,
			},
			{
				name: 'Categoria',
				sortable: false,
				cell: row => 
					<Input type="select" name="category">
						{this.state.opts}
					</Input>
			},
			{
				name: 'Gabbia doppia',
				width: '160px',
				sortable: false,
				cell: row => 
					<><div style={{ width:'100%'}}><center>
						<Label check>
						<Input type="checkbox" style={{position:'relative'}}
								name="gabbiadoppia" id="gabbiadoppia"
								onChange={(event) => this.onChange(event, row.id)} />
						</Label>
					</center></div></>
			},
			{
				name: 'Conferma colore',
				sortable: false,
				width: '160px',
				cell: row => 
					<><div style={{ width:'100%'}}><center>
						<Label check>
						<Input type="checkbox" style={{position:'relative'}}
								name="confermacolore" id="confermacolore"
								onChange={(event) => this.onChange(event)} />
						</Label>
					</center></div></>
			},
			{
				name: 'Vicinanza gabbia',
				sortable: false,
				cell: row => <><Input type="text" name="vicinanzagabbia" 
								onChange={(event) => this.onChange(event, row.id)} /></>
			},
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			}
		});

		this.fetchClasses()
	}

	async fetchClasses()
	{
		// Predisposizioni delle classi
		//
		let cats = this.props.cats;
		let options = [];
		let copts = [];

		for( let x = 0; x < this.props.cats.length; x++ )
		{
			var id = cats[x].id;

			var opts = await this.getClasses( 144, id );
			options.push( opts );
			copts.push( id );
		}

		console.log( options );

		await this.setState( { options: options } );
		await this.setState( { copts: copts } );

		console.log( 'in fetch Classes' );
		console.log( this.state );
	}

	async getClasses( expo_id, cat_id )
	{
		var result = await getCategoriesForSubscription( expo_id, cat_id );

		var selectOptions = [];

		result.forEach(function(c, i, array) {
			let cl = remapClass( String( c ) );

			selectOptions.push({
				value: cl.class_id,	
				label: cl.name + ((cl.title) ? ' - '+cl.title : '')
			});

		});
	
		selectOptions.reverse();
		// let defSelOpt = selectOptions.find( ({ value }) => 
								// value === String(this.state.subscription.category) );
		// if( defSelOpt )
			// await this.setState( { defaultSelectedValue: defSelOpt } );

		// Proviamo e poi molliamo. Una cazzo di select options normale
		// diventa un inferno. Dopo semplifichiamo.... TODO
		//
		let opts = [];

		selectOptions.forEach( function(item, index ) {
			var key = index;
			opts.push( <option key={key} value={item.value}>{item.label}</option> );
		});
		await this.setState( { opts: opts } );

		return selectOptions;
	}

	getOptions( cat_id )
	{
		console.log( 'in Get Options' );
		console.log( cat_id );

		var result  = this.state.copts.indexOf( cat_id );
		if( result < 0 )
			return [];
		
		console.log( 'result' );
		console.log( result );

		// console.log( result.classes );
		return this.state.options[result];
	}

	onChangeSelected(selected)
	{
		var value = selected.value;

		this.setState( { defaultSelectedValue: selected } );
		this.setState( prevState => ({
			subscription: {
				...prevState.subscription,
				category: value }
		}));
	}

	onChange(e, idx)
	{
		console.log( e );
		console.log( idx );
		//
		const target = e.target;
		const name = target.name;
		var value = '';

		// I checkbox si prendono in altro modo.....
		//
		if( name === 'gabbiadoppia' || name === 'confermacolore' )
		{
			value = e.target.checked;
			/*
			this.setState( prevState => ({
				subscription: {
					...prevState.subscription,
					[name]: value === true ? 1 : 0 }
			}));
			*/
		}
		else
		{
			value = target.value;
			/*
			this.setState( prevState => ({
				subscription: {
					...prevState.subscription,
					[name]: value
				}
			}));
			*/
		}

		// console.log( name );
		// console.log( value );
		// e.preventDefault();
		// console.log( this.state );
	}

	render()
	{
		// console.log( 'in render' );
		// console.log( this.state.cats );
		//
		return (
			<>
			<DataTable
				columns={this.columns}
				data={this.state.cats}
				pagination="true"
				paginationTotalRows={this.state.cats.length}
				paginationComponentOptions = { {
					rowsPerPageText: '', 
					noRowsPerPage: true, 
					rangeSeparatorText: 'di', 
					selectAllRowsItem: false, 
					selectAllRowsItemText: '' } }
				theme = 'panel'
			/>	
			<Notifications />
			</>
		);
	}
}

export default withRouter(CatteryShowSubsConfTable);


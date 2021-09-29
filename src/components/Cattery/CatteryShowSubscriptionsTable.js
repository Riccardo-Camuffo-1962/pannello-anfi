import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Row } from 'reactstrap';

import DataTable, { createTheme } from 'react-data-table-component';
import EditShowSubscriptionModal  from "components/Cattery/EditShowSubscriptionModal.js";
import getCatteryShowResults	  from "libs/cattery_show_results.js"
import remapClass				  from "libs/remap_class.js"
import { Notifications }		  from "components/Notifications/Notifications.js";

class CatteryShowSubscriptionsTable extends Component
{
	constructor( props )
	{
		super( props );

		this.onChangePage = this.onChangePage.bind(this);

		this.title = props.title;
		this.who = props.who;
		this.what = props.what;

		this.state = {
			loaded: false,
			current_page: props.current_page,
			last_page: props.last_page,
			total: props.total,
			data: props.data,
			live: false,
			subscription: null,
			idx: 0,
		}

		this.columns = [
			{
				name: 'Esposizione',
				sortable: false,
				cell: row => row.location,
			},
			{
				name: 'Data',
				sortable: false,
				cell: row => row.expo_date,
			},
			{
				name: 'Gatto',
				sortable: false,
				cell: row => row.cat,
			},
			{
				name: 'Classe',
				sortable: false,
				cell: row => row.fifeClass,
			},
			{
				name: '',
				sortable: false,
				cell: row => <><Button className="btn-link"
								title="Modifica iscrizione"
							onClick=
								{()=> this.editShowSubscription( row.idx ) }>
						<i className="fa fa-2x fa-edit"></i></Button>
								<Button className="btn-link"
								title="Elimina iscrizione"
							onClick=
								{() => this.deleteShowSubscription( row.idx )}>
							<i className="fa fa-2x fa-trash"></i></Button></>
			}
		];

		createTheme( 'panel', {
			background: {
				default: 'transparent'
			}
		});
	}

	onChangePage( page )
	{
		getCatteryShowResults( page, this, this.what, this.who );
	}

	async editShowSubscription( idx )
	{
		var subscription = this.state.data[idx];

		await this.setState( { subscription: subscription } );
		await this.setState( { idx: idx } );
		await this.setState( { live: true } );
	}

	deleteShowSubscription( idx )
	{
		console.log( this.state.data[idx] );
	}

	gotoNewExpoSubscription()
	{
		this.props.history.push( '/cattery-domestic-add-subscriptions' );
	}

	render()
	{
		// console.log( 'in render' );
		// console.log( this.state.data );
		// console.log( this.state.reportToShow );

		var data = [];

		this.state.data.forEach(function(expo, index, array) {

			const id = expo.id;
			const idx = index;
			const location = expo.esposizione.name;
			const expo_date = expo.esposizione.date ? new Intl.DateTimeFormat('it-IT', { 
				month: '2-digit', 
				day: '2-digit',
				year: 'numeric', 
				}).format(new Date(expo.esposizione.date)) : '';

			const cat = expo.gatto.nome;
			const fifeClass = remapClass(String(expo.category));

			const p = fifeClass.title !== '' ? 'Titolo: '+fifeClass.title : '';
			const t = fifeClass.name;

			data.push({
				id: id,
				idx: idx,
				expo_date: expo_date,
				location: location,
				cat: cat,
				fifeClass: <><p>{t}<br />{p}</p></>,
			});
		})

		return (
			<>
			<DataTable
				title={this.title}
				columns={this.columns}
				data={data}
				pagination="true"
				paginationRowsPerPageOptions={[50]}
				paginationTotalRows={this.state.total}
				paginationServer="true"
				paginationComponentOptions = { {
					rowsPerPageText: '', 
					noRowsPerPage: true, 
					rangeSeparatorText: 'di', 
					selectAllRowsItem: false, 
					selectAllRowsItemText: '' } }
				onChangePage = {this.onChangePage}
				theme = 'panel'
			/>	
			<Row className="d-flex justify-content-center flex-nowrap">
					<Button onClick={() => this.gotoNewExpoSubscription() } 
								className="btn-round">
						Nuova iscrizione
					</Button>
			</Row>
			{ 
				this.state.live === true ? (
					<EditShowSubscriptionModal live={this.state.live}
						caller={this}
						idx={this.state.idx}
						subscription={this.state.subscription} /> ) : ( null )
			}
			<Notifications />
			</>
		);
	}
}

export default withRouter(CatteryShowSubscriptionsTable);

import getData	from	'libs/get_data.js';

async function getCatteryShowSubscriptions( page, obj )
{
	var response = null;
	var baseUrl = '';

	/**
	 * Qui la situazione e' complicata. Prendo la prima pagina delle iscrizioni.
	 * Vedo se le esposizioni sono sono attive.
	 * A questo punto mi metto da conto le iscrizioni.
	 * Se tutta la pagina e' piena di iscrizioni attive, allora provo la pagina 
	 * successiva, fino a quando non trovo una iscrizione ad una esposizione
	 * non attiva. Sperando di prenderle tutte.
	 */
	baseUrl = 'https://servizi.anfi.it/iscrizioniexpo/search';
	response = await getData( baseUrl, page );

	// console.log( 'inGetCats' );
	// console.log( response );

	var total = 0;
	var current_page = 1;
	var last_page = 1;
	var data = [];

	Array.prototype.forEach.call( response.data, function(expo, index )
	{
		if( expo.esposizione.status === 0 )
			return;
		else
		{
			data.push( expo );
			total++;
		}
	});

	await obj.setState( { total: total } );
	await obj.setState( { current_page: current_page } );
	await obj.setState( { last_page: last_page } );
	await obj.setState( { data: data } );

	await obj.setState( { loaded: true } );
}

export default getCatteryShowSubscriptions;

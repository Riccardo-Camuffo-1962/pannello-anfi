import getData	from	'libs/get_data.js';

async function getCategoriesForSubscription( expo_id, cat_id )
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
	baseUrl = 'https://servizi.anfi.it/iscrizioniexpo/getcategories/'+expo_id+'/'+cat_id;
	response = await getData( baseUrl );

	// console.log( 'inGetCats' );
	// console.log( response );

	return response;
}

export default getCategoriesForSubscription;


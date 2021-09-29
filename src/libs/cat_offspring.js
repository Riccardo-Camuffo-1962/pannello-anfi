
async function getCatOffspring( page, obj, what = '', who='' )
{
	const timeout = 18000;
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);

	var response = null;
	var promise = null;
	var baseUrl = '';
	var sFilter = '';
	var litters = [];

	/**
	 * Concetto. L'API non ha una possibilità di richiamare i cuccioli di una
	 * denuncia di nascita in modo 'diretto'. L'unica possibilità è fare l'elenco
	 * delle denunce e successivamente richiedere i cuccioli della denuncia con
	 * una seconda chiamata. Il tutto è molto pesante dal punto di vista delle
	 * richieste al server, perchè per ciascuna pagina ci sono:
	 * - la richiesta dei dati della pagina per l'elenco delle denunce
	 * - 10 richieste per pagina per ottenere i cuccioli associati.
	 * Del resto il pannello ufficiale non prevede di fornire questo servizio
	 * e quindi l'API non restituisce un dato completo denuncia + cuccioli.
	 * La faccio facile, con due chiamate e vediamo cosa capita.
	 */

	// Prima chiamata: denunce di nascita filtrata per padre o madre
	// La prima chiamata non modifica lo stato dell'oggetto chiamante, ma preleva
	// appunto le sole denunce associate al micio passato come argomento (nome)
	//
	if( what !== '' && page )
		sFilter = '&_field_'+what+'='+encodeURIComponent( who );

	baseUrl = 'https://servizi.anfi.it/denunce_nascita/search?page='+page+sFilter;

	try {

		const config = {
			method: 'GET',
			credentials: 'include',
			redirect: 'follow',
			cache: 'no-cache',
			referrerPolicy: 'no-referrer',
			signal: controller.signal,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Accept': '*/*',
				'Accept-Language': '*',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
			}
		};

		const request = new Request( baseUrl, config );
		promise = await fetch( request );
		response = await promise.json();
	}
	catch( error )
	{
		console.error( 'Errore drammatico:', error );

		// TODO: capire cosa fare...
		//
		return;
	}	


	// A questo punto nella response abbiamo le denunce. Va fatto un girin girello
	// per pescare i cuccioli. La response non è immediatamente traversabile e 
	// va quindi passata ad una variabile per il ciclo. Mistero....
	//
	const birth_reports = response.data.slice();

	for( const br of birth_reports ) {

		var litter_id = br.id;				// ID della denuncia
		
		sFilter = '_field_id_denuncia='+encodeURIComponent( litter_id );
		baseUrl = 'https://servizi.anfi.it/cucciolo/search?'+sFilter ;

		try {

			const config = {
				method: 'GET',
				credentials: 'include',
				redirect: 'follow',
				cache: 'no-cache',
				referrerPolicy: 'no-referrer',
				signal: controller.signal,
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					'Accept': '* /*',
					'Accept-Language': '*',
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
				}
			};

			const request = new Request( baseUrl, config );

			promise = await fetch( request );
			var resp = await promise.json();

			litters.push( resp.data );		// Salvataggio per la risposta finale
		}
		catch( error )
		{
			console.error( 'Errore drammatico:', error );

			// TODO: capire cosa fare...
			//
			return;
		}	
	}

	await obj.setState( { total: response.total } );
	await obj.setState( { current_page: response.current_page } );
	await obj.setState( { last_page: response.last_page } );
	await obj.setState( { data: litters } );
	await obj.setState( { loaded: true } );


	clearTimeout( id );
	// console.log( 'Fine completa di getCats' );
}

export default getCatOffspring;

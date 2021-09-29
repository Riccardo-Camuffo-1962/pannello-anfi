async function getControlPanel()
{
	var result = {
		cats:			0,
		in_cattery:		0,
		litters:		0,
		cats_in_expo:   0,
		breeder:		null,
	};

	/**
	 * Sommatorie. 
	 * - Quanti gatti registrati overall
	 * - Gatti in allevamento
	 * - Cucciolate
	 * - Cuccioli
	 * - Esposizioni
	 */
	var wFilter = '';
	const ctx = JSON.parse( sessionStorage.getItem( 'ctx' ) );
	const owner = ctx['name'];
	
	// Gatti registrati
	//
	var cats = await getData( 'https://servizi.anfi.it/gatto/search', 1 );
	result.cats = cats.total;

	// Gatti in allevamento 
	//
	wFilter = '&_field_proprietario='+encodeURIComponent( owner )+
			  '&_field_deceduto=0&_field_nia=0';

	cats = await getData( 'https://servizi.anfi.it/gatto/search', 1, wFilter );
	result.in_cattery = cats.total;
	result.breeder = cats.data[0].proprietario;	// L'allevatore potrebbe essere altro

	var litters = await getData( 'https://servizi.anfi.it/denunce_nascita/search', 1 )
	result.litters = litters.total;

	// Gatti in esposizione
	//
	var cats_in_expo = await getData('https://servizi.anfi.it/iscrizioniexpo/search',1);
	result.cats_in_expo = cats_in_expo.total;

	return result;
}

async function getData( url, page = 0, filter = '' )
{
	const timeout = 8000;
	const controller = new AbortController();
	const timeout_id = setTimeout(() => controller.abort(), timeout);

	var baseUrl = page === 0 ? url : url+'?page='+page;

	if( filter !== '' )
		baseUrl += filter;

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
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '+
							  'AppleWebKit/537.36 (KHTML, like Gecko) '+
							  'Chrome/89.0.4389.114 Safari/537.36'
			}
		};

		const request = new Request( baseUrl, config );

		const promise = await fetch( request );
		const response = await promise.json();

		clearTimeout( timeout_id );
		return response;
	}
	catch( error )
	{
		console.error( 'Errore drammatico:', error );

		// TODO: capire cosa fare...
		//
		return;
	}
}

export default getControlPanel;

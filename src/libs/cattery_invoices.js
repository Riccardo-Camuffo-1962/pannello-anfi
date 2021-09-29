
async function getCatteryInvoices( page, obj, who='' )
{
	const timeout = 8000;
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);

	var response = null;
	var promise = null;
	var baseUrl = '';
	var sFilter = '';

	// console.log( 'inGetCatteryInvoices' );
	// console.log( who );

	baseUrl = 'https://servizi.anfi.it/fattura_ricevuta/search?page='+page;

	if( who !== '' )
	{
		sFilter = '&_field_anno='+encodeURIComponent( who );
		baseUrl += sFilter;
	}

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

		// console.log( response );

		await obj.setState( { total: response.total } );
		await obj.setState( { current_page: response.current_page } );
		await obj.setState( { last_page: response.last_page } );
		await obj.setState( { data: response.data } );

		await obj.setState( { loaded: true } );
	}
	catch( error )
	{
		console.error( 'Errore drammatico:', error );

		// TODO: capire cosa fare...
		//
		return;
	}

	clearTimeout( id );
	// console.log( 'Fine completa di getCats' );
}

export default getCatteryInvoices;


async function getCatteryShowResults( page, obj, what='', who='' )
{
	const timeout = 8000;
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);

	var response = null;
	var promise = null;
	var baseUrl = '';
	var sFilter = '';

	// console.log( 'inGetCats' );
	// console.log( page );

	if( what === 'cat' )
	{
		sFilter = '&_field_gatto='+encodeURIComponent( who );
	}
	else if( what === 'location' )
	{
		sFilter = '&_field_name='+encodeURIComponent(who);
	}

	sFilter += '&field_attive=0';						// Solo chiuse

	baseUrl = 'https://servizi.anfi.it/iscrizioniexpo/search?page='+page+sFilter;

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

export default getCatteryShowResults;

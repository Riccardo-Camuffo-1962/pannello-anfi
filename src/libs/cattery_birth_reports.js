
async function getCatteryBirthReports( page, obj, what = '', who='', kittens = false )
{
	const timeout = 18000;
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);

	var response = null;
	var promise = null;
	var baseUrl = '';
	var sFilter = '';

	// console.log( 'inGetCatteryTest' );

	if( what !== '' && page )
		sFilter = '&_field_'+what+'='+encodeURIComponent( who );
	else if( what !== '' && page === 0 )
		sFilter = '_field_'+what+'='+encodeURIComponent( who );

	baseUrl = page !== 0 ?
		'https://servizi.anfi.it/denunce_nascita/search?page='+page+sFilter :
		'https://servizi.anfi.it/cucciolo/search?'+sFilter ;

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

		if( kittens === false )
		{
			await obj.setState( { total: response.total } );
			await obj.setState( { current_page: response.current_page } );
			await obj.setState( { last_page: response.last_page } );
			await obj.setState( { data: response.data } );

			await obj.setState( { loaded: true } );
		}
		else
		{
			// await obj.setState( { kittens: response.data } );
			return response.data;
		}
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

export default getCatteryBirthReports;

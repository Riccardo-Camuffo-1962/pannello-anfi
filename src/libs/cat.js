
async function getCat( obj, id )
{
	const timeout = 8000;
	const controller = new AbortController();
	const timeout_id = setTimeout(() => controller.abort(), timeout);

	var cat = null;
	var promise = null;
	var baseUrl = 'https://servizi.anfi.it/gatto/'+id;

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
		cat = await promise.json();

		await obj.setState( { cat: cat } );
		await obj.setState( { loaded: true } );
	}
	catch( error )
	{
		console.error( 'Errore drammatico:', error );

		// TODO: capire cosa fare...
		//
		return;
	}

	clearTimeout( timeout_id );
	// console.log( 'Fine completa di getCats' );
}

export default getCat;

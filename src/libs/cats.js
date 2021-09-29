
async function getCats( page, obj, what = 'full', search='', who='' )
{
	const timeout = 8000;
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);

	var response = null;
	var promise = null;
	var baseUrl = '';
	var wFilter = '';
	var sFilter = '';

	// console.log( 'inGetCats' );
	// console.log( page );

	if( what === 'full' )
	{
		baseUrl = 'https://servizi.anfi.it/gatto/search?page='+page;
	}
	else if( what === 'owned' )
	{
		let ctx = JSON.parse( sessionStorage.getItem( 'ctx' ) );
		let owner = ctx['name'];
		wFilter = '&_field_proprietario='+encodeURIComponent( owner );
	}
	else if( what === 'in_cattery' )
	{
		let ctx = JSON.parse( sessionStorage.getItem( 'ctx' ) );
		let owner = ctx['name'];
		wFilter = '&_field_proprietario='+encodeURIComponent( owner )+
				  '&_field_deceduto=0&_field_nia=0';
	}
	else if( what === 'deceased' )
	{
		let ctx = JSON.parse( sessionStorage.getItem( 'ctx' ) );
		let owner = ctx['name'];
		wFilter = '&_field_proprietario='+encodeURIComponent( owner )+
				  '&_field_deceduto=1';
	}
	else if( what === 'in_hosting' )
	{
		let ctx = JSON.parse( sessionStorage.getItem( 'ctx' ) );
		let owner = ctx['name'];
		wFilter = '&_field_proprietario='+encodeURIComponent( owner )+
				  '&_field_deceduto=0&_field_nia=1';
	}
	else if( what === 'neuter' )
	{
		let ctx = JSON.parse( sessionStorage.getItem( 'ctx' ) );
		let owner = ctx['name'];
		wFilter = '&_field_proprietario='+encodeURIComponent( owner )+
				  '&_field_neutro=1';
	}

	if( search === 'name' )
		sFilter = '&_field_nome='+encodeURIComponent( who );
	if( search === 'owner' )
		sFilter = '&_field_proprietario='+encodeURIComponent(who);
	if( search === 'breeder' )
		sFilter = '&_field_allevatore='+encodeURIComponent(who);
	if( search === 'code' )
		sFilter = '&_field_codice='+encodeURIComponent(who);


	baseUrl = 'https://servizi.anfi.it/gatto/search?page='+page+wFilter+sFilter;

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

export default getCats;


async function getCatsForExpo()
{
	const timeout = 8000;
	const controller = new AbortController();
	const timeout_id = setTimeout(() => controller.abort(), timeout);

	let ctx = JSON.parse( sessionStorage.getItem( 'ctx' ) );
	let owner = ctx['name'];
	let cats = [];

	let baseUrl = 'https://servizi.anfi.it/gatto/search';
	let wFilter = '?_field_proprietario='+encodeURIComponent( owner )+
				  '&_field_deceduto=0&_field_nia=0';

	baseUrl = baseUrl+wFilter;

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

		var request = new Request( baseUrl, config );
		var promise = await fetch( request );
		var response = await promise.json();

		let page = response.current_page + 1;
		let last_page = response.last_page;

		cats = response.data;

		for( ; page <= last_page; page++ )
		{
			var nextPage = baseUrl+'&page='+page;

			request = new Request( nextPage, config );
			promise = await fetch( request );
		
			var nextCats = await promise.json();
			cats = cats.concat( nextCats.data );
		}
	}
	catch( error )
	{
		console.error( 'Errore drammatico:', error );

		// TODO: capire cosa fare...
		//
	}

	clearTimeout( timeout_id );

	// Mettiamoli in ordine alfabetico, vala'
	//
	cats.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))

	// A questo punto andrebbero valutate alcune cose, tipo l'età del gatto
	// Se maggiore di 12 anni difficile vada in expo e neppure se ha meno di 4 mesi....
	//
	const today = new Date();

	var finalCats = [];
	for( var x=0; x < cats.length; x++ )
	{
		var c = cats[x];
		var birth_date = c.data_nascita;

		var years = today.getFullYear() - new Date( birth_date).getFullYear();
		var months = new Date( today - new Date( birth_date )).getMonth();

		if( years >= 12 )
			continue;

		if( years === 0 && months < 4 )
			continue;

		finalCats.push( c );
		// console.log( c.nome+" "+years+' '+months );
	}
	
	return finalCats;
}

export default getCatsForExpo;

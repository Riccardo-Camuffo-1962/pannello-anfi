
function safeConvertDate( dt )
{

	const cDate = dt ? new Intl.DateTimeFormat('it-IT', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric',
	}).format(new Date(dt)) : '';

	return cDate;
}

export default safeConvertDate;

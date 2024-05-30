"use client"
export const PlayedSelect = () => {
	return (
		<select id="played" defaultValue="all" onChange={() => {}}>
			<option value="all">All</option>
			<option value="played">Played</option>
			<option value="not-played">Not Played</option>
		</select>
	)
}

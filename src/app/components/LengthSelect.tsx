"use client"

import { useVideoStore } from "@/stores/videoStore"

export const LengthSelect = () => {
	const { setQuery } = useVideoStore()

	return (
		<select id="length" defaultValue="all" onChange={() => {}}>
			<option value="all">All</option>
			<option
				value="0-10"
				onClick={() => {
					setQuery("?lte=10&gte=0")
				}}>
				0-10 minutes
			</option>
			<option
				value="10-20"
				onClick={() => {
					setQuery("?lte=20&gte=10")
				}}>
				10-20 minutes
			</option>
			<option value="20-30">20-30 minutes</option>
			<option value="30-40">30-40 minutes</option>
			<option value=">40"> {">40"}</option>
		</select>
	)
}

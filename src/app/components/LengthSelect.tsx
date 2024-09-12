import { useVideoStore } from "@/stores/videoStore"
import { ChangeEvent } from "react"

export const LengthSelect = () => {
	const { setQuery } = useVideoStore()

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value

		switch (value) {
			case "<=10":
				setQuery("?Duration=600&Type=lte")
				break
			case ">=20":
				setQuery("?Duration=1200&Type=gte")
				break
			case ">30":
				setQuery("?Duration=1800&Type=gte")
				break
			case "> 40":
				setQuery("?Duration=2400&Type=gte")
				break
			default:
				setQuery("")
				break
		}
	}

	return (
		<select
			id="length"
			defaultValue="all"
			onChange={handleSelect}
			className="border-2 rounded p-1 ml-2 mt-2 bg-primary">
			<option value="all">All</option>
			<option value="<=10">{"<10 minutes"}</option>
			<option value=">=20">{">20 minutes"}</option>
			<option value="<30">{">30 minutes"}</option>
			<option value="> 40">{"> 40  minutes"}</option>
		</select>
	)
}

import { useVideoStore } from "@/stores/videoStore"
import { ChangeEvent } from "react"

export const LengthSelect = () => {
	const { setQuery } = useVideoStore()
	const switchReturn = (value: string) => {
		switch (value) {
			case "< 10":
				return "?Duration=600&Type=lte"
			case "< 20":
				return "?Duration=1200&Type=lte"
			case "< 30":
				return "?Duration=1800&Type=lte"
			case "< 40":
				return "?Duration=2400&Type=lte"
			case "< 60":
				return "?Duration=3600&Type=lte"
			case "> 20":
				return "?Duration=1200&Type=gte"
			case "> 30":
				return "?Duration=1800&Type=gte"
			case "> 40":
				return "?Duration=2400&Type=gte"
			case "> 60":
				return "?Duration=3600&Type=gte"
			default:
				return ""
		}
	}

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		if (value) setQuery(switchReturn(value) as string)
	}

	return (
		<select
			id="length"
			defaultValue="all"
			onChange={handleSelect}
			className="border-2 rounded p-1 ml-2 mt-2 bg-primary">
			<option value="all">All</option>
			<option value="< 10">{"< 10 minutes"}</option>
			<option value="< 20">{"< 20 minutes"}</option>
			<option value="< 30">{"< 30 minutes"}</option>
			<option value="< 40">{"< 40  minutes"}</option>
			<option value="< 60">{"< 60 minutes"}</option>
			<option value="> 20">{"> 20 minutes"}</option>
			<option value="> 30">{"> 30 minutes"}</option>
			<option value="> 40">{"> 40  minutes"}</option>
			<option value="> 60">{"> 60 minutes"}</option>
		</select>
	)
}

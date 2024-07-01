import { ManageHistory } from "@mui/icons-material"
import { handleClick } from "@/app/components/containers/sharedFunctions"

export const RandomPlayed = () => {
	return (
		<button id="random-played" onClick={() => handleClick()}>
			<ManageHistory />
		</button>
	)
}

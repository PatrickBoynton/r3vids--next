import { handleRandomClick } from "@/app/components/containers/sharedFunctions"
import { Shuffle } from "@mui/icons-material"

export const Random = () => {
	return (
		<button id="random" onClick={() => handleRandomClick()}>
			<Shuffle />
		</button>
	)
}

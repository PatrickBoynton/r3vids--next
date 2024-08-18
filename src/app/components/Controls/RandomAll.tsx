import { Shuffle } from "@mui/icons-material"
import { handleRandomAllClick } from "@/app/components/containers/sharedFunctions"

export const RandomAll = () => {
	return (
		<button onClick={() => handleRandomAllClick()}>
			<Shuffle />
		</button>
	)
}

import { handleRandomClick } from "@/app/components/containers/sharedFunctions"
import { AutoMode } from "@mui/icons-material"

export const Random = () => {
	return (
		<button id="random" onClick={() => handleRandomClick()}>
			<AutoMode />
		</button>
	)
}

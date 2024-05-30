import { useVideoStore } from "@/stores/videoStore"
import { ManageHistory } from "@mui/icons-material"

export const RandomPlayed = () => {
	const { setRandomPlayedVideo } = useVideoStore()
	return (
		<button id="random-played" onClick={() => setRandomPlayedVideo()}>
			<ManageHistory />
		</button>
	)
}

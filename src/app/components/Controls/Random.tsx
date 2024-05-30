import { Shuffle } from "@mui/icons-material"
import { useVideoStore } from "@/stores/videoStore"

export const Random = () => {
	const { setRandomVideo, setVideos, query, value } = useVideoStore()

	const handleRandomClick = () => {
		localStorage.removeItem("currentVideo")
		setRandomVideo(query, value)
		setVideos()
	}

	return (
		<button id="random" onClick={() => handleRandomClick()}>
			<Shuffle />
		</button>
	)
}

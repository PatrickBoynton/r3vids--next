import { Fullscreen } from "@mui/icons-material"
import { useVideoControlsStore } from "@/stores/videoControlsStore"

export const FullScreen = () => {
	const { vidRef, isFullScreen, setIsFullScreen } = useVideoControlsStore()

	const handleFullScreen = async () => {
		if (vidRef.current) {
			if (isFullScreen) {
				if (document.fullscreenElement) {
					await document.exitFullscreen()
				}
			} else {
				await vidRef.current.requestFullscreen()
			}
			setIsFullScreen(!isFullScreen)
		}
	}

	return (
		<button id="full-screen" onClick={handleFullScreen}>
			<Fullscreen />
		</button>
	)
}

"use client"
import { VolumeOff, VolumeUp } from "@mui/icons-material"
import { useVideoControlsStore } from "@/stores/videoControlsStore"

export const Volume = () => {
	const { isMuted, setIsMuted, vidRef } = useVideoControlsStore()
	const handleVolumeChange = () => {
		if (vidRef.current) {
			setIsMuted(!isMuted)
			vidRef.current.muted = !vidRef.current.muted
		}
	}
	return (
		<>
			<button id="mute" onClick={handleVolumeChange}>
				{!isMuted ? <VolumeUp /> : <VolumeOff />}
			</button>
			<input
				type="range"
				id="volume-bar"
				min="0"
				max="1"
				step="0.1"
				value="1"
				onChange={() => {}}
			/>
		</>
	)
}

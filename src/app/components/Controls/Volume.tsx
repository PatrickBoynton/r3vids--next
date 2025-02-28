"use client"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { VolumeOff, VolumeUp } from "@mui/icons-material"

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
				value={isMuted ? 0 : vidRef.current?.volume}
				onChange={e => {
					if(vidRef.current) {
						const volume = parseFloat(e.target.value)
						vidRef.current.volume = volume
						setIsMuted(volume === 0)
					}
				}
				}
				disabled={isMuted}
			/>
		</>
	)
}

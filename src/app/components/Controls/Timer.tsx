"use client"
import { useVideoStore } from "@/stores/videoStore"
import { convertDuration } from "@/app/components/containers/sharedFunctions"

export const Timer = () => {
	const { randomVideo, currentVideo } = useVideoStore()
	const randomVid = randomVideo?.duration as number
	// const currentVid = currentVideo?.duration as number
	// const currentPlayTime = currentVideo?.videoStatus.currentPlayTime as number
	const currentPlayTimeRandom = randomVideo?.videoStatus
		.currentPlayTime as number

	return (
		<>
			{convertDuration(currentPlayTimeRandom)}
			<input type="range" id="seek-bar" value="0" onChange={() => {}} />
			{convertDuration(randomVid)}
		</>
	)
}

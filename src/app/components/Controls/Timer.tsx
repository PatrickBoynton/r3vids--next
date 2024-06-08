"use client"
import { useVideoStore } from "@/stores/videoStore"
import { convertDuration } from "@/app/components/containers/sharedFunctions"

export const Timer = () => {
	const { randomVideo, currentVideo } = useVideoStore()
	const randomVid = randomVideo?.videoStatus?.currentPlayTime as number
	const currentVid = currentVideo?.videoStatus?.currentPlayTime as number

	return (
		<>
			{convertDuration(randomVid || currentVid)}
			<input type="range" id="seek-bar" value="0" onChange={() => {}} />
			{convertDuration(randomVid || currentVid)}
		</>
	)
}

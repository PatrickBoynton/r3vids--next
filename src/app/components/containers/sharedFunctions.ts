import agent from "@/agent"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { useVideoStore } from "@/stores/videoStore"
import { Video } from "@/types"

export const handleClick = async (video?: Video) => {
	if (video) {
		useVideoStore.getState().setCurrentVideo(video)
		useVideoStore.getState().updateVideo(video)
		useVideoStore.getState().setVideos()
		await agent.VideoNavigation.update(video)
	} else {
		useVideoStore.getState().setRandomVideo("IsPlayed", "true")
	}
}

export const handleRandomClick = (queryType?: string, queryValue?: string) => {
	useVideoControlsStore.getState().setIsPlaying(false)
	useVideoControlsStore.getState().setIsMuted(false)
	
	useVideoStore.getState().setRandomVideo(queryType, queryValue)
}

export const convertDuration = (duration: number) => {
	const hours = Math.floor(duration / 3600)
	const minutes = Math.floor((duration - hours * 3600) / 60)
	const seconds = duration - hours * 3600 - minutes * 60

	return duration
		? `${lessThanTen(hours)}:${lessThanTen(minutes)}:${seconds.toFixed(0)}`
		: "00:00"
}

export const lessThanTen = (value: number) =>
	value < 10 && value !== 1 ? `0${value}` : value

export const handleRandomAllClick = () => {
	useVideoControlsStore.getState().setIsPlaying(false)
	useVideoControlsStore.getState().setIsMuted(false)

	const query = useVideoStore.getState().query
	useVideoStore.getState().setRandomVideo(query)
}

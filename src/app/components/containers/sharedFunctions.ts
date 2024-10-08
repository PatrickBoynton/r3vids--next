import { Video } from "@/types"
import { useVideoStore } from "@/stores/videoStore"
import agent from "@/agent"

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
	const query = useVideoStore.getState().query
	useVideoStore.getState().setRandomVideo(query)
}

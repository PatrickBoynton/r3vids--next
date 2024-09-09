import { Video } from "@/types"
import { useVideoStore } from "@/stores/videoStore"

export const handleClick = (video?: Video) => {
	if (video) {
		useVideoStore.getState().setCurrentVideo(video)
	} else {
		useVideoStore.getState().setRandomVideo("IsPlayed", "true")

		const playedVideo = useVideoStore.getState().video as Video
		setState(playedVideo)
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

export const setState = (video: Video) => {
	if (video) {
		// useVideoStore.getState().setUrl(video.url)
		// useVideoStore.getState().setTitle(video.title)
	}
}

export const handleRandomAllClick = () => {
	useVideoStore.getState().setRandomAllVideo()
	const randomAllVideo = useVideoStore.getState().video as Video

	setState(randomAllVideo)
}

import { Video } from "@/types"
import { useVideoStore } from "@/stores/videoStore"

export const handleClick = (video?: Video) => {
	if (video) {
		setState(video)
	} else {
		useVideoStore.getState().setRandomPlayedVideo()

		const playedVideo = useVideoStore.getState().randomPlayedVideo as Video
		setState(playedVideo)
	}

	setVideos()
}

export const handleRandomClick = async () => {
	useVideoStore.getState().setRandomVideo()

	const randomVideo = useVideoStore.getState().randomVideo as Video

	if (randomVideo) {
		setState(randomVideo)
	}

	setVideos()
}

export const convertDuration = (duration: number) => {
	const hours = Math.floor(duration / 3600)
	const minutes = Math.floor((duration - hours * 3600) / 60)
	const seconds = duration - minutes * 60
	return duration ? `${hours}:${minutes}:${seconds.toFixed(0)}` : "00:00"
}

const setState = (video: Video) => {
	if (video) {
		useVideoStore.getState().setUrl(video.url)
		useVideoStore.getState().setTitle(video.title)
	}
}

const setVideos = () => {
	useVideoStore.getState().setVideos()
	useVideoStore.getState().setPlayedVideos()
}

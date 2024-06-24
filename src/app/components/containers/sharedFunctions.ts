import { Video } from "@/types"
import { useVideoStore } from "@/stores/videoStore"

export const handleClick = (video?: Video) => {
	console.log("video", video)
	if (video) {
		useVideoStore.getState().setUrl(video.url)
		useVideoStore.getState().setTitle(video.title)

		useVideoStore.getState().updateVideo(video)
		useVideoStore.getState().setVideos()
		useVideoStore.getState().setPlayedVideos()
		// useVideoStore.getState().setCurrentVideo(video)
	}
}

export const handleRandomClick = async () => {
	useVideoStore.getState().setRandomVideo()

	const randomVideo = useVideoStore.getState().randomVideo as Video
	if (randomVideo) {
		useVideoStore.getState().setUrl(randomVideo.url)
		useVideoStore.getState().setTitle(randomVideo.title)
	}

	useVideoStore.getState().setVideos()
	useVideoStore.getState().setPlayedVideos()
	// useVideoStore.getState().setCurrentVideo(randomVideo)
}

export const convertDuration = (duration: number) => {
	const minutes = Math.floor(duration / 60)
	const seconds = duration - minutes * 60
	return duration ? `${minutes}:${seconds.toFixed(2)}` : "00:00"
}

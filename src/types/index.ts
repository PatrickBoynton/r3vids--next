export type Video = {
	id: string
	title: string
	url: string
	image: string
	uploadDate: string
	duration: number
	videoStatus: IVideoStatus
}
export type IVideoStatus = {
	id: string
	played: boolean
	currentPlayTime: number
	playCount: number
	selectionCount: number
	isWatchLater: boolean
	lastPlayed: string
	video: Video | null
	videoId: string
}

export type IVideoNavigation = {
	id: string
	currentVideo?: Video
	previousVideo?: Video
}

export type CurrentVideo = {
	currentVideo: {
		currentVideo: Video
		videoStatus: IVideoStatus
	}
}

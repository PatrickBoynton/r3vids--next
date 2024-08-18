import { CurrentVideo, Video } from "@/types"
import { create } from "zustand"
import qs from "query-string"
import agent from "@/agent"

type VideoStore = {
	src: string
	title: string
	url: string
	image: string
	uploadDate: string
	currentPlayTime: number
	duration: number
	query: string
	value: string
	videos: Video[]
	playedVideos: Video[]
	randomVideo: Video | null
	currentVideo: CurrentVideo | Video | null
	randomPlayedVideo: Video | null
	randomAllVideo: Video | null
	setVideos: () => void
	setRandomVideo: (queryType?: string, queryValue?: string) => void
	setRandomAllVideo: () => void
	setPlayedVideos: () => void
	setRandomPlayedVideo: () => void
	setSrc: (src: string) => void
	setTitle: (title: string) => void
	updateVideo: (video: Video) => void
	resetVideoStatus: () => void
	setQuery: (query: string) => void
	setCurrentVideo: () => void
	setUrl: (url: string) => void
	setImage: (image: string) => void
	setUploadDate: (uploadDate: string) => void
	setDuration: (duration: number) => void
	setCurrentPlayTime: (currentPlayTime: number) => void
	createVideoNavigation: (video: Video) => void
}

export const useVideoStore = create<VideoStore>(set => ({
	src: "",
	title: "",
	url: "",
	image: "",
	uploadDate: "",
	currentPlayTime: 0,
	duration: 0,
	query: "",
	value: "",
	videos: [],
	playedVideos: [],
	randomVideo: null,
	randomPlayedVideo: null,
	randomAllVideo: null,
	currentVideo: null,

	setVideos: async () => {
		const videos: Video[] = await agent.Videos.list()
		const playedVideos = await agent.Videos.played()
		set({ videos, playedVideos })
	},

	setRandomVideo: async (queryType?: string, queryValue?: string) => {
		const query: any = {}

		if (queryType && queryValue) {
			query[queryType] = queryValue
		}

		const url = qs.stringifyUrl(
			{ url: "", query },
			{ skipEmptyString: true }
		)
		console.log("url", url)
		const randomVideo: Video = await agent.Videos.random(url)

		set(state => ({
			...state,
			randomVideo,
			currentVideo: randomVideo,
			url: randomVideo.url,
			title: randomVideo.title,
		}))

		await agent.Videos.update(randomVideo)
		await agent.VideoNavigation.update(randomVideo)
		await agent.Videos.list()
		await agent.Videos.played()
	},

	setPlayedVideos: async () => {
		const videos: Video[] = await agent.Videos.played()

		const playedVideos = videos.filter(
			(video: Video) => video.videoStatus.played
		)
		set(state => ({ ...state, playedVideos }))
	},

	setRandomPlayedVideo: async () => {
		const randomPlayedVideo: Video = await agent.Videos.randomPlayed()

		set(state => ({
			...state,
			randomPlayedVideo,
		}))

		await agent.Videos.update(randomPlayedVideo)
		await agent.VideoNavigation.update(randomPlayedVideo)
		await agent.Videos.list()
		await agent.Videos.played()
	},

	setSrc: (src: string) => set({ src }),

	setTitle: (title: string) => set({ title }),

	updateVideo: async (video: Video) => {
		await agent.Videos.update(video)
	},

	resetVideoStatus: async () => {
		await agent.Videos.delete()
		const playedVideos = await agent.Videos.played()
		set(state => ({ ...state, playedVideos, currentVideo: null }))
	},

	setQuery: (query: string) => set({ query }),

	setCurrentVideo: async () => {
		const currentVideo = await agent.VideoNavigation.get()

		if (currentVideo !== null)
			set(state => ({
				...state,
				currentVideo,
				url: currentVideo?.currentVideo.url,
				title: currentVideo?.currentVideo.title,
			}))
	},

	setUrl: (url: string) => set({ url }),

	setImage: (image: string) => set({ image }),

	setUploadDate: (uploadDate: string) => set({ uploadDate }),

	setDuration: (duration: number) => set({ duration }),

	setCurrentPlayTime: async (currentPlayTime: number) =>
		set({ currentPlayTime }),
	createVideoNavigation: async (video: Video) => {
		await agent.VideoNavigation.create(video)
	},
	setRandomAllVideo: async () => {
		const randomAllVideo: Video = await agent.Videos.randomAll()

		set(state => ({
			...state,
			randomAllVideo,
			currentVideo: randomAllVideo,
			url: randomAllVideo.url,
			title: randomAllVideo.title,
		}))

		await agent.Videos.update(randomAllVideo)
		await agent.VideoNavigation.update(randomAllVideo)
		await agent.Videos.list()
		await agent.Videos.played()
	},
}))

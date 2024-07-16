import mockAxios from "jest-mock-axios"
import { Video } from "@/types"
import agent from "@/agent"
import qs from "query-string"

jest.mock("axios", () => mockAxios)

afterEach(() => {
	mockAxios.reset()
})

describe("agent.Videos", () => {
	it("list fetches videos and returns data", async () => {
		const mockVideos: Video[] = [
			{
				id: "1",
				title: "Video 1",
				url: "url",
				image: "image",
				uploadDate: "01/01/24",
				duration: 100,
				videoStatus: {
					id: "1",
					played: false,
					currentPlayTime: 0,
					playCount: 0,
					isWatchLater: false,
					lastPlayed: "01/01/24",
					video: null,
					videoId: "1",
				},
			},
		]

		mockAxios.get.mockResolvedValue({ data: mockVideos })

		const result = await agent.Videos.list()
		expect(mockAxios.get).toHaveBeenCalledWith("/videos")

		expect(result).toEqual(mockVideos)
	})

	it("played fetches played videos and returns data", async () => {
		const mockVideos: Video[] = [
			{
				id: "1",
				title: "Video 1",
				url: "url",
				image: "image",
				uploadDate: "01/01/24",
				duration: 100,
				videoStatus: {
					id: "1",
					played: true,
					currentPlayTime: 0,
					playCount: 0,
					isWatchLater: false,
					lastPlayed: "01/01/24",
					video: null,
					videoId: "1",
				},
			},
		]

		mockAxios.get.mockResolvedValue({ data: mockVideos })

		const result = await agent.Videos.played()

		expect(mockAxios.get).toHaveBeenCalledWith("/videos/played")
		expect(result).toEqual(mockVideos)
	})

	it("random fetches random video and returns data", async () => {
		const mockVideo: Video = {
			id: "1",
			title: "Video 1",
			url: "url",
			image: "image",
			uploadDate: "01/01/24",
			duration: 100,
			videoStatus: {
				id: "1",
				played: false,
				currentPlayTime: 0,
				playCount: 0,
				isWatchLater: false,
				lastPlayed: "01/01/24",
				video: null,
				videoId: "1",
			},
		}

		mockAxios.get.mockResolvedValue({ data: mockVideo })

		const query = {}

		const url = qs.stringifyUrl(
			{ url: "", query },
			{ skipEmptyString: true }
		)

		const result = await agent.Videos.random(url)

		expect(mockAxios.get).toHaveBeenCalledWith("/videos/random")
		expect(result).toEqual(mockVideo)
	})

	it("randomPlayed fetches random played video and returns data", async () => {
		const mockVideo: Video = {
			id: "1",
			title: "Video 1",
			url: "url",
			image: "image",
			uploadDate: "01/01/24",
			duration: 100,
			videoStatus: {
				id: "1",
				played: false,
				currentPlayTime: 0,
				playCount: 0,
				isWatchLater: false,
				lastPlayed: "01/01/24",
				video: null,
				videoId: "1",
			},
		}

		const result = await agent.Videos.randomPlayed()

		expect(mockAxios.get).toHaveBeenCalledWith("/videos/random/played	")
		expect(result).toEqual(mockVideo)
	})
})

describe("agent.Navigation", async () => {
	const navigation = {
		id: "1",
		currentVideo: {
			id: "1",
			title: "Video 1",
			url: "url",
			image: "image",
			uploadDate: "01/01/24",
			duration: 100,
			videoStatus: {
				id: "1",
				played: false,
				currentPlayTime: 0,
				playCount: 0,
				isWatchLater: false,
				lastPlayed: "01/01/24",
				video: null,
				videoId: "1",
			},
		},
		previousVideo: null,
	}

	mockAxios.get.mockResolvedValue({ data: navigation })

	const result = await agent.VideoNavigation.get()
	expect(mockAxios.get).toHaveBeenCalledWith("/navigation")
	expect(result).toEqual(navigation)
})

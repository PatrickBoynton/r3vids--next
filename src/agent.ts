import axios, { AxiosResponse } from "axios"
import { IVideoStatus, Video, VideoNavigation } from "./types"

axios.defaults.baseURL = `http://192.168.1.13:5070/api`
// axios.defaults.withCredentials = true

const responseBody = (response: AxiosResponse) => response.data

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: object) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: object) =>
		axios.put<T>(url, body).then(responseBody),
	delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Videos = {
	list: () => requests.get<Video[]>("/videos"),
	played: () => requests.get<Video[]>("/videos/played"),
	random: (query?: string) => requests.get<Video>(`/videos/random${query}`),
	randomPlayed: () => requests.get<Video>("/videos/random/played"),
	update: (video: Video) =>
		requests.put<Video>(`/videos/${video.id}`, {
			id: video.id,
			title: video.title,
			url: video.url,
			image: video.image,
			uploadDate: video.uploadDate,
			duration: video.duration,
			videoStatus: video.videoStatus,
		}),
	search: (query: string) => requests.get<Video[]>(`/videos/search/${query}`),
	delete: () => requests.delete<Video>("/videos/reset"),
}

const VideoStatus = {
	list: () => requests.get<IVideoStatus[]>("/status"),
	status: (id: string) => requests.get<IVideoStatus>(`/status/${id}`),
}

const Navigation = {
	get: (id: string) => requests.get<VideoNavigation>(`/navigation/${id}`),
	update: (id: string) =>
		requests.put<VideoNavigation>(`/navigation/${id}`, {}),
}

const agent = { Videos, VideoStatus, Navigation }

export default agent

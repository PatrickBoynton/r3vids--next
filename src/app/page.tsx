import { Navbar } from "@/app/components/Navbar"
import VideoPlayer from "@/app/components/VideoPlayer"
import { VideosContainer } from "@/app/components/containers/VideosContainer"

export default function Home() {
	return (
		<div>
			<Navbar />
			<main className="grid grid-cols-2  gap-4 h-screen">
				<VideoPlayer />
				<VideosContainer type="videos" />
				<VideosContainer type="played" />
			</main>
		</div>
	)
}

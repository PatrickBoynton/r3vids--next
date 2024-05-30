import { Navbar } from "@/app/components/Navbar"
import VideoPlayer from "@/app/components/VideoPlayer"
import { VideosContainer } from "@/app/components/containers/VideosContainer"

export default function Home() {
	return (
		<div className="container">
			<Navbar />
			<main>
				<VideoPlayer />
				<VideosContainer type="videos" />
				<VideosContainer type="played" />
			</main>
		</div>
	)
}

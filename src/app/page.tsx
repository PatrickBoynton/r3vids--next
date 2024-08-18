import { Navbar } from "@/app/components/Navbar"
import VideoPlayer from "@/app/components/VideoPlayer"
import { VideosContainer } from "@/app/components/containers/VideosContainer"

export default function Home() {
	return (
		<div>
			<Navbar />
			<main className="grid grid-cols-3 gap-4 h-screen">
				<div className="col-span-2">
					<VideoPlayer />
				</div>
				<div className="col-span-1">
					<VideosContainer type="videos" />
				</div>
				<div className="col-span-3">
					<VideosContainer type="played" />
				</div>
			</main>
			<footer></footer>
		</div>
	)
}

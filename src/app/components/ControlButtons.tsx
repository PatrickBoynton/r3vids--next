"use client"
import { PlayPause } from "@/app/components/Controls/PlayPause"
import { Random } from "@/app/components/Controls/Random"
import { RandomPlayed } from "@/app/components/Controls/RandomPlayed"
import { Volume } from "@/app/components/Controls/Volume"
import { FullScreen } from "@/app/components/Controls/FullScreen"
import { ResetVideoStatus } from "@/app/components/Controls/ResetVideoStatus"
import { useVideoStore } from "@/stores/videoStore"
import { useEffect } from "react"
import AlarmAddIcon from "@mui/icons-material/AlarmAdd"
import { Timer } from "@/app/components/Controls/Timer"

export const ControlButtons = () => {
	const { randomVideo } = useVideoStore()
	useEffect(() => {}, [randomVideo])
	return (
		<div className="border-2 p-2 rounded">
			<PlayPause />
			<Random />
			<RandomPlayed />
			<ResetVideoStatus />
			<Timer />
			<Volume />
			<FullScreen />
			<button id="watch-later">
				<AlarmAddIcon />
			</button>
		</div>
	)
}

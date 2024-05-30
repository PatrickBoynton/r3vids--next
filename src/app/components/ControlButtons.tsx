import { PlayPause } from "@/app/components/Controls/PlayPause"
import { Random } from "@/app/components/Controls/Random"
import { RandomPlayed } from "@/app/components/Controls/RandomPlayed"
import { Timer } from "@/app/components/Controls/Timer"
import { Volume } from "@/app/components/Controls/Volume"
import { FullScreen } from "@/app/components/Controls/FullScreen"
import { ResetVideoStatus } from "@/app/components/Controls/ResetVideoStatus"

export const ControlButtons = () => {
	return (
		<div className="video-controls">
			<PlayPause />
			<Random />
			<RandomPlayed />
			<ResetVideoStatus />
			<Timer />
			<Volume />
			<FullScreen />
		</div>
	)
}

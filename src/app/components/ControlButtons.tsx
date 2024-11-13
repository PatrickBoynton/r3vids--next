import { PlayPause } from "@/app/components/Controls/PlayPause"
import { Random } from "@/app/components/Controls/Random"
import { RandomPlayed } from "@/app/components/Controls/RandomPlayed"
import { Volume } from "@/app/components/Controls/Volume"
import { FullScreen } from "@/app/components/Controls/FullScreen"
import { ResetVideoStatus } from "@/app/components/Controls/ResetVideoStatus"
import { Timer } from "@/app/components/Controls/Timer"
import { RandomAll } from "@/app/components/Controls/RandomAll"

export const ControlButtons = () => {
	return (
		<div className="border-2 p-2 rounded">
			<PlayPause />
			<RandomAll />
			<Random />
			<RandomPlayed />
			<ResetVideoStatus />
			<Timer />
			<Volume />
			<FullScreen />
		</div>
	)
}

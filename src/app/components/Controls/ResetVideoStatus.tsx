"use client"
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep"
import { useVideoStore } from "@/stores/videoStore"

export const ResetVideoStatus = () => {
	const { resetVideoStatus } = useVideoStore()

	return (
		<button id="reset" onClick={() => resetVideoStatus()}>
			<DeleteSweepIcon />
		</button>
	)
}

import {useVideoStore} from "@/stores/videoStore";
import {convertDuration, lessThanTen} from "@/app/components/containers/sharedFunctions";

jest.mock("@/stores/videoStore", () => ({
    useVideoStore: {
        getState: jest.fn().mockReturnValue({
            setUrl: jest.fn(),
            setTitle: jest.fn(),
            setVideos: jest.fn(),
            setPlayedVideos: jest.fn(),
            setRandomVideo: jest.fn(),
            setRandomPlayedVideo: jest.fn(),
        })
    }
}));

describe("setState", () => {
    it("should set url and title", () => {
        const {setState} = require("./sharedFunctions");
        const video = {
            url: "url",
            title: "Video Title"
        }

        setState(video);

        expect(useVideoStore.getState().setUrl).toHaveBeenCalledWith(video.url);
        expect(useVideoStore.getState().setTitle).toHaveBeenCalledWith(video.title);
    });
});

describe("setVideos", () => {
    it("should set videos and played videos", () => {
        const {setVideos} = require("./sharedFunctions");

        setVideos();

        expect(useVideoStore.getState().setVideos).toHaveBeenCalled();
        expect(useVideoStore.getState().setPlayedVideos).toHaveBeenCalled();
    });
});

describe("handleRandomClick", () => {
    it("should set random video", async () => {
        const {handleRandomClick} = require("./sharedFunctions");

        await handleRandomClick();

        expect(useVideoStore.getState().setRandomVideo).toHaveBeenCalled();
    });

    describe("handleClick", () => {
        it("should  set state with video", () => {
            const {handleClick} = require("./sharedFunctions");
            const video = {
                url: "url",
                title: "Video Title"
            };

            handleClick(video);

            expect(useVideoStore.getState().setUrl).toHaveBeenCalledWith(video.url);
            expect(useVideoStore.getState().setTitle).toHaveBeenCalledWith(video.title);
        });
    });

    it("should set random played video,", () => {
        const {handleClick} = require("./sharedFunctions");

        handleClick();

        expect(useVideoStore.getState().setRandomPlayedVideo).toHaveBeenCalled()
        expect(useVideoStore.getState().setUrl).toHaveBeenCalled();
        expect(useVideoStore.getState().setTitle).toHaveBeenCalled();
    });
});

describe("convertDuration", () => {
    it("should convert duration to hh:mm:ss format", () => {
        expect(convertDuration(0)).toBe("00:00");
        expect(convertDuration(30)).toBe("00:00:30");
        expect(convertDuration(600)).toBe("00:10:0");
        expect(convertDuration(3600)).toBe("1:00:0");
        expect(convertDuration(3661)).toBe("1:1:1");
    });
});

describe("lessThanTen", () => {
    it("should add 0 to values less than 10, and not equal to 1", () => {

        expect(lessThanTen(0)).toBe("00");
        expect(lessThanTen(1)).toBe(1);
        expect(lessThanTen(9)).toBe("09");
    });
});
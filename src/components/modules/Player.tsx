import Image from "next/image";


const Player = (props: any) => {
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (<div className="w-4/5 sm:flex sm:flex-row justify-between items-center">
        <div>
            {props.coverOfSong ? <Image
                src={props.coverOfSong}
                alt="Music Cover"
                width={120}
                height={120}
                className="m-auto"
            /> : <div className="w-[120px] h-[120px]">
            </div>}
        </div>
        <div className="w-full sm:w-3/4 m-auto max-sm:mt-4">
            <h2 className="mb-2">{props.currentSong}</h2>
            {props.audioSrc && (
                <audio
                    ref={props.audioRef}
                    src={props.audioSrc}
                    onTimeUpdate={props.handleTimeUpdate}
                    onEnded={() => props.setIsPlaying(false)}
                >
                    Your browser does not support the audio.
                </audio>
            )}
            <div className="flex flex-row items-center justify-between">
                <div>
                    <select value={props.playbackRate} onChange={props.handleSpeedChange} className="text-white border border-white rounded bg-gray-700 pl-4">
                        <option value={1}>1x</option>
                        <option value={1.2}>1.2x</option>
                        <option value={1.4}>1.4x</option>
                        <option value={2}>2x</option>
                    </select>
                </div>

                <div className="mx-2">
                    <span>{formatTime(props.currentTime)}</span>
                </div>

                <div className="w-3/4">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={props.progress}
                        onChange={props.handleProgressChange}
                        className="w-full"
                    />
                </div>

                <div className="mx-2">
                    <span>{formatTime(props.duration)}</span>
                </div>
            </div>
            <div className="flex justify-between w-40 items-center mt-2 mx-auto">
                <div className="text-white bg-sky-700 w-fit rounded p-1 items-center mx-auto !h-12 ">
                    <button onClick={props.togglePlayPause}>{props.isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                    }</button>
                </div>
            </div>
        </div>
    </div>)
}

export default Player;

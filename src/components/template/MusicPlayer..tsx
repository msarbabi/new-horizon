import { useEffect, useRef, useState } from "react";
import Player from "../modules/Player";
import MusicSelector from "../modules/MusicSelector";
import { parseBlob } from "music-metadata-browser";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentSong, setCurrentSong] = useState<string>("");
    const [coverOfSong, setCoverOfSong] = useState<string | null>(null);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [progress, setProgress] = useState<number>(0);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.addEventListener("loadedmetadata", () => {
            setDuration(audioRef.current?.duration || 0);
          });
        }
      }, [audioSrc]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioSrc(url);
            setCurrentSong(file.name);
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            setDuration(0);

            try {
                const metadata = await parseBlob(file);

                if(metadata.common.picture && metadata.common.picture.length > 0) {
                    const coverData = metadata.common.picture[0];
                    const coverBlob = new Blob([coverData.data], {type: coverData.format});
                    setCoverOfSong(URL.createObjectURL(coverBlob));
                } else {
                    setCoverOfSong(null);
                }
            } catch (error) {
                console.error("Error of reading metadata", error);
                setCoverOfSong(null);
            }
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const speed = parseFloat(e.target.value);
        setPlaybackRate(speed);
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        if (audioRef.current) {
            const newTime = (newProgress / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setProgress(newProgress);
            setCurrentTime(newTime);
        }
    };
    
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            setCurrentTime(currentTime);
            setProgress((currentTime / duration) * 100);
        }
    };

    return (<div className="lg:w-2/4 md:w-3/4 w-full h-fit min-h-40 py-3 mx-auto mt-20 bg-gray-700 text-white shadow-lg rounded flex justify-center items-center">
        {currentSong ? <Player
            currentSong={currentSong}
            coverOfSong={coverOfSong}
            isPlaying={isPlaying}
            progress={progress}
            audioSrc={audioSrc}
            currentTime={currentTime}
            duration={duration}
            audioRef={audioRef}
            playbackRate={playbackRate}
            togglePlayPause={togglePlayPause}
            handleSpeedChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSpeedChange(e)}
            handleProgressChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProgressChange(e)}
            handleTimeUpdate={handleTimeUpdate}
        /> : <MusicSelector
            handleFileUpload={handleFileUpload}
        />}
    </div>)
}

export default MusicPlayer;


const MusicSelector = (props: any) => {
    
    return <div>
        <input
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            id="music_file"
            type="file"
            accept="audio/*"
            onChange={props.handleFileUpload}
        />
    </div>
}

export default MusicSelector;
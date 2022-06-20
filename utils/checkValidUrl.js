const checkValidUrl = (songlink) => {
    const youtuShortLink = /https:\/\/youtu\.be\/[\w\_\-]+/
    const youtuLongLink = /https:\/\/www.youtube.com\/watch\?v=[\w\_\-]+[\S]+/
    const spotifyLink = /https:\/\/open\.spotify\.com\/track\/[\w\_\-]+[\S]+/

    if (songlink.match(youtuShortLink)) {
        return true
    }else if(songlink.match(youtuLongLink)){
        return true
    } else if(songlink.match(spotifyLink)){
        return true
    }

    return false
}

export default checkValidUrl
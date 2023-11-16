
const isolateArtistId = (formInput) => {
    let trimBeginning = formInput.replace('https://open.spotify.com/artist/', '')
    let artistId = trimBeginning.split("?").shift()
    return artistId
}

export default isolateArtistId
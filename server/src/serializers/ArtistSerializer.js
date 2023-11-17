import spotifyClient from "../apiClient/spotifyClient.js"

class ArtistSerializer {
    static async getData(artists) {

        const serializedArtists = await Promise.all(artists.map(async (artist) => {
            const { accessToken, spotifyArtistId } = artist
            artist.data = await spotifyClient.getTileData(accessToken, spotifyArtistId)
            return artist
            })
        )
        return serializedArtists
    }
}

export default ArtistSerializer
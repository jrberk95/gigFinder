import spotifyClient from "../apiClient/spotifyClient.js"

class ArtistSerializer {
    static async getData(artists, refreshToken) {

        const accessToken = await spotifyClient.getNewAccessToken(refreshToken)

        const serializedArtists = await Promise.all(artists.map(async (artist) => {
            const { spotifyArtistId } = artist
            artist.data = await spotifyClient.getTileData(accessToken, spotifyArtistId)
            return artist
            })
        )
        return serializedArtists
    }
}

export default ArtistSerializer
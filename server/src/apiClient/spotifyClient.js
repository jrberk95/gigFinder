import got from "got"

class spotifyClient {

    static async getNewAccessToken(refreshToken) {
        try {
            const response = await got.post('https://accounts.spotify.com/api/token', {
                form: {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: process.env.SPOTIFY_CLIENT_ID,
                    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                },
                responseType: 'json',
            });
            
            const newAccessToken = response.body.access_token;

            return newAccessToken
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getArtistData(accessToken, artistId) {
        const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`
        const relatedArtistsUrl = `https://api.spotify.com/v1/artists/${artistId}/related-artists`
        const topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`

        try {
        const artistApiResponse = await got(artistUrl, {
            headers: {
            Authorization: `Bearer ${accessToken}`
            },
        })
        const relatedArtistsApiResponse = await got(relatedArtistsUrl, {
            headers: {
            Authorization: `Bearer ${accessToken}`
            }
        })
        const topTracksApiResponse = await got(topTracksUrl, {
            headers: {
            Authorization: `Bearer ${accessToken}`
            }
        })
        const artistData = await JSON.parse(artistApiResponse.body)
        const relatedArtists = await JSON.parse(relatedArtistsApiResponse.body)
        const topTracks = await JSON.parse(topTracksApiResponse.body)
        return {topTracks, relatedArtists, artistData}
        } catch (err) {
            return err
        }
    }
}
export default spotifyClient
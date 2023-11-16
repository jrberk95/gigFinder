// import got from "got"

// class spotifyClient {

//     static async getNewAccessToken(refreshToken) {
//         try {
//             const response = await got.post('https://accounts.spotify.com/api/token', {
//                 form: {
//                     grant_type: 'refresh_token',
//                     refresh_token: refreshToken,
//                     client_id: process.env.SPOTIFY_CLIENT_ID,
//                     client_secret: process.env.SPOTIFY_CLIENT_SECRET,
//                 },
//                 responseType: 'json',
//             });
            
//             const newAccessToken = response.body.access_token;

//             return newAccessToken
//         } catch (error) {
//             console.log(error.message);
//         }
//     }

//     // static async getRandomTrackIdByPlaylist(accessToken, playlistId, total) {
//     //     try {
//     //         let trackList = []
//     //         let offset = 0
//     //         while (trackList.length < total) {
//     //             const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=100`
//     //             const apiResponse = await got(url, {
//     //                 headers: {
//     //                     Authorization: `Bearer ${accessToken}`
//     //                 }
//     //             })
//     //             const responseParsed = await JSON.parse(apiResponse.body)
//     //             responseParsed.items.forEach(item => {
//     //                 trackList.push(item)
//     //             })
//     //             offset += 100
//     //         }
//     //         const randomTrack = trackList[Math.floor(Math.random()*trackList.length)]
//     //         return randomTrack.track.id
//     //     } catch (err) {
//     //         console.log(err.message)
//     //         return { errors: err.message }
//     //     }
//     // }

//     static async getTrackData(accessToken, trackId) {
//         try {
//             const basicDataUrl = `https://api.spotify.com/v1/tracks/${trackId}`
//             const apiResponseBasic = await got(basicDataUrl, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             })
//             const basicData = await JSON.parse(apiResponseBasic.body)

//             const advancedDataUrl = `https://api.spotify.com/v1/audio-features/${trackId}`
//             const apiResponseAdvanced = await got(advancedDataUrl, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             })
//             const advancedData = await JSON.parse(apiResponseAdvanced.body)

//             const artistNames = basicData.artists.map(artist => {
//                 return artist.name
//             })
//             const artistIds = basicData.artists.map(artist => {
//                 return artist.id
//             })

//         } catch (err) {
//             console.log(err.message)
//             return { errors: err.message }
//         }
//     }
// }

// export default spotifyClient
import React, {useState, useEffect} from "react"
import GigTile from "./GigTile"

const GigIndex = (props) => {

    const [gigs, setGigs] = useState([])

    const getAllGigs = async () => {
        try {  
            const response = await fetch("/api/v1/gigs")
            const gigData = await response.json()
            setGigs(gigData.gigs)
        } catch (err) {
            console.log("ERROR IN FETCH:", err)
        }
    }
    
    useEffect(() => {
        getAllGigs()
    }, [])

    let availableGigs

    if (gigs) {
        availableGigs = gigs.map((gig) => {
            return <GigTile gig={gig} key={gig.id}/>
        })
    }
    console.log(gigs)

    return (
    <>
        <h1 className="cell page-header">Available Gigs</h1>
        {availableGigs}
    </>
    )

}

export default GigIndex
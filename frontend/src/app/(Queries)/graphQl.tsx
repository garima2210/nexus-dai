import React from "react"
import { gql } from "@apollo/client"

const GET_BRIDGES = gql`
 bridges(where: {id_in: ["0x14630e0428B9BbA12896402257fa09035f9F7447"]}) {
    bridgeContract
    id
    name
    rewardsEarned
    savingLimit
} 
`
export { GET_BRIDGES }

//All our graphql here:
const axios = require('axios')

const { GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema } = require('graphql')

//Rocket type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
})

//Launch type

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        land_success: { type: GraphQLBoolean },
    })
})

//Root query (endpoints that resolve our data)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) { //This is where we get our data
                return axios.get('https://api.spacexdata.com/v4/launches')
                    .then(res => res.data)
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery
})
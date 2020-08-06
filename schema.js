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

//Rocket type
const LinksType = new GraphQLObjectType({
    name: 'Links',
    fields: () => ({
        patch: { type: GraphQLString },
        reddit: { type: GraphQLString },
        flickr: { type: GraphQLString }
    })
})

//Launch type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        mission_id: { type: new GraphQLList(GraphQLString) }, //LIST OF ANYTHING ['HHFH'] IF IS NUMBERS IS INT
        launch_year: { type: GraphQLInt },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        details: { type: GraphQLString },
        rocket: { type: RocketType }, //not working 
        links: { type: LinksType } //not working 
    })
})

//Root query (endpoints that resolve our data)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: { //list of array of all  the launches
            type: new GraphQLList(LaunchType),
            resolve(parent, args) { //This is where we get our data
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data)
            }
        },
        //Get an specific launch
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                //make a single request to get that simple launch:
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data)
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery
})
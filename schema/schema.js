const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Album {
  _id: ID!
  name: String
  albumArtist: String
  playTime: Int
  contributingArtists: String
  coverArt: String
  year: Int
  userID: ID
}
type Track {
  _id: ID!
  title: String

  albumID: ID
  albumArtist: String
  artist: String
  trackLength: Int
  trackNumber: Int
  coverArt: String
  genre: String
  userID: ID
}

type Query {
  getAlbum(id: ID!): Album
  getAlbumsByUser: [Album]
  getTracksByUser: [Track]
  getTrack(id: ID!): Track
  getTracksByAlbum(id: ID!): [Track]
}

type Mutation {
  createAlbum(name: String!, albumArtist: String, playTime: Int, contributingArtists: String, coverArt: String, year: Int): Album
  updateAlbum(id: ID!, name: String, albumArtist: String, playTime: Int, contributingArtists: String, coverArt: String, year: Int): Album
  deleteAlbum(id: ID!): Album
  createTrack(title: String!, albumID: ID, albumArtist: String, artist: String, trackLength: Int, trackNumber: Int, coverArt: String, genre: String): Track
  updateTrack(id: ID!, title: String, albumID: ID, albumArtist: String, artist: String, trackLength: Int, trackNumber: Int, coverArt: String, genre: String): Track
  deleteTrack(id: ID!): Track
}
`);

module.exports = schema;

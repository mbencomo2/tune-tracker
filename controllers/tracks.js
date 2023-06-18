const Track = require("../model/track");

const trackResolvers = {
  getTracksByUser: async (args, context) => {
    // #swagger.tags = ['Tracks']
    try {
      const id = context.userID;
      return await Track.find({ userID: id.split("|")[1] });
    } catch (err) {
      console.log(err);
      throw new Error("Error retrieving tracks by userID");
    }
  },
  getTrack: async (args, context) => {
    // #swagger.tags = ['Tracks']
    try {
      return await Track.findById(args.id);
    } catch (err) {
      console.log(err);
      throw new Error("Error retrieving track");
    }
  },
  getTracksByAlbum: async (args, context) => {
    // #swagger.tags = ['Tracks']
    try {
      return await Track.find({ albumID: args.id });
    } catch (err) {
      console.log(err);
      throw new Error("Error retrieving tracks by album");
    }
  },
  createTrack: async (args, context) => {
    // #swagger.tags = ['Tracks']
    try {
      const id = context.auth.user.sub;
      const track = new Track({
        ...args,
        userID: id.split(" ")[1]
      });
      return await track.save();
    } catch (err) {
      console.log(err);
      throw new Error("Error creating track");
    }
  },
  updateTrack: async (args, context) => {
    // #swagger.tags = ['Tracks']
    try {
      return await Track.findByIdAndUpdate(args.id, ...args, { new: true });
    } catch (err) {
      console.log(err);
      throw new Error("Error updating track");
    }
  },
  deleteTrack: async ({ id }, context) => {
    // #swagger.tags = ['Tracks']
    try {
      return await Track.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw new Error("Error deleting track");
    }
  }
};

module.exports = trackResolvers;

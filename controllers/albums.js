const Album = require("../model/album");

const albumResolvers = {
  getAlbum: async (args, context) => {
    // #swagger.tags = ['Albums']
    try {
      return await Album.findById(args.id);
    } catch (err) {
      console.log(err);
      throw new Error("Error retrieving Album");
    }
  },
  getAlbumsByUser: async (args, context) => {
    // #swagger.tags = ['Albums']
    try {
      const id = context.userID.split("|")[1]; // Access userID from the context object
      return await Album.find({ userID: id });
    } catch (err) {
      console.log(err);
      throw new Error("Error retrieving Albums");
    }
  },
  createAlbum: async (args, context) => {
    // #swagger.tags = ['Albums']
    try {
      const id = context.userID; // Access userID from the context object
      const album = new Album({
        ...args,
        userID: id.split("|")[1]
      });
      return await album.save();
    } catch (err) {
      console.log(err);
      throw new Error("Error creating Album");
    }
  },
  updateAlbum: async (args, context) => {
    // #swagger.tags = ['Albums']
    try {
      return await Album.findByIdAndUpdate(args.id, { ...args }, { new: true });
    } catch (err) {
      console.log(err);
      throw new Error("Error updating Album");
    }
  },
  deleteAlbum: async ({ id }, context) => {
    // #swagger.tags = ['Albums']
    try {
      return await Album.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw new Error("Error deleting Album");
    }
  }
};

module.exports = albumResolvers;

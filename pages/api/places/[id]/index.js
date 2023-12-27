import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // Validate the 'id' to ensure it's a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ status: `Invalid ID` });
  }

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);

      if (!place) {
        return response.status(404).json({ status: `Not found` });
      }

      response.status(200).json(place);
    } catch (error) {
      response.status(500).json({ status: `Server error` });
    }
  }

  if (request.method === "PATCH") {
    try {
      const updatedPlace = await Place.findByIdAndUpdate(
        id,
        { $set: request.body },
        { new: true } // Returns the updated object
      );

      if (!updatedPlace) {
        return response.status(404).json({ status: `Place not found` });
      }

      response.status(200).json({ status: `Place updated`, updatedPlace });
    } catch (error) {
      response.status(500).json({ status: `Server error` });
    }
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ status: `Place successfully deleted.` });
  }
}

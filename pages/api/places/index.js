import dbConnect from "@/db/connect";
import Place from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const places = await Place.find();
      return response.status(200).json(places);
    }
    if (request.method === "POST") {
      const placeData = request.body;
      await Place.create(placeData);
      return response.status(201).json({ status: "Place added" });
    } else {
      return response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(400).json({ error: error.message });
  }
}

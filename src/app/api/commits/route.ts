import { SERVER_URL } from "@/lib/utils";
import axios from "axios";


export async function GET(req: any) {

    try {
        const response = await axios.get(`${SERVER_URL}/commits/0`);
        return Response.json(response.data);

    } catch (error) {
        console.error(error);
        return Response.json([]);
    }


}
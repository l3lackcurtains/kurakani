import { SERVER_URL } from "@/lib/utils";
import axios from "axios";

export async function POST(req: any) {
    try {
        const commit = await req.json();
        // Use graphql
        await axios.post(`${SERVER_URL}/commit`, commit);
        return Response.json({
            message: 'Commit created successfully'
        });
    } catch (error: any) {
        return Response.json({
            message: 'Error creating commit',
            error: error.toString()
        });
    }
}
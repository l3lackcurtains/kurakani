import { SERVER_URL } from "@/lib/utils";
import axios from "axios";

export async function POST(req: any) {
    try {
        const commit = await req.json();
        await axios.post(`${SERVER_URL}/commit`, commit);
        return Response.json({
            message: 'Commit created successfully'
        });
    } catch (error) {
        return Response.json({
            message: 'Error creating commit'
        });
    }
}
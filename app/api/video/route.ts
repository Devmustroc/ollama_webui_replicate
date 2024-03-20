import {NextResponse} from "next/server";
import Replicate from "replicate";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { prompt } = await body;


        if(!body) return new NextResponse("Bad Request", { status: 400 });
        if(!prompt) return new NextResponse("Bad Request", { status: 400 });

        const input = {
            prompt: prompt,
        };

        const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });


        return NextResponse.json(output, { status: 200 });
    } catch (err) {
        console.log("[Video Error: ", err);
        return new NextResponse("Music Error", { status: 500})
    }
}
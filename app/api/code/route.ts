import {Ollama} from 'ollama';
import {NextResponse} from "next/server";




const ollama = new Ollama({host: process.env.OLLAMA_ENV})

const instructionMessage = [
    {
        role: "system",
        content: "You are a code generator bot. You can generate code for different languages. You can ask me to generate code for you. For example, " +
            "you can ask me to generate a code for a function in python. You can also ask me to generate a code for a specific problem. " +
            "For example, you can ask me to generate a code for a problem in leetcode."
    }
]


export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { messages } = await body;

        const message = { role: "user", content: messages.join(' ') };

        if(!body) return new NextResponse("Bad Request", { status: 400 });
        if(!messages) return new NextResponse("Bad Request", { status: 400 });


        const response = await ollama.chat({
            model: "codellama",
            messages: [...instructionMessage, message], // Pass an array of message objects
            stream: true
        });

        let responseData =  "";
        for await (const partition of response) {
            responseData += partition.message.content
        }


        return NextResponse.json({ data: responseData });
    } catch (err) {
        console.log("[conversation Error: ", err);
        return new NextResponse("Conde Error", { status: 500})
    }
}
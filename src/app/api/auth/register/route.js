import bcrypt from 'bcryptjs';
import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import {getCorsHeaders} from "@/app/api/options";

export async function POST(request) {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const {email, name, password, role} = await request.json();

    try {
        await connectToDB();
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return new Response(JSON.stringify({message: "User already exists"}), {status: 409, headers});
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        return new Response(JSON.stringify({message: "User registered successfully"}), {status: 201, headers});
    } catch (error) {
        console.error(error);
        return new Response("Failed to save new user", {status: 500, headers})
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};
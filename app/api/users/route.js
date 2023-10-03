import { connectDB } from "@/lib/connectDB"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { name, email } = await req.json()
        await connectDB()
        const user = await User.create({ name, email })
        return NextResponse.json({ message: "User created!", user }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error Trying..." }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        await connectDB()
        const users = await User.find()
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error Trying..." }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        await connectDB()
        const id = req.nextUrl.searchParams.get('id')
        console.log(id);
        const deleted = await User.findByIdAndDelete(id)

        return NextResponse.json(deleted, { status: 200 })
    } catch (error) {

    }
}
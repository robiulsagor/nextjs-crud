import User from "@/models/user"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
    const { id } = params
    const { name, email } = await req.json()
    try {
        const user = await User.findByIdAndUpdate(id, { $set: { name, email } }, { new: true })
        return NextResponse.json({ user, message: "success" })
    } catch (error) {
        return NextResponse.json("err ", error)
    }
}

export async function GET(req, { params }) {
    const { id } = params
    try {
        const user = await User.findById(id)
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json("err ", error)
    }
}
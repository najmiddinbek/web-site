import { connectMongoDB } from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newYangidarsQoldirish: newDarsQoldirish } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { newDarsQoldirish });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const { topiclar } = await Topic.findOne({ _id: id });
  return NextResponse.json({ topiclar }, { status: 200 });
}
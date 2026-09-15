import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const topics = await prisma.topic.findMany();

    return Response.json({
      success: true,
      count: topics.length,
      topics,
    });
  } catch (error) {
    console.error("Database error:", error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}
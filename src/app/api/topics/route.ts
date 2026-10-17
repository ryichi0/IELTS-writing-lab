import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const topic = await prisma.topic.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      topic,
    });
  } catch (error) {
    console.error("Get topic error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to get topic",
      },
      { status: 500 }
    );
  }
}


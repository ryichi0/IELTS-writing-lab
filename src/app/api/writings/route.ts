import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { content, topicId, userId, status } = body;

    if (!content || !topicId || !userId || !status) {
      return Response.json(
        {
          success: false,
          message: "content, topicId and userId are required",
        },
        { status: 400 }
      );
    }

    const writing = await prisma.writing.create({
      data: {
        content,
        topicId,
        userId,
        wordCount: content.trim().split(/\s+/).length,
        status,
      },
    });

    return Response.json({
      success: true,
      writing,
    });
  } catch (error) {
    console.error("Create writing error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create writing",
      },
      { status: 500 }
    );
  }
}
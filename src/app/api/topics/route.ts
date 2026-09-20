import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const topics = await prisma.topic.findMany();

    return Response.json({
      success: true,
      topics,
    });
  } catch (error) {
    console.error("Get topics error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to get topics",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const topic = await prisma.topic.create({
      data: {
        title: "Bar chart: Household expenditure",
        description:
          "The chart shows the percentage of household expenditure on different categories in a particular country.",
        type: "BAR_CHART",
      },
    });

    return Response.json({
      success: true,
      topic,
    });
  } catch (error) {
    console.error("Create topic error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create topic",
      },
      { status: 500 }
    );
  }
}
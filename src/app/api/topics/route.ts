import { prisma } from "@/lib/prisma";

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
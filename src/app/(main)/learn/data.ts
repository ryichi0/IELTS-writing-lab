export type LearningTopic = {
  id: string;
  title: string;
  slug: string;
  description: string;
  readingTime: number;
};

export type LearningCategory = {
  id: string;
  title: string;
  topics: LearningTopic[];
};

export const LEARNING_HUBـCATEGORIES: LearningCategory[] = [
  {
    id: "general-tips",
    title: "General Tips",
    topics: [
      {
        id: "introduction-to-ielts-task-1",
        title: "Introduction to IELTS Academic Task 1",
        slug: "introduction-to-ielts-academic-task-1",
        description:
          "Understand the task criteria, word count requirements, and how to structure your response effectively.",
        readingTime: 5,
      },
      {
        id: "writing-a-high-scoring-overview",
        title: "Writing a High-Scoring Overview",
        slug: "writing-a-high-scoring-overview",
        description:
          "Learn how to write an effective overview by identifying the main trends and key features without listing raw figures.",
        readingTime: 6,
      },
    ],
  },

  {
    id: "bar-charts",
    title: "Bar Charts",
    topics: [
      {
        id: "analyzing-complex-bar-charts",
        title: "Analyzing Complex Bar Charts",
        slug: "analyzing-complex-bar-charts",
        description:
          "Learn how to group multiple categories logically and make clear comparisons between different parameters.",
        readingTime: 8,
      },
    ],
  },

  {
    id: "process-diagrams",
    title: "Process Diagrams",
    topics: [
      {
        id: "flowcharts-and-process-diagrams",
        title: "Flowcharts and Process Diagrams",
        slug: "flowcharts-and-process-diagrams",
        description:
          "Learn how to describe each stage using sequence markers, appropriate vocabulary, and passive voice structures.",
        readingTime: 10,
      },
    ],
  },

  {
    id: "line-graphs",
    title: "Line Graphs",
    topics: [
      {
        id: "describing-trends-on-line-graphs",
        title: "Describing Trends on Line Graphs",
        slug: "describing-trends-on-line-graphs",
        description:
          "Learn useful verbs and adverbs for accurately describing rises, falls, fluctuations, and significant changes.",
        readingTime: 7,
      },
    ],
  },

  {
    id: "tables",
    title: "Tables",
    topics: [
      {
        id: "interpreting-complex-data-tables",
        title: "Interpreting Complex Data Tables",
        slug: "interpreting-complex-data-tables",
        description:
          "Learn how to identify extremes, highlight significant differences, and organize large amounts of statistical information.",
        readingTime: 9,
      },
    ],
  },
];
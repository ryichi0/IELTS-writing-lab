type WritingStatus = "submitted" | "draft";
type WritingAction = "review" | "continue";

export type WritingAttempt = {
  date: string;
  topic_title: string;
  word_count: string;
  status: WritingStatus;
  score: string;
  action: WritingAction;
};

export const MY_WRITINGS : WritingAttempt[]= [
  {
    date: "Oct 24, 2025",
    topic_title: "Water consumption by sector in selected countries",
    word_count: "172 words",
    status: "submitted",
    score: "band 7.5",
    action: "review"
  },
  {
    date: "Oct 22, 2025",
    topic_title: "UK domestic recycling patterns from 2010 to 2020",
    word_count: "165 words",
    status: "submitted",
    score: "Band 7.0",
    action: "review"
  },
  {
    date: "Oct 18, 2025",
    topic_title: "Automobile manufacturing productivity in Europe",
    word_count: "120 words",
    status: "draft",
    score: "-",
    action: "continue"
  },
  {
    date: "Oct 15, 2025",
    topic_title: "Global internet usage trends by age group",
    word_count: "184 words",
    status: "submitted",
    score: "band 8.0",
    action: "review"
  },
  {
    date: "Oct 09, 2025",
    topic_title: "Comparison of public transport usage in NYC and London",
    word_count: "154 words",
    status: "submitted",
    score: "band 6.5",
    action: "review"
  },
  {
    date: "Sep 30, 2025",
    topic_title: "Hydroelectric power plant operations in Scandinavia",
    word_count: "98 words",
    status: "draft",
    score: "-",
    action: "continue"
  },
  {
    date: "Sep 22, 2025",
    topic_title: "Visitor numbers at three major natural history museums",
    word_count: "191 words",
    status: "submitted",
    score: "band 7.5",
    action: "review"
  },
]
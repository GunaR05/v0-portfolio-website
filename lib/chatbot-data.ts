export interface QAPair {
  question: string
  answer: string
}

export const chatbotQA: QAPair[] = [
  {
    question: "What's your tech stack?",
    answer: "I specialize in Python, TypeScript, and the full AI/ML stack. For ML systems, I work with LangChain, OpenSearch, FAISS, PyTorch, and various LLM providers. On the backend, I build with FastAPI, Node.js, Kafka, and Redis. For infrastructure, I deploy on AWS (EKS, Lambda, S3) and Azure (AKS). Frontend work includes React, Next.js, and TypeScript."
  },
  {
    question: "Tell me about Aiera",
    answer: "At Aiera, I build LLM inference pipelines and RAG-based hybrid retrieval systems using LangChain and OpenSearch. I led the MCP server development for the official Aiera x Anthropic integration, enabling Claude for Financial Services to access verified market intelligence covering 45,000+ annual investor events. I've scaled ML inference on AWS EKS to 10,000+ requests/min with 35% P95 latency reduction."
  },
  {
    question: "What roles interest you?",
    answer: "I'm targeting Senior Software Engineer, Staff MLE, and AI/ML Engineer roles. I'm particularly interested in positions involving LLM systems, RAG pipelines, ML infrastructure, and distributed systems. I'm open to opportunities in Boston, NYC, SF, Seattle, or remote positions. I thrive in environments where I can bridge AI research and production systems."
  },
  {
    question: "Biggest achievement?",
    answer: "Contributing to the official Aiera x Anthropic partnership stands out. I built the MCP server that integrates Aiera's trusted market intelligence into Claude for Financial Services, covering 45,000+ annual events across 13,000+ global companies and 100+ macro entities. It's now part of Anthropic's Financial Analysis Solution used by institutional investors on Wall Street."
  },
  {
    question: "Why hire you?",
    answer: "I bridge AI research and production systems effectively. With 5+ years across Aiera, Flipkart, Airtel, and Ola, I've shipped production ML at scale: 10K+ req/min inference, 110+ orders/sec e-commerce, sub-50ms fraud detection. I understand both the ML/AI side and distributed systems engineering, which means I can take models from notebooks to production reliably."
  }
]

export function getAnswer(question: string): string {
  const qa = chatbotQA.find(q => q.question === question)
  return qa?.answer || "I don't have information about that yet. Feel free to reach out directly via the contact form!"
}

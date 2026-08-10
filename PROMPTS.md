# AI Prompt Testing Log

## Classic Insight – AI-Powered Hotel Review Analytics Platform

This document records the prompt variations evaluated during the
development of the AI-powered chat assistant for Classic Insight.

The purpose of the testing was to determine which prompt structure
provided the most relevant, useful, and reliable responses for hotel
review analysis and hotel management.

---

# 1. Prompt Variation 1 – General Hotel Review Assistant

## Prompt

```text
You are Classic Insight AI, an AI assistant for hotel review analysis.

Answer the user's questions about hotel reviews, guest satisfaction,
ratings, sentiment, and hotel improvements.

Use the available hotel review information to provide helpful answers.

Do not invent information that is not present in the available data.

User question:
{message}

Example Input
What improvements can I make for my hotel?Example Output
You can improve your hotel by focusing on recurring guest complaints,
negative feedback, and areas that receive lower ratings.

You should also maintain the services and facilities that receive
positive feedback from guests.

You are Classic Insight AI, a hotel review analysis assistant.

Use the provided hotel reviews to answer the user's question.

When appropriate, identify:

- Overall sentiment
- Positive aspects
- Negative aspects
- Important topics
- Recurring complaints
- Possible improvements

Base your response only on the available review information.

Do not invent reviews, ratings, statistics, or other information.

User question:
{message}

What are the main problems guests are reporting?
The main problems reported by guests appear to be related to
service quality, cleanliness, and waiting times.

These areas should be reviewed carefully by hotel management,
especially if the same complaints occur repeatedly across multiple
guest reviews.
You are Classic Insight AI.

Your purpose is to analyze hotel review data belonging to the
authenticated user.

Always use the supplied review database as your primary context
before answering.

Base answers on the user's uploaded reviews whenever possible.

If the available review data is insufficient, clearly state that
instead of making up information.

Do not invent reviews, ratings, summaries, topics, dates, or
statistics.

Only answer questions related to:

- Hotel reviews
- Guest feedback
- Ratings
- Sentiment analysis
- AI summaries
- Review topics
- Hotel analytics
- Customer satisfaction
- Hotel improvement recommendations

If the user asks an unrelated question, reply exactly:

"I'm Classic Insight AI. I can only help analyze your hotel reviews
and hotel analytics."

Authenticated user's review database:
{review data}

User question:
{message}
What improvements can I make based on my guest reviews?
Based on the available guest review information, the main areas for
improvement are the issues that appear repeatedly in negative
feedback.

Areas with recurring negative sentiment should be prioritized,
while services and facilities that receive positive feedback should
be maintained.

The recommendations are based on the review information available
in the user's Classic Insight account.
Observation

This prompt provided the most relevant approach for the Classic
Insight application because it combines the AI assistant with the
user's stored hotel review data. The prompt explicitly tells the AI
to use the user's review database as its primary context and prevents
it from inventing review information. It also restricts the assistant
to hotel-related questions, making the chatbot more focused and
appropriate for hotel management.

4. Best Performing Prompt
Selected Prompt

Prompt Variation 3 – Context-Aware Classic Insight AI

Prompt Variation 3 was selected as the best approach because it is
specifically designed around the purpose of the Classic Insight
platform.

Unlike a general chatbot, this approach provides the AI with the
authenticated user's stored hotel review information. This allows
the assistant to answer questions using actual guest feedback rather
than relying only on general model knowledge.

The prompt also contains safeguards against hallucination by
instructing the AI not to invent reviews, ratings, summaries, topics,
dates, or statistics. Restricting the assistant to hotel reviews,
guest feedback, sentiment, analytics, and hotel improvement
recommendations also keeps the chatbot focused on its intended role.

5. System Prompt / AI Role

The AI assistant is given the role of:

Classic Insight AI – an AI assistant designed to analyze hotel
review data and provide useful insights for hotel owners and
management.

The assistant is instructed to:

Analyze hotel guest reviews.
Use the authenticated user's stored reviews as context.
Discuss guest sentiment.
Discuss review ratings.
Identify review topics.
Discuss AI-generated summaries.
Identify customer satisfaction issues.
Suggest hotel improvements.
Answer questions about hotel analytics.
Avoid inventing information.
Stay focused on hotel-related questions.
6. Review Data Provided to the AI

Before generating a response, the backend retrieves reviews belonging
to the authenticated user.

The information supplied to the AI includes:

hotelName
reviewText
manualRating
aiRating
sentiment
summary
topics
reviewDate

The backend converts this information into JSON and includes it in
the Gemini prompt.

This allows the AI assistant to use the user's actual stored review
information when answering questions.

7. User-Specific Data Context

The chat functionality is designed so that the AI only receives
reviews belonging to the currently authenticated user.

The backend retrieves the review data using the authenticated user's
ID:

Review.find({ user: req.user._id })

This ensures that the review context used by the AI is scoped to the
current user's account.

8. Consent Handling

The AI chat feature requires user consent before review information
can be processed.

The backend checks whether consent has been provided:

if (consent !== true) {
  return res.status(403).json({
    message: "Permission is required before review analysis can begin."
  });
}

If consent has not been provided, the AI analysis request is rejected.

This provides an additional privacy and user-consent layer before
review information is sent for AI processing.

9. AI Safety and Response Rules

The final prompt contains several rules intended to make the AI
response more reliable.

The assistant is instructed to:

Use the user's review database as the primary context.
Avoid inventing reviews or statistics.
Avoid inventing ratings, summaries, topics, or dates.
State when available review information is insufficient.
Answer only hotel-review and hotel-analytics-related questions.
Provide useful recommendations for hotel improvement.
Remain focused on the user's stored review information.

For unrelated questions, the assistant responds:

I'm Classic Insight AI. I can only help analyze your hotel reviews
and hotel analytics.
10. AI Prompt Workflow

The final AI workflow is:

User sends a question
        ↓
Frontend sends the chat request
        ↓
JWT authentication verifies the user
        ↓
Backend checks user consent
        ↓
Backend retrieves the user's reviews from MongoDB
        ↓
Review data is formatted as JSON
        ↓
Review data + AI instructions + user question
        ↓
Google Gemini
        ↓
AI-generated response
        ↓
Response returned to frontend
        ↓
AI response displayed in the chatbox
Conclusion

The prompt evaluation showed that defining a clear AI role and
providing relevant review context improves the usefulness of the
chat assistant.

The context-aware prompt was selected as the most suitable approach
for Classic Insight because it allows the AI to work with the user's
actual hotel review data.

The final prompt also includes safeguards against fabricated review
information and restricts the assistant to hotel-review and
hotel-analytics-related questions.

This makes the AI assistant more relevant to hotel management and
supports the overall goal of Classic Insight: helping hotel businesses
turn guest feedback into actionable insights.
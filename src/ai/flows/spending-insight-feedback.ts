'use server';
/**
 * @fileOverview A Genkit flow for providing AI-generated feedback and insights on student spending habits.
 *
 * - spendingInsightFeedback - A function that provides personalized financial feedback.
 * - SpendingInsightFeedbackInput - The input type for the spendingInsightFeedback function.
 * - SpendingInsightFeedbackOutput - The return type for the spendingInsightFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpendingInsightFeedbackInputSchema = z.object({
  timePeriod: z.string().describe('The time period for which spending insights are requested (e.g., "monthly", "weekly", "last 30 days", "all-time").'),
  totalBudget: z.number().describe('The student\'s total budget for the specified time period.'),
  categoryBudgets: z.record(z.string(), z.number()).describe('An object mapping spending categories to their respective budget limits for the time period.'),
  spendingRecords: z.array(z.object({
    category: z.string().describe('The category of the spending (e.g., "Food", "Books", "Entertainment").'),
    amount: z.number().describe('The amount spent in this record.'),
    date: z.string().datetime().describe('The date and time of the spending in ISO 8601 format.'),
    vendor: z.string().optional().describe('The vendor where the spending occurred.'),
  })).describe('An array of individual spending records for the specified time period.'),
});
export type SpendingInsightFeedbackInput = z.infer<typeof SpendingInsightFeedbackInputSchema>;

const SpendingInsightFeedbackOutputSchema = z.object({
  overallFeedback: z.enum(['Excellent Control', 'Warning', 'Overspending']).describe('An overall assessment of the student\'s spending behavior.'),
  explanation: z.string().describe('A detailed explanation of the student\'s spending patterns, highlighting strengths and weaknesses. Include analysis of spending frequency if patterns are visible.'),
  suggestions: z.array(z.string()).describe('Actionable suggestions for improving financial decisions.'),
  categoryInsights: z.array(z.object({
    category: z.string().describe('The spending category.'),
    spent: z.number().describe('Total amount spent in this category.'),
    budget: z.number().optional().describe('Budget allocated for this category, if available.'),
    status: z.enum(['Under Budget', 'On Budget', 'Slightly Over Budget', 'Significantly Over Budget']).describe('Status of spending relative to budget for this category.'),
    comment: z.string().describe('Specific feedback or observations for this category.'),
  })).describe('Specific insights and feedback for each spending category, including all categories with spending or a budget.'),
});
export type SpendingInsightFeedbackOutput = z.infer<typeof SpendingInsightFeedbackOutputSchema>;

export async function spendingInsightFeedback(input: SpendingInsightFeedbackInput): Promise<SpendingInsightFeedbackOutput> {
  return spendingInsightFeedbackFlow(input);
}

const spendingInsightFeedbackPrompt = ai.definePrompt({
  name: 'spendingInsightFeedbackPrompt',
  input: {schema: SpendingInsightFeedbackInputSchema},
  output: {schema: SpendingInsightFeedbackOutputSchema},
  prompt: `You are an expert financial advisor named CampusSpend AI, specialized in helping students manage their finances. Your goal is to analyze the provided spending data and offer personalized, actionable feedback and insights.\n\nAnalyze the student's spending habits for the {{timePeriod}} period.\n\nHere's the student's financial context:\nTotal Budget for {{timePeriod}}: {{totalBudget}}\nCategory Budgets: {{{json categoryBudgets}}}\n\nHere are the student's spending records for the {{timePeriod}}:\n{{{json spendingRecords}}}\n\nBased on this data, provide:\n1.  An \`overallFeedback\` that summarizes their spending behavior. Choose one from 'Excellent Control', 'Warning', or 'Overspending'.\n2.  A detailed \`explanation\` of their spending patterns, highlighting areas of strength and areas that need attention. Consider their total spending relative to their total budget, and category spending relative to category budgets. Also, analyze spending frequency if patterns emerge from the provided records.\n3.  A list of \`suggestions\` for improvement. These should be practical and actionable.\n4.  \`categoryInsights\` for each spending category, detailing actual spent vs. budget, status (e.g., 'Under Budget', 'Slightly Over Budget', 'Significantly Over Budget'), and specific comments. Ensure that all categories with spending or budget are included in the \`categoryInsights\` array.\n\nStrictly return the output in JSON format, conforming to the \`SpendingInsightFeedbackOutputSchema\`.`,
});

const spendingInsightFeedbackFlow = ai.defineFlow(
  {
    name: 'spendingInsightFeedbackFlow',
    inputSchema: SpendingInsightFeedbackInputSchema,
    outputSchema: SpendingInsightFeedbackOutputSchema,
  },
  async input => {
    const {output} = await spendingInsightFeedbackPrompt(input);
    if (!output) {
      throw new Error('No output received from AI for spending insights.');
    }
    return output;
  }
);

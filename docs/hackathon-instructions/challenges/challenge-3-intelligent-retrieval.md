# Challenge 3: Intelligent Retrieval and Evaluation

## Overview
This is the final logic layer. It takes the "Rules" (from Challenge 1) and the "Facts" (from Challenge 2) and acts as an auditor to determine if the product complies with the regulations for a given question.

## Objectives
1.  **Synthesize** the outputs from the previous two steps.
2.  **Evaluate** whether the extracted product information satisfies the AMAS regulatory criteria.
3.  **Justify** the decision with a clear chain of thought and specific citations.

## Inputs
*   **AMAS Rules JSON**: Output from Challenge 1.
*   **Product Facts JSON**: Output from Challenge 2.
*   **Target Question**: The specific ESG question to answer.

## Output Format
Your solution should produce a comprehensive compliance report, which might include:
-   **Assessment**: A clear boolean (Yes/No) or status indicating compliance.
-   **Reasoning**: A detailed explanation of *why* the product meets or fails the criteria, referencing both the rule and the extracted facts.
-   **Evidence**: Specific citations (page numbers, text snippets) from the prospectus that support the decision.
-   **Confidence**: An optional score indicating the certainty of the assessment.

## Implementation Tips
*   **Chain of Thought (CoT)**: Prompt the LLM to "think step-by-step". First, list the requirements, then list the product features, then compare them.
*   **Citation**: It is critical that the answer links back to the *source* (Prospectus). Hallucinations are not acceptable in a compliance context.
*   **Missing Information**: If the prospectus does *not* mention a feature, the answer should likely be "No" or "Information not found", rather than a guess.

## Recommended Tools
*   **Azure OpenAI (GPT-4o)**: For the complex reasoning task.
*   **Prompt Engineering**: Use techniques like Few-Shot Learning to show the model how to format the "Reasoning" field.

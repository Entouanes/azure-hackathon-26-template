# Challenge 1: AMAS Regulation Analysis

## Overview
The goal of this challenge is to build a system that can understand and extract specific regulatory requirements from the AMAS (Asset Management Association Switzerland) self-regulation document.

The output of this challenge will serve as the "ground truth" or "rule set" against which financial products will be evaluated in Challenge 3.

## Objectives
1.  **Ingest** the AMAS regulation document (PDF or Text).
2.  **Retrieve** the relevant sections of the regulation for a specific ESG-related question.
3.  **Reformulate** the regulatory requirement into a clear, concise summary that an AI can use as a checklist or criteria.

## Inputs
*   **AMAS Self-Regulation Document**: provided in the `data/` folder.
*   **AMAS Questions**: A list of questions (e.g., "Is the product qualified as Best-in-Class?").

## Output Format
Your solution should produce a structured representation of the regulatory rule, which may include:
-   **Question Metadata**: The ID and text of the question being analyzed.
-   **Rule Summary**: A synthesized, clear explanation of the requirements derived from the regulation text.
-   **Traceability**: References or snippets of the original text used to generate the summary.

## Implementation Tips
*   **chunking**: How you split the regulation document matters. Sections in regulations are often hierarchical.
*   **Context window**: You might need to retrieve multiple non-contiguous sections to get the full definition of a term.
*   **Prompt Engineering**: When asking the LLM to summarize the rule, explicitly ask it to focus on *criteria* and *requirements* rather than general descriptions.

## Recommended Tools
*   **Azure AI Search**: For indexing and retrieving relevant regulation chunks.
*   **Azure OpenAI (GPT-4o)**: For synthesizing the retrieved chunks into a clear rule summary.

# Challenge 2: Source Data Preprocessing (Prospectus)

## Overview
Financial prospectuses are large, complex PDF documents containing information about multiple sub-funds and products. The goal of this challenge is to accurately identify and extract only the information relevant to a *specific* product mentioned in the input query.

## Objectives
1.  **Ingest** a fund prospectus (PDF).
2.  **Identify** where the specific product (Fund Name/ISIN) is discussed within the document.
3.  **Extract** the relevant text sections describing the investment policy, ESG strategy, and exclusions for that specific product.

## Inputs
*   **Fund Prospectus**: provided in the `data/` folder.
*   **Product Name**: The specific financial product to extraction information for.

## Output Format
Your solution should produce a structured collection of facts extracted from the prospectus, for example:
-   **Context**: The specific document and product being analyzed.
-   **Extracted Knowledge**: Relevant text segments or data points associated with the product.
-   **Metadata**: Page numbers, confidence scores, or location markers for each extraction to ensure traceability.

## Implementation Tips
*   **Document Structure**: Prospectuses often have a "General" section (applies to all funds) and "Specific" sections (applies to one fund). You may need to extract *both* to get the full picture.
*   **Ambiguity**: Ensure you are not extracting information belonging to a similar-sounding but different fund in the same document.
*   **Filtering**: If the document covers 10 sub-funds, effectively filtering out the 9 irrelevant ones is key to reducing noise for the Reasoning Engine.

## Recommended Tools
*   **Azure Document Intelligence**: For layout analysis and understanding document structure.
*   **Azure AI Search**: Hybrid retrieval (Keyword + Vector) is powerful for finding specific product names combined with concepts like "investment policy".

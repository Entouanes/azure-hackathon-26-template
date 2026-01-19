# Copilot Instructions for Azure Search + OpenAI Demo

## Project Overview
This repository implements a Retrieval Augmented Generation (RAG) application using Azure OpenAI and Azure AI Search.
- **Backend:** Python (Quart)
- **Frontend:** React (TypeScript, Vite, FluentUI)
- **Hackathon Frontend:** React 19 (TanStack Start, Tailwind CSS, shadcn/ui) - *For compliance assessments*
- **Infrastructure:** Bicep (Azure Developer CLI `azd`)
- **Ingestion:** Python scripts (`prepdocslib`)

## Architecture & Code Organization
- **Backend Entry:** `app/backend/app.py` (Quart app)
- **RAG Logic:** `app/backend/approaches/`
  - `retrievethenread.py`: Simple Ask approach
  - `chatreadretrieveread.py`: Chat approach (query rewriting + history)
- **Data Ingestion:** `app/backend/prepdocslib/` (Shared library for local & cloud ingestion)
  - **Important:** `app/functions/` bundles a copy of `prepdocslib`. Run `python scripts/copy_prepdocslib.py` after modifying `prepdocslib`.
- **Frontend:** `app/frontend/src/`
  - `api/`: API client
  - `components/`: React components
  - `pages/`: Main views (Chat, Ask)
- **Hackathon Frontend:** `app/hackathon-frontend/`
  - Specialized UI for compliance assessments usage.
  - Stack: React 19, TanStack Start, Tailwind CSS, shadcn/ui.


## Key Workflows & Commands
- **Local Development:**
  - Run app: `./app/start.sh` (or `.ps1`) - Sets up venv and starts backend/frontend.
  - Frontend dev: `cd app/frontend && npm run dev`
  - Hackathon Frontend dev: `cd app/hackathon-frontend && npm run dev` (Runs on port 3000)
  - Backend dev: `cd app/backend && quart run`
- **Data Ingestion:**
  - Place files in `data/`
  - Run: `./scripts/prepdocs.sh` (or `.ps1`)
- **Testing:**
  - Run all tests: `pytest` (Context: `tests/`)
  - Integration: `tests/test_app.py`
  - E2E: `tests/e2e.py` (Uses Playwright)
  - Mocks: `tests/conftest.py`
- **Deployment:**
  - Provision & Deploy: `azd up`
  - Deploy code only: `azd deploy`

## Conventions & Patterns
- **Python Style:**
  - **Do NOT** use single underscores (`_`) for private members. (Exception to standard Python convention).
  - Type hints are enforced in `app/backend` and `scripts`, but NOT in `tests`.
  - Use `ruff` and `black` for formatting.
- **Configuration:**
  - `azd` environment variables map to `infra/main.parameters.json` and `infra/main.bicep`.
  - New variables: Update `infra/`, `.azdo/pipelines`, `.github/workflows`, and `app/backend/prepdocs.py` (if needed).
- **RAG Implementation:**
  - Approaches inherit from `app/backend/approaches/approach.py`.
  - Prompts are stored in `.prompty` files or JSON in `app/backend/approaches/prompts/`.

## References
- See `AGENTS.md` for detailed coding agent instructions.
- See `README.md` for general setup and troubleshooting.

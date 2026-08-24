# NEET Community — GenAI / ML Service

Home for **generative-AI** work on the NEET platform. This is not a runtime service the app calls directly — the backend (`apps/backend`) owns the customer-facing AI endpoints. The GenAI team owns everything **behind** that boundary: how we prompt the model, how we evaluate outputs, how we ship prompt bundles, and how we harden the system against wrong answers.

> **Everything on this track is generative-AI-first.** We consume LLMs (Anthropic / OpenAI); we don't train classical ML models. Small utilities (embeddings for dedupe, a topic classifier as a fallback) are fine, but the center of gravity is prompt engineering + evals + guardrails around GenAI.

## What we own

- **AI Doubt Solver** — system prompt design, NEET-tutor persona, math/LaTeX rendering rules, refusal policies for out-of-scope questions, streaming behavior.
- **AI Question Generation** — prompts + structured outputs (`pydantic` schemas) that produce NEET-style MCQs from `(subject, chapter, topic, difficulty, type, count)`, with per-syllabus grounding via RAG.
- **AI Question Validation** — automated scoring for correctness, ambiguity, duplicates, option quality, explanation quality, NEET relevance. Uses an **LLM-as-judge** panel with disagreement escalation to human review.
- **AI Test Generation** — assembles test blueprints from question pools with distribution constraints; explains its picks.
- **Weak-topic recommendation** — LLM summarizes a student's attempt history into a "next-quiz brief" that the quiz builder uses; small embeddings model handles topic similarity.
- **Eval harness** — gold sets, LLM-as-judge scorers, regression reports; **prompt changes cannot ship without a green eval**.
- **Guardrails** — jailbreak resistance, PII scrubbing, content-safety filter, refusal patterns.
- **RAG pipeline** — chunk NEET syllabus + reference material, embed, index, retrieve on generation to keep questions on-syllabus.

## Layout

```
services/ml/
├── src/
│   ├── generation/         # Question / test generation — prompts + structured output
│   ├── validation/         # LLM-as-judge scoring; duplicate detection
│   ├── recommendation/     # Weak-topic briefs, next-quiz assembly
│   ├── embeddings/         # Vector index for RAG + dedupe
│   ├── eval/               # Gold sets, judges, regression reports
│   └── pipelines/          # Offline batch jobs (index refresh, backfills, eval runs)
├── prompts/                # Versioned prompt bundles (source of truth for what backend ships)
├── notebooks/              # Exploration; not prod
├── data/                   # Small gold sets + eval fixtures (git-lfs for large corpora)
├── tests/
├── pyproject.toml
└── README.md
```

## Stack

- **Python** 3.11
- **anthropic** + **openai** SDKs (provider-agnostic wrapper)
- **pydantic** for structured LLM outputs
- **tenacity** for retries, **httpx** for transport
- **sentence-transformers** + **faiss** (or Mongo Atlas vector search) for RAG/dedupe
- **pytest** + a tiny LLM-eval harness in `src/eval/`
- **jupyter** for exploration

## Prompt & config workflow

1. All prompts live under `services/ml/prompts/` as versioned files (`v1.doubt-solver.md`, `v2.doubt-solver.md`, …).
2. When you change a prompt, bump the version filename and update `prompts/manifest.json` to point at the new version.
3. Backend loads the current version from a **shared prompt bundle** — for MVP that's a JSON file this repo publishes; later it can move to a remote config store.
4. **Every prompt change ships with an eval run.** The eval report is attached to the PR. A prompt PR without an eval delta is a blocker.

## Eval

`src/eval/` runs the current prompt bundle against gold sets and produces:

- **Per-scenario pass/fail**
- **Aggregate metrics** (accuracy, correctness, refusal-rate, ambiguity, latency)
- **Regression table** vs. the last committed run

CI runs the smoke eval on every PR; the full eval runs nightly on `develop`.

## Integration with the app

Two patterns:

1. **Runtime (low-latency).** The GenAI team ships a prompt bundle + config. The backend (`apps/backend/src/services/ai/`) loads it and calls the provider directly. The backend never invents prompts.
2. **Batch / offline.** `services/ml/src/pipelines/` writes results back into Mongo (embeddings on `Question`, `nextQuizBrief` on `User`). Backend reads at request time.

The contract for both is documented in [docs/API_CONTRACT.md](../../docs/API_CONTRACT.md).

## Local setup

```bash
cd services/ml
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env       # then fill in provider keys
pytest -q
```

Run a single eval:

```bash
python -m src.eval.run --suite doubt-solver --limit 10
```

## Rules of engagement

- **No fine-tuning without the lead's sign-off** — we optimize prompts + retrieval first.
- **No prompt change without eval** — the PR must show what changed, in numbers.
- **Never send user PII to the provider** — the backend scrubs before calling; verify in your evals that scrub happens.
- **Never trust the model on correctness** — validation always runs before AI content becomes trusted (`validated=true` in the DB).
- **Don't put secrets in prompts** — the prompt file is committed to Git.
- **Deterministic where possible** — validation and judge calls use `temperature=0`. Generation may use higher temperature; document the choice.

## Owners

See [docs/TEAM_ASSIGNMENTS.md](../../docs/TEAM_ASSIGNMENTS.md).

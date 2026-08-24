"""Entrypoint for eval runs.

Usage:
    python -m src.eval.run --suite doubt-solver --limit 10

Placeholder skeleton. Real implementation loads the prompt bundle from
services/ml/prompts/, runs each item in the gold set through the provider,
scores with an LLM-as-judge, and writes a report to $EVAL_OUT_DIR.
"""

from __future__ import annotations

import argparse
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--suite", required=True, choices=["doubt-solver", "question-generation", "question-validation"])
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--out", type=Path, default=Path("data/eval-runs"))
    args = parser.parse_args()

    print(f"[eval] TODO — run suite={args.suite} limit={args.limit} → {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

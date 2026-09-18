# 📚 NEET Community — Smart Revision Module (`HSR-88`)

> A retention-driven, structured revision system built for NEET 2026 aspirants to systematically review concepts, track weak areas, and maintain high study momentum through spaced repetition and confidence ratings.

---

## 📌 1. WHAT is this project?

The **Smart Revision Module** is a dedicated frontend sub-system within the **NEET Community Web Application**. It gives medical aspirants a clear, scientific roadmap to revise the entire NEET syllabus (Physics, Chemistry, Botany, and Zoology) instead of relying on unstructured rereading.

### Core Capabilities:
- **Revision Hub (`/revision`):** Central dashboard showing overall syllabus completion, revision score, and daily streaks.
- **Subjectwise Explorer (`/revision/subjects`):** High-level breakdown of progress across all 4 subjects.
- **Chapter Drill-Down (`/revision/subjects/:subjectId`):** Chapter-level tracking with status badges (*Not Started*, *In Progress*, *Completed*).
- **Interactive Topic Revision (`/revision/chapters/:chapterId`):** Focused revision interface with concise bullet notes, key formula sheets, an interactive 5-level emoji confidence rating (`😟` to `😊`), and one-click "Mark as Revised".
- **Progress Analytics (`/revision/progress`):** Visual metrics, weak topics identifier, and historical timeline of past revision sessions.

---

## 🎯 2. WHY was it built?

### The Problem:
- **The "Forgetting Curve":** NEET aspirants cover over 97 chapters across 4 subjects. Without active recall, memory decays within days.
- **Lack of Visibility:** Students often don't know *which* topics they are weak in or *what* they should revise today.
- **Overwhelming UI:** Traditional test portals overwhelm students with complex navigation rather than focused study sessions.

### The Solution:
- **Targeted Revision:** Replaces passive reading with active tracking and confidence scoring.
- **Gamified Consistency:** Day streak tracker with dynamic fire intensity encourages daily study habits.
- **Clean Developer Architecture:** Modular, decoupled React components with clear interfaces ready for seamless backend API integration.

---

## 📂 3. WHERE is everything located?

All work for ticket `HSR-88` is organized modularly under `apps/web/src/`:

```text
apps/web/src/
├── components/
│   └── revision/
│       ├── RevisionProgressCard.tsx   # Circular progress ring, topics count & score stats
│       └── RevisionStreak.tsx         # Gamified streak card with dynamic fire colors
│
├── pages/
│   ├── Dashboard.tsx                  # Main entry page (updated with Revision sidebar nav)
│   └── revision/
│       ├── RevisionHub.tsx            # /revision — Hub overview & quick pathways
│       ├── SubjectRevision.tsx        # /revision/subjects — Subject progress cards
│       ├── ChapterRevision.tsx        # /revision/subjects/:subjectId — Chapters & progress
│       ├── TopicRevision.tsx          # /revision/chapters/:chapterId — Study notes & confidence rating
│       └── RevisionProgress.tsx       # /revision/progress — Analytics, weak topics & timeline
│
└── App.tsx                            # Router configuration with lazy-loaded revision routes

## 🚀 How to Run It

Follow these simple steps to run and test the project on your local machine:

### 📋 Prerequisites
Make sure you have the following installed:
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **Git**: ([Download Git](https://git-scm.com/))
- **Terminal**: PowerShell, Bash, or VS Code integrated terminal

---

### Step 1: Clone the Repository
Open your terminal and clone the repository:
```bash
git clone https://github.com/Vinayak1806/HSR-88-Revision.git
cd HSR-88-Revision

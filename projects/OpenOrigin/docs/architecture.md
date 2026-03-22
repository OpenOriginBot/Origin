# OpenOrigin Architecture v0

## Principles

- Executive-assistant-oriented operating system for client work
- Client-first structure, with projects nested under clients as needed
- Agent-friendly boundaries between planning, execution, and reporting
- Clear service separation between UI, API, and data

## Suggested domain model

- Client
- Project
- Task
- Deliverable
- Conversation
- Agent
- Assignment
- Update

## Suggested next milestones

1. Establish monorepo and local development flow
2. Build auth and workspace shell
3. Model clients, projects, and tasks in database
4. Add delegation workflows and agent run tracking
5. Connect Supabase and deploy to Vercel

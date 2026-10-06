---
name: agent-craft
description: Read and change this Craft CMS site's content and schema through the `agent-craft` CLI (happycog/craft-skill) — sections, entry types, fields, field layouts, entries, drafts, assets, volumes, users, user groups, addresses and sites. Use when the user asks to inspect, create, update or delete any of these, wants to know what IDs/handles exist, or asks for content or schema changes that would otherwise mean clicking through the control panel or hand-editing config/project YAML.
---

# agent-craft

`agent-craft` boots this project's Craft install in-process and runs one operation per call, printing JSON. It goes through Craft's own APIs, so validation, relations and project config are handled the same way the control panel handles them.

## Running it

It lives in the DDEV web container (installed by `.ddev/web-build/Dockerfile.agent-craft`), because it needs the `db` host.

- Inside the container (`ddev claude`): `agent-craft <command> [args]`
- On the host: `ddev exec agent-craft <command> [args]`

Check with `command -v agent-craft`; if it's missing, use the `ddev exec` form. If that also fails, DDEV is probably stopped or the image predates the Dockerfile — ask the user to run `ddev restart` rather than working around it.

## Finding commands and arguments

The CLI's own help is the reference. Read it rather than guessing:

- `agent-craft --help` lists every command.
- `agent-craft <command> --help` shows that command's parameters, types, required/optional, and usage rules (e.g. Matrix block keys). Read it before the first use of a command in a session.

Don't follow the `SKILLS/*.md` docs in the upstream repo: they describe an older HTTP API (`/api/...` routes and a `skills` plugin), not this CLI.

## Conventions

- Results go to stdout as JSON. Errors go to stderr as JSON, with exit codes `1` (operation failed), `2` (bad arguments), `3` (Craft couldn't boot). Add `-v`/`-vv` to get the exception message/trace.
- Pass values as flags (`--title="…"`). Structured values use bracket notation; single-quote the whole argument so the shell doesn't glob the brackets: `'--blocks[new1][type]=text'`.
- For arrays, use comma-separated values (`--sectionIds=4,5`) or explicit indices (`'--images[0]=12' '--images[1]=34'`). Don't repeat empty brackets (`'--x[]=4' '--x[]=5'`): despite the help text, in 0.0.2 only the last value survives.
- Look IDs up first (`sections/list`, `entry-types/list`, `fields/list`, `field-layouts/get`, `sites/list`, `volumes/list`) instead of assuming them.
- Responses include `editUrl`s. After creating or changing something, give the user the control panel link so they can review it.

## Schema changes and project config

Creating or changing sections, entry types, fields, field layouts, user groups, etc. writes `config/project/*.yaml`, just like doing it in the control panel. That's expected:

- Never hand-edit `config/project/` YAML. Make the change through `agent-craft`.
- Afterward, summarize what changed (`git status config/project`) so the user can review and commit it.
- These changes only make sense locally (`allowAdminChanges` is off outside dev). They reach other environments through project config on deploy.

## Destructive operations

`sections/delete`, `fields/delete`, `entry-types/delete` and similar remove content along with schema, permanently. Confirm with the user before running any delete, and say what will be lost (e.g. how many entries are in the section). For edits to live content, prefer the draft workflow (`drafts/create` → `drafts/update` → `drafts/apply`) when the user wants to review before publishing.

#!/bin/bash
# Claude Code statusline: context bar, model, session cost, session name (if set).
input=$(cat)

# One jq call; each field on its own line, in order.
{
  read -r session_name
  read -r model
  read -r used
  read -r cost
} < <(jq -r '
  (.session_name // ""),
  (.model.display_name // .model.id // ""),
  (.context_window.used_percentage // 0),
  (.cost.total_cost_usd // 0)
' <<<"$input")

reset=$'\033[0m'
dim=$'\033[38;5;245m'

# --- context progress bar (10 segments, muted purple, shaded texture) ---
used_int=$(printf '%.0f' "$used")
filled=$(( used_int / 10 ))
[ "$filled" -gt 10 ] && filled=10
fill_c=$'\033[38;5;139m'   # muted lavender for used segments
empty_c=$'\033[38;5;60m'   # dim slate purple for the remaining track
bar="${fill_c}"
for i in $(seq 1 10); do
  [ "$i" -eq $(( filled + 1 )) ] && bar="${bar}${empty_c}"
  if [ "$i" -le "$filled" ]; then bar="${bar}█"; else bar="${bar}░"; fi
done
bar="${bar}${reset}"

# Percentage color by threshold: calm below 50, amber to 80, red above.
if   [ "$used_int" -ge 80 ]; then pct_c=$'\033[38;5;203m'
elif [ "$used_int" -ge 50 ]; then pct_c=$'\033[38;5;214m'
else                               pct_c=$fill_c
fi

# --- session cost (computed by Claude Code with current pricing) ---
cost=$(printf '%.2f' "$cost")

line="${bar} ${pct_c}${used_int}% CTX${reset}"
[ -n "$model" ] && line="${line}   ${model}"
line="${line}   ${dim}~\$${cost}${reset}"
[ -n "$session_name" ] && line="${line}   ${dim}${session_name}${reset}"
printf '%s\n' "$line"

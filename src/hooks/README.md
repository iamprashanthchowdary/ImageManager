# hooks/

Shared React hooks used by **two or more** features. This is distinct from `src/lib/`, which is React-free — a hook belongs here, not there.

If only one feature needs a hook, it lives in that feature's own `hooks/` folder (`src/features/<name>/hooks/`) instead. Promote it here only when a second feature genuinely needs the same logic — don't pre-emptively generalize a feature-local hook on the guess that something might reuse it later.

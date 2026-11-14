#!/usr/bin/env python3
"""Scan the research tree for credential-shaped strings.

Prints only the file, line number, pattern name and the masked length of a hit —
never the value itself. Read-only.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.dirname(HERE)

# (pattern name, compiled regex, risk note)
PATTERNS = [
    ("mapbox_token", re.compile(r"\b(pk|sk|tk)\.[A-Za-z0-9._-]{20,}"),
     "Mapbox access token"),
    ("aws_access_key_id", re.compile(r"\bAKIA[0-9A-Z]{16}\b"), "AWS access key id"),
    ("aws_secret", re.compile(r"aws_secret_access_key\s*[=:]\s*['\"]?[A-Za-z0-9/+=]{30,}"),
     "AWS secret access key"),
    ("google_api_key", re.compile(r"\bAIza[0-9A-Za-z_-]{35}\b"), "Google API key"),
    ("github_pat", re.compile(r"\b(gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b"),
     "GitHub token"),
    ("openai_key", re.compile(r"\bsk-[A-Za-z0-9]{32,}\b"), "OpenAI-style secret key"),
    ("anthropic_key", re.compile(r"\bsk-ant-[A-Za-z0-9_-]{20,}\b"), "Anthropic API key"),
    ("stripe_secret", re.compile(r"\b(sk|rk)_live_[A-Za-z0-9]{20,}\b"), "Stripe live secret key"),
    ("slack_token", re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{10,}\b"), "Slack token"),
    ("sendgrid_key", re.compile(r"\bSG\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b"), "SendGrid key"),
    ("private_key_block", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"), "PEM private key"),
    ("pgp_private", re.compile(r"-----BEGIN PGP PRIVATE KEY BLOCK-----"), "PGP private key"),
    ("bearer_token", re.compile(r"[Bb]earer\s+[A-Za-z0-9._-]{24,}"), "bearer token"),
    ("basic_auth_url", re.compile(r"://[A-Za-z0-9._%-]+:[^/\s@\"']{6,}@"), "credentials in a URL"),
    ("jwt", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b"),
     "JSON Web Token"),
    ("generic_assignment", re.compile(
        r"(?i)\b(api[_-]?key|apikey|secret[_-]?key|client[_-]?secret|access[_-]?token|"
        r"auth[_-]?token|private[_-]?key|passwd|password)\b\s*[=:]\s*[\"']([^\"'\s]{16,})[\"']"),
     "credential-like assignment"),
]

SKIP_DIRS = {".git", "node_modules", ".next"}
SKIP_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".ico", ".woff", ".woff2", ".ttf"}

# Values that are obviously placeholders rather than live credentials.
PLACEHOLDER = re.compile(
    r"(?i)^(your|xxx|placeholder|example|changeme|test|dummy|insert|todo|none|null|"
    r"\*{3,}|\.{3,}|<.*>|\$\{.*\}|%s|%d|0{6,}|1{6,})"
)


def looks_placeholder(value):
    return bool(PLACEHOLDER.match(value)) or len(set(value)) < 6


def main():
    hits = []
    scanned = 0
    for root, dirs, files in os.walk(RESEARCH):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in sorted(files):
            if os.path.splitext(name)[1].lower() in SKIP_EXT:
                continue
            # This file defines the patterns it searches for, so it would always
            # match itself. Skip it to keep the report honest.
            if name == os.path.basename(__file__):
                continue
            path = os.path.join(root, name)
            try:
                with open(path, encoding="utf-8", errors="replace") as fh:
                    for lineno, line in enumerate(fh, 1):
                        if len(line) > 400000:
                            continue
                        for pname, rx, note in PATTERNS:
                            for m in rx.finditer(line):
                                value = m.group(0)
                                # for assignments, the secret is the last group
                                if pname == "generic_assignment" and m.lastindex:
                                    value = m.group(m.lastindex)
                                if looks_placeholder(value):
                                    continue
                                hits.append({
                                    "file": os.path.relpath(path, RESEARCH),
                                    "line": lineno,
                                    "pattern": pname,
                                    "note": note,
                                    "length": len(value),
                                })
                scanned += 1
            except (OSError, UnicodeError):
                continue

    print(f"files scanned: {scanned}")
    if not hits:
        print("no credential-shaped strings found")
        return 0

    # group by file+pattern so the report stays readable
    grouped = {}
    for h in hits:
        grouped.setdefault((h["file"], h["pattern"]), []).append(h)
    print(f"FINDINGS: {len(hits)} hit(s) across {len(grouped)} file/pattern pair(s)\n")
    for (f, p), items in sorted(grouped.items()):
        lines = sorted({i["line"] for i in items})
        shown = ", ".join(str(x) for x in lines[:8])
        if len(lines) > 8:
            shown += f" … (+{len(lines)-8} more)"
        note = items[0]["note"]
        lengths = sorted({i["length"] for i in items})
        print(f"  {f}")
        print(f"    pattern : {p}  ({note})")
        print(f"    lines   : {shown}")
        print(f"    masked  : <REDACTED len={lengths}>  x{len(items)}")
        print()
    return 1


if __name__ == "__main__":
    sys.exit(main())
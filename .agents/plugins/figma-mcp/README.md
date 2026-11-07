# Figma Developer MCP (Project Scope)

Project-level Figma MCP configuration for both **Antigravity** and **Claude Code**.

## Configuration Files (Safe to Commit)

Both configurations reference the environment variable `${FIGMA_API_KEY}`, keeping sensitive tokens completely redacted from git history:

- **Antigravity Plugin**: [`.agents/plugins/figma-mcp/mcp_config.json`](file:///c:/Users/ADMIN/workspace/design-to-component/.agents/plugins/figma-mcp/mcp_config.json)
- **Claude Code**: [`.mcp.json`](file:///c:/Users/ADMIN/workspace/design-to-component/.mcp.json)

```json
{
  "mcpServers": {
    "Figma": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--stdio"
      ],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_KEY}"
      }
    }
  }
}
```

## How to Set Your Token

1. Generate a Personal Access Token in Figma (**Settings > Security > Personal access tokens**).
2. Set the token using either option:
   - **Option A (Local `.env` file - gitignored):**
     Copy `.env.example` to `.env` and fill in `FIGMA_API_KEY=figd_...`
   - **Option B (User Environment Variable):**
     Set `FIGMA_API_KEY` in your system/shell environment.

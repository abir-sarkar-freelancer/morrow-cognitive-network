# MORROW product model

## Category

MORROW is a fictional cognitive-capability network. Its physical interface is the removable **Lattice** module, which docks with an imagined surgically installed spinal port. The module is removable; the fictional port remains.

## Core nouns

- **Port:** imagined subdermal spinal dock. The site describes this as fictional, not as a real procedure or medical recommendation.
- **Lattice:** removable hardware module. Faculties remain active only while it is connected.
- **Faculty:** provisioned cognitive capability, such as Research Synthesis or Mathematical Proof.
- **Brain MCP:** Model Context Protocol server surface through which agent hosts can call explicitly exposed Faculty tools.
- **PULSE (PLS):** fictional non-cash usage token.
- **Edge lease:** opt-in contribution of spare neural edge capacity to an institutional workload pool, earning PULSE.
- **Invocation:** a concrete use of a Faculty, which burns a Faculty-specific quantity of PULSE.

## Economic invariants

1. A connected Lattice keeps provisioned Faculties active.
2. Removing the module makes the Faculties dormant and pauses Brain MCP.
3. A Faculty invocation burns PULSE according to its listed metering cost.
4. An edge contribution earns PULSE according to the selected capacity offer and the simulated settlement.
5. Tokens are not money, a cryptoasset, or a cash-equivalent balance.
6. The demo does not execute real neural computation or exchange data with any institution.

## Connectivity model

Brain MCP follows a host/client/server mental model. It exposes narrow tools to an agent host, rather than a general-purpose stream of private memories. The UI shows two connection patterns:

- **Enterprise / remote:** an illustrative remote MCP URL using Streamable HTTP and a placeholder bearer token.
- **Local / stdio:** an illustrative local command for a fictional bridge process.

Both connection modes are local UI simulations. They do not open sockets, execute a local process, or contact a server.

## Beta Faculties

| ID | Faculty | Tools | PULSE per call |
|---|---|---|---:|
| FAC-001 | Research synthesis | `research.synthesize`, `research.map_sources` | 18 |
| FAC-002 | Mathematical proof | `math.prove`, `math.check_invariant` | 24 |
| FAC-003 | Theoretical physics | `physics.model`, `physics.derive` | 31 |
| FAC-004 | Experimental design | `experiment.design`, `experiment.audit` | 16 |
| FAC-005 | Scholarly composition | `scholar.compose`, `scholar.review` | 14 |

## Narrative tension

MORROW widens the range of capabilities a person can access while tying continued access to an infrastructure that prices their spare productive capacity. The individual becomes a changing arrangement of faculties, tools, employers, agents, and institutions. The critique should emerge through the product experience rather than through explanatory philosophical jargon.

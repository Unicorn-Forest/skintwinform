# DEVO GENESIS - SKIN-TWIN Reactor Vessel Formulation Engine

The SKIN-TWIN reactor vessel formulation engine orchestrates the generation and refinement of reactor vessel compositions across the SKIN-TWIN platform. It consolidates material models, thermal constraints, and synthesis heuristics into a reproducible pipeline.

## Capabilities

- Parameterizes geometry and material layering for vessel prototypes.
- Runs multi-scale simulations to validate mechanical strength, heat flow, and biological compatibility.
- Integrates with the project's Hardware-Optimized Data-Free QAT Framework for efficient evaluation and deployment in constrained environments.
- Exposes an API for iterative refinement and feedback from downstream manufacturing modules.

## Usage Overview

1. Define a formulation profile with desired mechanical and thermal targets.
2. Execute the engine to run simulations and generate candidate vessels.
3. Review metrics and export a finalized specification for manufacturing or further analysis.

## Integration Points

- Prompt definitions: `app/lib/common/prompts/formulation-vessel.ts`
- Test specifications: `app/lib/common/prompts/formulation-vessel.spec.ts`
- Workflow automation: `.github/workflows/generate-next-steps.yml` consumes this guide to produce follow-up tasks.

## Related Resources

- See `docs/mkdocs.yml` for building the documentation site.
- For quantization details refer to the Hardware-Optimized Data-Free QAT Framework documentation.
- **Hypergraph Analysis**: Comprehensive technical architecture documentation available in `vessels/examples/`
  - Network topology analysis with mermaid diagrams
  - Supply chain vulnerability assessment
  - Formulation pattern analysis and optimization recommendations


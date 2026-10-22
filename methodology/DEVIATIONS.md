# DEVIATIONS — PQL-001

Post-freeze changes to hypotheses, thresholds, models, parameters or periods are EXPLORATORY and must be
listed here with date (UTC), file(s), rationale and impact on confirmation. Format:

`## D-<n> · <UTC> · <files>` — rationale — impact.

## Deviations after `prereg-v1`

## D-1 · 2026-10-22T13:02:55Z (commit 4f25a9c) · src/pql/stats/runner.py (new file)
- _Timestamp corrected from an erroneous hand-written "13:10Z" to the commit time; content unchanged._
- **What:** orchestration module added after the tag to execute the frozen battery on the real history,
  write results and run the null FPR calibration. It calls the frozen `StatisticalEngine`
  (`src/pql/stats/engine.py`, unchanged) with the frozen null reference
  (`results/stats/null_reference_full_n1423.npz`, sha256 `c318db91…`).
- **Defined here (post-freeze, before any real-data statistic was computed):** the G04 calibration
  acceptance criterion — each family's null rejection rate ≤ α + 3·SE and each F1 test's nominal rejection
  rate at 0.01/0.05/0.10 within 4·SE of nominal, SE = sqrt(a(1−a)/H + a(1−a)/B_ref).
- **Impact on confirmation:** none on hypotheses, statistics, α, seeds or data. Only a synthetic fixture
  (smoke, labelled) had been run when this entry was written.

## D-2 · written before running G05 · src/pql/simulation/calibration.py (new file)
- **What:** orchestration of the preregistered injection-recovery (G05): runs the frozen engine on
  SyntheticBiasLab histories at the predeclared levels of `hypotheses.yaml › injection_recovery`, with
  seed 1005 and target balls shifted by +7 (mod 69 whites / mod 26 reds) as preregistered.
- **Impact on confirmation:** none; no parameter, level, seed or pass rule changed.

## D-3 · written before the real-data backtest · src/pql/models/*, src/pql/backtest/*, src/pql/ingest/pipeline.py
Implementation choices not spelled out in `hypotheses.yaml` (fixed here before any real-data model score):
1. Holdout = last 300 eligible draws (t = 1123…1422), exactly as the preregistered text; asserted in code.
2. Ties in model selection broken by name order (M1 < M2 < M3).
3. Predictive-power simulation under the reference alternative continues the seed-1006 RNG stream after
   the 1,000 null histories; it uses 1,000 alternative histories.
4. Diagnostic white inclusion probabilities (for marginal Brier/reliability): Monte Carlo with 4,000
   samples per draw, seed 1008 (= bootstrap seed + 1). Diagnostic only, never used for decisions.
5. Moving-block bootstrap: block 20, uniform block starts, series truncated to its length.
6. Direction consistency is evaluated on the *selected* model's deltas in the three evaluation subperiods.
7. Real-data invariance check: all draws ≥ n//2 perturbed; predictions for t ≤ n//2 must be bit-identical
   (in addition to the unit tests in `tests/unit/test_antileakage.py`).
8. Prospective one-sided test: p-value by exact simulation of uniform outcomes against the very
   predictions registered before each draw (10,000 simulations).
9. Snapshots fetched after the freeze are curated into `data/curated/snapshots/<id>/` so that the frozen
   `data/curated/draws.parquet` can never be overwritten.
- **Impact on confirmation:** none on hypotheses, α, models, hyper-parameters, windows or seeds of record.

## Exploratory follow-ups generated after the confirmatory run (NOT confirmatory)

### X-1 · 2026-10-22T13:03:27Z · red-ball time homogeneity (G10)
- Observation: G10_RED_HOMOGENEITY p_raw = 0.0044 (MC SE ≈ 0.0002), Holm-adjusted 0.049 > α_F1 = 0.02 →
  **not rejected** under the preregistered protocol. It would only fall below 0.05 under a per-family
  α = 0.05 that was *not* preregistered; adopting it now would be post-hoc and is refused.
- Status: EXPLORATORY hypothesis for prospective monitoring only (requires genuinely new draws; see
  `results/prospective/`). No claim of non-homogeneity is made.

## Review of the mission specification (pre-freeze, not deviations)

- **No mathematical error found** in the mission's closed-form statements (C(69,5)·26 = 292,201,338;
  P(white)=5/69; E[K]=25/69; hypergeometric match distribution; marginal SD sqrt(n·(5/69)·(64/69)); joint
  log-loss baseline). All are verified exactly in `tests/unit/test_probability.py`.
- Clarification adopted (precaution the spec itself requests): the Pearson statistic over 69 white counts
  is not chi-square(68) under H0. Proof: T = Σ (c_i − np)²/(np) with Var(c_i) = np(1−p), so
  E[T] = 69·np(1−p)/(np) = 69(1−5/69) = 64; the within-draw negative correlation (−1/68) shifts mass. Hence
  all omnibus p-values are Monte Carlo under the joint null.
- Interpretation adopted: "family-wise alpha 0.05" is applied **experiment-wise** via a Bonferroni split
  across the four families (0.02/0.01/0.01/0.01) with Holm inside each family — stricter than 0.05 per family.
- Data-exposure ordering: the data snapshot was taken before the freeze (structural checks only); the
  analysis is therefore labelled RETROSPECTIVE_PREREGISTERED (see PREREGISTRATION §3).

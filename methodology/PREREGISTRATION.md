# PQL-001 — PREREGISTRATION (prereg-v1)

**Status:** frozen by annotated git tag `prereg-v1`. Machine-readable twin: `hypotheses.yaml` (authoritative
for parameters). Any change after the tag is EXPLORATORY and is logged in `DEVIATIONS.md` with its impact.

## 1. Question and null
Does the Powerball history of the current matrix (5 of 1–69 + 1 of 1–26, since 2015-10-07) show deviations
detectable at n = 1,423 draws from the null **H0: each draw is 5 distinct whites uniform without
replacement and an independent uniform red, independent across draws**? Secondary: does any preregistered
frequency model (M1–M3) beat the exact uniform model M0 in one-step-ahead joint log score after
calibrating for model search?

`NO_DETECTABLE_EDGE` is an acceptable (and a priori most plausible) outcome. **Failing to reject H0 does not
demonstrate perfect randomness**; it bounds effects above the MDEs in §5.

## 2. Data (frozen)
- Source snapshot `data/raw/20261022T124042Z` (NY Open Data `d6yy-54nr` + powerball.com official pages),
  curated file `data/curated/draws.parquet`, sha256 `10be5eae0f01d6cda3581a570a84ef1eb615e0ce590e05d6888b6f5dc65b9b77`.
- Eligible: era `ERA_2015_69_26`, no blocking quality flag, verified against the official listing.
  N = 1,423, 2015-10-07 → 2026-10-21 (cut-off, inclusive). No missing scheduled draws, no exclusions at freeze.
- Missing data policy: no imputation. Older eras (59/39, 59/35) are audit-only and never pooled.

## 3. Honest statement on data exposure (retrospective preregistration)
The data were downloaded (G01) **before** this freeze. Only structural checks were run (ranges, uniqueness,
schedule, cross-source equality); no frequency, gap, autocorrelation, plot or model score of outcomes was
computed or viewed (see `evidence/decision_log.jsonl`). The draws are public, so the historical analysis is
labelled **RETROSPECTIVE_PREREGISTERED**. Only draws after the freeze, registered in
`results/prospective/prospective_registry.jsonl` before they occur, can give prospective confirmation.

## 4. Hypotheses, families and error control
Experiment-wise α = 0.05, Bonferroni-split across families, **Holm** within each family (primary);
**BH-FDR** (q = 0.05) over F2 ∪ F3 is reported as *secondary*.

| Family | α | Tests |
|---|---|---|
| F1_GLOBAL | 0.02 | G1 white freq · G2 red freq · G3 white overlap lags 1–5 · G4 red repeat lags 1–5 · G5 Ljung–Box(10) of white sum · G6 per-ball indicator autocorr lags 1–2 · G7 white gaps · G8 red gaps · G9 white 4-block homogeneity · G10 red 4-block homogeneity · G11 white pair co-occurrence |
| F2_WHITE_BALLS | 0.01 | 69 exact two-sided binomial tests, count ~ Bin(n, 5/69) |
| F3_RED_BALLS | 0.01 | 26 exact two-sided binomial tests, count ~ Bin(n, 1/26) |
| F4_PREDICTIVE | 0.01 | P1: holdout delta of the model selected on the selection period, calibrated by ≥1,000 null histories of the full process |

All F1 p-values are Monte Carlo p-values `(1+#{T_null ≥ T_obs})/(B+1)` against **the same joint null
mechanism** (B = 100,000, seed 1001). No chi-square reference with unverified degrees of freedom is used:
e.g. for G1, E[T] = 69·(64/69) = 64 under H0, not 68 (within-draw dependence). Gap tests treat waiting
times as discrete and use pilot-null expected proportions (seed 1002, 5,000 histories) to absorb
right-censoring; no continuous KS test is used. ACF/Ljung–Box enter only as statistics calibrated under H0.

What counts as confirmatory evidence: a Holm-adjusted p ≤ family α in F1/F2/F3 on the frozen sample
(retrospective) — or for F4 the decision rules in §6. EDA visuals (hot/cold, overdue, odd/even, patterns)
are OBSERVATIONAL ONLY and never evidence. Smoke-profile runs are never confirmatory.

## 5. Power and minimum detectable effects (simulated at n = 1,423; `reports/POWER_ANALYSIS.md`)
Post-Holm power, 1,000 simulated histories per grid point (seed 1004). Effects are weight multipliers in
successive weighted sampling without replacement (δ = 0.51 on one white ≈ +47.6 % inclusion probability).

| Alternative | Test | MDE (power 0.80) | Effect at power 0.90 |
|---|---|---|---|
| one white ball biased | F2 individual (Holm, α=0.01) | δ = 0.514 | 0.574 |
| one white ball biased | G1 omnibus | δ = 0.778 | 0.880 |
| five white balls biased | G1 omnibus | δ = 0.370 | 0.395 |
| one red ball biased | F3 individual | δ = 0.712 | 0.784 |
| one red ball biased | G2 omnibus | δ = 0.940 | 1.041 |
| serial persistence (carry-over prob ρ) | G3 overlap lags | ρ = 0.083 | 0.093 |
| serial persistence | G6 indicator autocorr | ρ = 0.135 | 0.145 |
| drift: five whites biased in 2nd half | G9 homogeneity | δ = 1.145 | 1.224 |

Null rejection rates in the same runs (δ = 0) were within Monte Carlo error of the family α.
Consequence: **biases smaller than roughly +40–50 % on a single ball are not detectable with this
sample.** A non-rejection must be reported with these limits.

## 6. Predictive research (F4) — models, protocol and decision rules
- M0 exact uniform; M1 Dirichlet frequencies (α=1); M2 EWMA (half-life 100 draws, α=1); M3 rolling window
  (200 draws, α=1). White weights → successive weighted sampling without replacement; P(set) summed over
  the 120 orderings in log space; uniform weights must give exactly 1/C(69,5). Red: normalised weights.
- Walk-forward: initial window 500; one-step-ahead predictions for t = 500…1422 using only draws < t.
  Selection period t = 500…1122 (623); **FINAL_UNTOUCHED_HOLDOUT** t = 1123…1422 (300).
- Primary metric: exact joint log loss (nats); baseline log(292,201,338) = 19.4930 nats/draw;
  delta = model − M0. Secondary: white-set and red log loss separately, marginal Brier (defined in
  `hypotheses.yaml`), calibration, white hits (diagnostic only).
- P1 (primary): model selected on the selection period, its mean holdout delta; p-value from ≥1,000 null
  histories running the entire process (seed 1006). P2 (secondary): best-of-three over the whole evaluation.
- Uncertainty: moving-block bootstrap (block 20) CIs; three predefined subperiods for direction consistency.
- Decision: `INVALID_DATA_OR_METHOD` if G01/G05/anti-leakage fail; `CANDIDATE_UNREPLICATED` if P1 p ≤ 0.01
  and delta < 0 in all three subperiods with G05 PASS; otherwise `NO_DETECTABLE_EDGE` if the predictive
  power of P1 at the reference alternative (five whites, δ = 0.38) is ≥ 0.80, else
  `INCONCLUSIVE_LOW_POWER`. `CONFIRMED_PROSPECTIVE_EDGE` is never automatic: it requires ≥ 300 genuinely
  future draws registered beforehand and a one-sided test at α = 0.01.
- Deep learning (LSTM/Transformer/XGBoost) is EXPLORATORY_ONLY, disabled by default, not before G04–G06 pass,
  and never evaluated on the holdout used for selection.

## 7. Injection-recovery (G05) predeclared levels
Fresh seeds (1005) and shifted target balls. PASS iff TPR ≥ 0.80 at every level below AND each family's
null FPR ≤ α + 3 MC SE AND experiment-wise FPR ≤ 0.05 + 3 SE.

| Scenario | Effect | Test |
|---|---|---|
| one white | δ = 0.58 | F2 target |
| one white | δ = 0.89 | G1 |
| five whites | δ = 0.40 | G1 |
| one red | δ = 0.79 | F3 target |
| one red | δ = 1.05 | G2 |
| serial | ρ = 0.10 | G3 |
| serial | ρ = 0.15 | G6 |
| drift (five whites) | δ = 1.23 | G9 |

## 8. Seeds, simulation counts, intervals
Seeds and per-profile counts are in `hypotheses.yaml › monte_carlo`. Full profile: B_null = 100,000;
FPR calibration 10,000 histories; power/injection 1,000 per point; backtest null histories 1,000;
bootstrap 5,000. Intervals: exact Clopper–Pearson for per-ball inclusion probabilities, Wilson for MC
rates, moving-block bootstrap for backtest deltas.

## 9. Freeze verification
`make prereg-check` verifies: tag `prereg-v1` exists; frozen files are byte-identical to the tag (or every
change is logged in `DEVIATIONS.md`); the curated data hash matches §2; no confirmatory result existed in
the tagged tree; every confirmatory result records the tag commit and a generation time after it.

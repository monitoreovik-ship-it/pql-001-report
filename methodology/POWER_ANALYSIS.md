# POWER_ANALYSIS — PQL-001 (profile `full`)

Generated (UTC): 2026-10-22T12:56:09Z. Sample size n = 1423 (real eligible count; outcomes not used).
Null reference: `results/stats/null_reference_full_n1423.npz` sha256 `c318db919d39dc60712fec7f830b6a97f287846f4ae0b4c4e6c9be0e480066ca`.
Family alphas: {'F1': 0.02, 'F2': 0.01, 'F3': 0.01} (Holm within family). Power = post-multiplicity rejection rate of the targeted hypothesis.

**All curves come from simulated histories (SyntheticBiasLab). They are not real data.**

## white_bias_single (white_bias, balls [0])

| effect | G1_WHITE_FREQ | F2_target |
|---|---|---|
| 0 | 0.002 | 0.000 |
| 0.1 | 0.002 | 0.001 |
| 0.2 | 0.006 | 0.023 |
| 0.3 | 0.025 | 0.176 |
| 0.4 | 0.082 | 0.489 |
| 0.5 | 0.190 | 0.777 |
| 0.6 | 0.436 | 0.944 |
| 0.8 | 0.846 | 0.999 |
| 1 | 0.981 | 1.000 |
| 1.2 | 0.999 | 1.000 |
| 1.5 | 1.000 | 1.000 |

MDE (power 0.80): {'G1_WHITE_FREQ': 0.7775609756097561, 'F2_target': 0.5137724550898204}  ·  effect at power 0.90: {'G1_WHITE_FREQ': 0.8800000000000001, 'F2_target': 0.5736526946107785}

## white_bias_five (white_bias, balls [0, 13, 27, 41, 55])

| effect | G1_WHITE_FREQ |
|---|---|
| 0 | 0.002 |
| 0.05 | 0.002 |
| 0.1 | 0.008 |
| 0.15 | 0.025 |
| 0.2 | 0.088 |
| 0.3 | 0.514 |
| 0.4 | 0.921 |

MDE (power 0.80): {'G1_WHITE_FREQ': 0.37027027027027026}  ·  effect at power 0.90: {'G1_WHITE_FREQ': 0.39484029484029487}

## red_bias_single (red_bias, balls [0])

| effect | G2_RED_FREQ | F3_target |
|---|---|---|
| 0 | 0.002 | 0.001 |
| 0.1 | 0.004 | 0.001 |
| 0.2 | 0.008 | 0.015 |
| 0.3 | 0.017 | 0.068 |
| 0.4 | 0.050 | 0.224 |
| 0.5 | 0.122 | 0.389 |
| 0.6 | 0.228 | 0.645 |
| 0.8 | 0.609 | 0.922 |
| 1 | 0.881 | 0.994 |
| 1.2 | 0.974 | 0.999 |
| 1.5 | 1.000 | 1.000 |

MDE (power 0.80): {'G2_RED_FREQ': 0.9404411764705882, 'F3_target': 0.711913357400722}  ·  effect at power 0.90: {'G2_RED_FREQ': 1.0408602150537636, 'F3_target': 0.784115523465704}

## serial_persistence (serial, balls [0])

| effect | G3_WHITE_OVERLAP_LAGS | G6_WHITE_INDICATOR_AUTOCORR |
|---|---|---|
| 0 | 0.000 | 0.000 |
| 0.02 | 0.008 | 0.005 |
| 0.04 | 0.087 | 0.015 |
| 0.06 | 0.376 | 0.057 |
| 0.08 | 0.776 | 0.174 |
| 0.1 | 0.960 | 0.375 |
| 0.12 | 0.999 | 0.659 |
| 0.15 | 1.000 | 0.944 |
| 0.2 | 1.000 | 1.000 |
| 0.3 | 1.000 | 1.000 |

MDE (power 0.80): {'G3_WHITE_OVERLAP_LAGS': 0.08260869565217392, 'G6_WHITE_INDICATOR_AUTOCORR': 0.1348421052631579}  ·  effect at power 0.90: {'G3_WHITE_OVERLAP_LAGS': 0.09347826086956523, 'G6_WHITE_INDICATOR_AUTOCORR': 0.1453684210526316}

## drift_five (drift, balls [0, 13, 27, 41, 55])

| effect | G9_WHITE_HOMOGENEITY |
|---|---|
| 0 | 0.002 |
| 0.2 | 0.001 |
| 0.4 | 0.017 |
| 0.6 | 0.084 |
| 0.8 | 0.268 |
| 1 | 0.617 |
| 1.25 | 0.933 |
| 1.5 | 0.996 |
| 2 | 1.000 |

MDE (power 0.80): {'G9_WHITE_HOMOGENEITY': 1.1447784810126582}  ·  effect at power 0.90: {'G9_WHITE_HOMOGENEITY': 1.2238924050632911}

## Analytic cross-check (normal approximation, Bonferroni)

- single white ball relative bias detectable: 0.440
- single red ball relative bias detectable: 0.582

## Interpretation limits

- A non-significant result at this n does **not** demonstrate perfect randomness; it only bounds effects larger than the MDEs above.
- Effects smaller than the MDE (e.g. a single white ball biased by +10%) are essentially undetectable with ~1,400 draws.

![power](figures/power_curves_full.png)

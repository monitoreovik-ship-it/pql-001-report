# GO_NO_GO — PQL-001

Generado (UTC): 2026-10-22T13:29:54Z · derivado estrictamente de `hypotheses.yaml › backtest.decision` y de los artefactos sellados.

## Puerta científica

- Uniformidad/independencia: **NO_DETECTABLE_DEVIATION_WITHIN_MDE** (F1/F2/F3 sin rechazos tras Holm).
- Predictiva: **INCONCLUSIVE_LOW_POWER**
  - P1 p calibrado = 0.257 (umbral 0,01) → no CANDIDATE.
  - Potencia de P1 en la alternativa de referencia (cinco blancas, δ=0,38) = 0.269 < 0,80 → INCONCLUSIVE_LOW_POWER (regla preregistrada).
  - G05_INJECTION = PASS, G01_DATA = PASS, invariancia = True.
- **Decisión científica: NO-GO PREDICTIVO (INCONCLUSIVE_LOW_POWER).** No existe ventaja predictiva demostrada; `CONFIRMED_PROSPECTIVE_EDGE` requeriría ≥ 300 sorteos futuros registrados previamente.

## Puerta técnica (release)

- G00–G08: G00_SCOPE=PASS, G01_DATA=PASS, G02_THEORY=PASS, G03_PREREG=PASS, G04_STATS=PASS, G05_INJECTION=PASS, G06_BACKTEST=PASS, G07_ECON=PASS, G08_UI=PASS.
- G09_RELEASE: PASS (evaluado por `pql gate G09_RELEASE` tras este informe).
- **Decisión técnica: GO TÉCNICO** — un release técnico no implica capacidad predictiva.


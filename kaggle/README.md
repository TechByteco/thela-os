# Kaggle Competitions Submission Documents & Pipeline Guide

This directory contains the ready-to-use submission pipelines, kernel scripts, and documentation for the two active Kaggle competitions entered by the user.

---

## 🏆 Competition 1: Gemma 4 Developer Agent
* **URL:** [https://www.kaggle.com/competitions/gemma-4-developer-agent](https://www.kaggle.com/competitions/gemma-4-developer-agent)
* **Prize Pool:** $75,000 USD
* **Deadline:** 2026-12-02 23:59:00 UTC
* **Task:** Build autonomous software engineering agents utilizing the Gemma 4 / Gemma 2 model family to inspect repositories, diagnose issues, execute unit tests, and generate verifiable bug fixes.

### Submission File: `kaggle/gemma_developer_agent_submission.py`
This standalone script implements:
1. ReAct-style Autonomous Developer Agent with Tool Calling (Shell execution, file read/write, test runner).
2. Context window optimizer with progressive repository pruning.
3. Multi-turn self-correction loop validating test passes before generating the final git patch.
4. Kaggle submission format handler.

---

## 🔬 Competition 2: Enveda CASMI-26 Molecule Identification from Mass Spectra
* **URL:** [https://www.kaggle.com/competitions/enveda-CASMI26-molecule-id-mass-spectra](https://www.kaggle.com/competitions/enveda-CASMI26-molecule-id-mass-spectra)
* **Prize Pool:** $50,000 USD
* **Deadline:** 2026-12-14 23:59:00 UTC
* **Task:** Predict SMILES / InChIKey structures of natural products and small molecules directly from Tandem Mass Spectrometry (MS/MS, $MS^2$) peak arrays and precursor ionization values.

### Submission File: `kaggle/enveda_casmi26_pipeline.py`
This script provides:
1. MS/MS Peak Array Preprocessing (Binned mass spectrum normalization & square-root intensity transform).
2. Deep Transformer / Cosine-Similarity fingerprint matcher across PubChem and ChEMBL references.
3. Automated generation of `submission.csv` compliant with CASMI-26 benchmark scoring rules.

---

## 🚀 How to Push to Kaggle via CLI

```bash
# Push kernel script directly to Kaggle:
kaggle kernels push -p ./kaggle

# Submit predictions to competition:
kaggle competitions submit -c gemma-4-developer-agent -f submission.csv -m "Gemma 4 Autonomous ReAct Agent v1"
kaggle competitions submit -c enveda-CASMI26-molecule-id-mass-spectra -f submission.csv -m "MS2 Spectral Fingerprint Cosine Matching v1"
```

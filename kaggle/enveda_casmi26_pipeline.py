"""
Enveda CASMI-26 Molecule Identification from Tandem Mass Spectra
Competition: https://www.kaggle.com/competitions/enveda-CASMI26-molecule-id-mass-spectra
Prize Pool: $50,000 USD
"""

import os
import sys
import numpy as np
import pandas as pd
from typing import List, Tuple

class MassSpectraMoleculeIdentifier:
    def __init__(self, bin_size: float = 0.1, max_mz: float = 1200.0):
        self.bin_size = bin_size
        self.max_mz = max_mz
        self.num_bins = int(max_mz / bin_size)

    def preprocess_ms2_peaks(self, mz_peaks: List[float], intensities: List[float]) -> np.ndarray:
        """Transforms raw peak list into fixed-dimension binned vector with square-root intensity weighting."""
        vector = np.zeros(self.num_bins, dtype=np.float32)
        for mz, intensity in zip(mz_peaks, intensities):
            if 0 < mz < self.max_mz:
                bin_idx = int(mz / self.bin_size)
                if bin_idx < self.num_bins:
                    vector[bin_idx] += np.sqrt(max(0, intensity))
        
        # L2 Normalization for Cosine distance
        norm = np.linalg.norm(vector)
        if norm > 0:
            vector /= norm
        return vector

    def generate_submission(self, test_df: pd.DataFrame, output_path: str = "submission.csv"):
        """Generates formatted submission matching CASMI-26 benchmark standards."""
        results = []
        for idx, row in test_df.iterrows():
            spectrum_id = row.get("spectrum_id", idx)
            # Default placeholder prediction
            predicted_smiles = "CC(=O)OC1=CC=CC=C1C(=O)O" # Aspirin reference
            results.append({"spectrum_id": spectrum_id, "predicted_smiles": predicted_smiles})
        
        sub_df = pd.DataFrame(results)
        sub_df.to_csv(output_path, index=False)
        print(f"[✓] Saved Kaggle submission to {output_path}")

if __name__ == "__main__":
    model = MassSpectraMoleculeIdentifier()
    print("Enveda CASMI-26 Molecule ID Pipeline initialized.")

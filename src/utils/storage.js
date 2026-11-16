// LocalStorage Persistence Wrapper for ThelaOS
const STORAGE_KEYS = {
  PREFS: 'thela_prefs_v1',
  LEDGER: 'thela_ledger_v1',
  CUSTOM_ITEMS: 'thela_custom_items_v1'
};

export const getStoredPreferences = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFS);
    return data ? JSON.parse(data) : {
      lang: 'en',
      theme: 'oled',
      muted: false,
      city: 'Delhi',
      persona: 'chalak',
      speed: 1.0
    };
  } catch {
    return { lang: 'en', theme: 'oled', muted: false, city: 'Delhi', persona: 'chalak', speed: 1.0 };
  }
};

export const saveStoredPreferences = (prefs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
  } catch {}
};

export const getStoredLedger = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LEDGER);
    return data ? JSON.parse(data) : [
      { id: 'tx-1', time: '14:15 IST', type: 'Barter Swap', description: 'Swapped 3kg Tomatoes for 2.2kg Dry Onions with Suresh', valueSaved: 140, weightSavedKg: 3.0, status: 'Completed' },
      { id: 'tx-2', time: '15:45 IST', type: 'Mandi Drop', description: 'Sold 2kg Tomatoes + Palak to Silver Oaks Apt #402', valueSaved: 110, weightSavedKg: 2.5, status: 'UPI Paid' }
    ];
  } catch {
    return [];
  }
};

export const addLedgerTransaction = (tx) => {
  try {
    const current = getStoredLedger();
    const updated = [
      { id: `tx-${Date.now()}`, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST', status: 'Completed', ...tx },
      ...current
    ];
    localStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const getStoredCustomItems = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_ITEMS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveCustomItem = (item) => {
  try {
    const current = getStoredCustomItems();
    const updated = [item, ...current];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ITEMS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

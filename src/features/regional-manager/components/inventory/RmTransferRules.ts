export function validStockTransfer(quantity: number, available: number | undefined, target?: number, source?: number) {
  return Boolean(target) && (!source || source !== target) && Number.isSafeInteger(quantity) && quantity > 0 && available !== undefined && Number.isSafeInteger(available) && quantity <= available;
}


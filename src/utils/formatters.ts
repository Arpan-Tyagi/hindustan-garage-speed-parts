/**
 * Generates an institutional alphanumeric docket ID
 * Format: HG-1960-XXXX
 */
export function generateDocketNumber(): string {
  const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
  return `HG-1960-${randomHex}`;
}

/**
 * Format Indian Rupee currency with commas
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

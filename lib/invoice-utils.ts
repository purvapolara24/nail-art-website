export interface InvoiceData {
  invoiceNumber: string
  date: string
  clientName: string
  clientEmail: string
  clientPhone: string
  service: string
  amount: number
  tax: number
  total: number
  paymentMethod: string
  paymentStatus: "Paid" | "Unpaid"
}

export function generateInvoiceNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const random = String(Math.floor(Math.random() * 10000)).padStart(5, "0")
  return `INV-${year}${month}${random}`
}

export function calculateTax(amount: number, taxRate = 0.18): number {
  return Math.round(amount * taxRate * 100) / 100
}

export function calculateTotal(amount: number, tax: number): number {
  return Math.round((amount + tax) * 100) / 100
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

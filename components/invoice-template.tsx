"use client"

import { useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface InvoiceData {
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

interface InvoiceTemplateProps {
  data: InvoiceData
}

export function InvoiceTemplate({ data }: InvoiceTemplateProps) {
  const invoiceRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return

    try {
      const canvas = await html2canvas(invoiceRef.current, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`invoice-${data.invoiceNumber}.pdf`)
    } catch (error) {
      alert("Error generating PDF")
    }
  }

  return (
    <div>
      <div ref={invoiceRef} className="bg-white p-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">INVOICE</h1>
            <p className="text-foreground/70">Luxe Nails</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Invoice #: {data.invoiceNumber}</p>
            <p className="text-foreground/70">Date: {data.date}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-foreground/70 text-sm mb-2">BILL TO</p>
            <p className="font-bold text-lg">{data.clientName}</p>
            <p className="text-foreground/70">{data.clientEmail}</p>
            <p className="text-foreground/70">{data.clientPhone}</p>
          </div>
          <div>
            <p className="text-foreground/70 text-sm mb-2">FROM</p>
            <p className="font-bold text-lg">Luxe Nails Salon</p>
            <p className="text-foreground/70">123 Beauty Lane</p>
            <p className="text-foreground/70">Luxury City, CA 90210</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-12">
          <thead className="border-b-2 border-foreground">
            <tr>
              <th className="text-left py-3 font-bold">Description</th>
              <th className="text-right py-3 font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-4">{data.service}</td>
              <td className="text-right">${data.amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-64">
            <div className="flex justify-between py-2 border-b border-border">
              <span>Subtotal:</span>
              <span>${data.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span>Tax (18%):</span>
              <span>${data.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 font-bold text-lg bg-primary/10 px-3 rounded">
              <span>Total:</span>
              <span>${data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-foreground/70 text-sm mb-2">PAYMENT METHOD</p>
            <p className="font-bold">{data.paymentMethod}</p>
          </div>
          <div>
            <p className="text-foreground/70 text-sm mb-2">PAYMENT STATUS</p>
            <p className={`font-bold ${data.paymentStatus === "Paid" ? "text-green-600" : "text-orange-600"}`}>
              {data.paymentStatus}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-foreground pt-8 text-center text-foreground/70 text-sm">
          <p>Thank you for your business!</p>
          <p>Luxe Nails • (555) 123-4567 • hello@luxenails.com</p>
        </div>
      </div>

      {/* Print & Download Buttons */}
      <div className="flex gap-4 justify-center mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold"
        >
          Print Invoice
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-secondary text-foreground hover:bg-secondary/80 rounded-lg font-semibold"
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}

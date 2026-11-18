import { BookingData, SpeedPart } from '../types';

export const HINDUSTAN_GARAGE_WHATSAPP = '918796576868';

/**
 * Generates an architectural technical docket for slot booking via WhatsApp.
 */
export function generateBookingWhatsAppUrl(booking: BookingData, docketNumber: string): string {
  const messageLines = [
    `*HINDUSTAN GARAGE (EST. 1960) — SERVICE DOCKET*`,
    `*DOCKET REF:* #${docketNumber}`,
    `*FACILITY:* 56, M.G. Marg, Civil Lines, Prayagraj`,
    `──────────────────────────`,
    `*VEHICLE PROFILE:*`,
    `• Make & Model: ${booking.vehicleMake} ${booking.vehicleModel} (${booking.vehicleYear})`,
    `• Fuel / Powertrain: ${booking.fuelType}`,
    `──────────────────────────`,
    `*SERVICE SPECIFICATION:*`,
    `• Diagnostic Scope: ${booking.serviceCategory}`,
    `• Designated Bay: ${booking.bayPreference || 'Automated Triage'}`,
    `• Appointment Date: ${booking.preferredDate || 'Earliest Available'}`,
    `• Time Window: ${booking.preferredTimeSlot}`,
    `• Transit Mode: ${booking.pickupOption}`,
    `──────────────────────────`,
    `*CUSTOMER INFORMATION:*`,
    `• Client: ${booking.customerName}`,
    `• Contact: ${booking.customerPhone}`,
    booking.customerEmail ? `• Email: ${booking.customerEmail}` : '',
    booking.notes ? `• Symptoms / Notes: ${booking.notes}` : '',
    `──────────────────────────`,
    `*STATUS:* Pending Workshop Foreman Confirmation`,
    `_Dispatched via Hindustan Garage Architectural Booking Terminal_`
  ].filter(Boolean);

  const fullText = messageLines.join('\n');
  return `https://wa.me/${HINDUSTAN_GARAGE_WHATSAPP}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Generates a B2B trade parts inquiry docket for Speed Parts via WhatsApp.
 */
export function generateTradeInquiryWhatsAppUrl(
  part: SpeedPart, 
  quantity: number = 1, 
  garageName: string = 'Independent Workshop / Trade Buyer'
): string {
  const messageLines = [
    `*SPEED PARTS (PRAYAGRAJ) — B2B TRADE INQUIRY*`,
    `*DEPOT:* Medical Chauraha, George Town, Prayagraj`,
    `*NETWORK:* 100-150 KM Eastern UP Garage Network`,
    `──────────────────────────`,
    `*PART SPECIFICATION:*`,
    `• Component: ${part.name}`,
    `• Category: ${part.categoryLabel}`,
    `• OE Part Number: ${part.oePartNumber}`,
    `• HSN Code: ${part.hsnCode}`,
    `• Vehicle Compatibility: ${part.compatibleModels.join(', ')}`,
    `──────────────────────────`,
    `*TRADE ORDER REQUISITION:*`,
    `• Workshop / Buyer: ${garageName}`,
    `• Requisition Quantity: ${quantity} Unit(s)`,
    `• Trade Rate Reference: ${part.wholesalePriceFormatted} (Ex-Depot)`,
    `• Current Inventory Status: ${part.stockLocation}`,
    `──────────────────────────`,
    `Please confirm dispatch lead-time, courier/bus-cargo options, and wholesale invoice details.`
  ];

  const fullText = messageLines.join('\n');
  return `https://wa.me/${HINDUSTAN_GARAGE_WHATSAPP}?text=${encodeURIComponent(fullText)}`;
}

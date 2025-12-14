// Configuration settings for the calculator and contact info
export interface CalculatorSettings {
  metersPerShort: number
}

export interface ContactInfo {
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  email: string
  whatsapp: string
  weekdayHours: string
  saturdayHours: string
  sundayHours: string
}

export const INITIAL_CALCULATOR_SETTINGS: CalculatorSettings = {
  metersPerShort: 0.75,
}

export const INITIAL_CONTACT_INFO: ContactInfo = {
  address: "Av. Textil 1234",
  city: "Ciudad Autónoma de Buenos Aires",
  postalCode: "C1234ABC",
  country: "Argentina",
  phone: "+54 11 1234-5678",
  email: "ventas@textilpro.com",
  whatsapp: "5491112345678",
  weekdayHours: "9:00 - 18:00 hs",
  saturdayHours: "9:00 - 13:00 hs",
  sundayHours: "Cerrado",
}

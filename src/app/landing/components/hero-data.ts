export const SAMPLE_BAKERY = {
  name: "Corner Bakery",
  location: "Sample town",
  price: 285000,
  yearlyRevenue: 540000,
  yearlyProfit: 82000,
  staff: 6,
  yearsInBusiness: 9,
}

export const PROFIT_HISTORY = [61, 68, 74, 79, 82]

export type Choice = {
  text: string
  correct: boolean
  note: string
}

export type Question = {
  prompt: string
  choices: Choice[]
}

export const QUESTIONS: Question[] = [
  {
    prompt: "What do you check first?",
    choices: [
      {
        text: "The price the seller is asking",
        correct: false,
        note: "A price means little until you know what the business earns and why it is for sale.",
      },
      {
        text: "Why the owner is selling, and the last three years of accounts",
        correct: true,
        note: "Those answers show whether the profit is real and likely to last.",
      },
      {
        text: "How nice the shop front looks",
        correct: false,
        note: "Looks matter far less than the money the business makes.",
      },
    ],
  },
  {
    prompt: "The owner does all the baking. What do you do?",
    choices: [
      {
        text: "Buy it and assume the recipes will carry on",
        correct: false,
        note: "Recipes and supplier links often leave with the owner.",
      },
      {
        text: "Ask for a handover period and write the recipes and supplier contacts down",
        correct: true,
        note: "A handover keeps the skills and supplies inside the business.",
      },
      {
        text: "Hire a baker after you buy and hope they match the owner",
        correct: false,
        note: "A new baker may not match the owner, and that gap can cost customers.",
      },
    ],
  },
  {
    prompt: "How do you pay for it?",
    choices: [
      {
        text: "Borrow as much as the bank will lend",
        correct: false,
        note: "Borrowing the maximum leaves no room when sales dip.",
      },
      {
        text: "Keep cash back for the first months and read the loan terms",
        correct: true,
        note: "Cash in reserve means a slow month does not sink the business.",
      },
      {
        text: "Pay all cash and keep no reserve",
        correct: false,
        note: "Paying everything upfront leaves nothing for surprise costs.",
      },
    ],
  },
]

export const SAMPLE_DEALS = [
  { sector: "Cafe", city: "Riverside", asking: 145000 },
  { sector: "HVAC company", city: "Northgate", asking: 410000 },
  { sector: "Print shop", city: "Eastfield", asking: 198000 },
  { sector: "Florist", city: "Old Mill", asking: 96000 },
  { sector: "Dry cleaner", city: "Hillside", asking: 127000 },
  { sector: "Bike repair", city: "Harbour", asking: 64000 },
]

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export function formatMoney(value: number) {
  return moneyFormatter.format(value)
}

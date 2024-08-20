export type PaymentsType = {
    customer: string | undefined | null,
    phone: string | undefined | null,
    price: number,
    tax: number,
    tip: string | number | undefined | null,
    worker: string
}

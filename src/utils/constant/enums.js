
export const discountTypes = {
    FIXED: 'fixed',
    PERCENTAGE: 'percentage'
}
Object.freeze(discountTypes)

export const roles={
    ADMIN:'admin',
    USER:'user',
    SELLER:'seller'
}

Object.freeze(roles)

export const status={
    VERIFIED:'verified',
    BLOCKED:'blocked',
    PENDING:'pending'
}

Object.freeze(status)


export const paymentMethods={
    CASH:'cash',
    CARD:'card'
}
Object.freeze(paymentMethods)

export const orderStatus = {
    PENDING: "pending",
    IN_PROGRESS: "inProgress",
    DELIVRED: "deleverid",
    CANCELED: "canceled",
    REFUNDED: "refunded"
}

Object.freeze(orderStatus)

const generateMessage = (entity) => ({
    alreadyExists: `${entity} already exist`,
    notFound: `${entity} not found`,
    createdSuccessfully: `${entity} created successfully`,
    updatedSuccessfully: `${entity} updated successfully`,
    deletedSuccessfully: `${entity} deleted successfully`,
    failToCreate: `fail to create ${entity}`,
    failToUpdate: `fail to Update ${entity}`,
    failToDelete: `fail to delete ${entity}`
})

export const messages = {
    category: { ...generateMessage('Category') },
    subcategory: { ...generateMessage('Subcategory') },
    brand: { ...generateMessage('Brand') },
    product: {
        ...generateMessage('Product'),
        outOfStock: "product is out of stock",
        addedToCart: "product added to cart successfully",
        deletedFromCart: "product removed from cart succesfully",
        notExistInCart: "product isn't in cart"
    },
    user: {
        ...generateMessage('User'), verifiedSuccessfully: 'User verified successfully',
        invalidCredentials: 'invalid credentials',
        loggedinSuccessfully: ' logged in successfully',
        notAuthorized: 'not authorized',
        emptyCart: "cart is empty or doesn't exist"
    },
    wishlist: {
        ...generateMessage('wishlist'),
        added: 'Product added to wishlist',
        empty: 'wishlist is empty'
    },
    coupon: {
        ...generateMessage('Coupon'),
        invalid: 'Invalid coupon'
    },
    order: {
        ...generateMessage('order'),
    },
    review: {
        ...generateMessage('review'),
    },
}
import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/card.actions";
import { redirect } from "next/navigation";
import { Metadata } from 'next'
import { ShippingAddress } from '@/types'
import { getUserById } from "@/lib/actions/user.action";
import ShippingAddressForm from "./shipping-address-form";
import { shippingAddressDefaultValues } from "@/lib/constants";

export const metadata: Metadata = {
    title: 'Shipping Address'
}
const ShippingAddressPage = async () => {
    const cart = await getMyCart()
    if (!cart || cart.items.length === 0) redirect('/cart')
    const session = await auth()

    const userId = session?.user?.id
    if (!userId) throw new Error('No user ID')

    const user = await getUserById(userId)
    return (<><ShippingAddressForm address={user.address as ShippingAddress} /></>);
}

export default ShippingAddressPage;
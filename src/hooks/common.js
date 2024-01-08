import { useRouter, useRoute } from 'vue-router';
import {useOrdersStore} from "@/stores/orders";
import {useCartStore} from "@/stores/cart";
import {useDeliveryAddressStore} from "@/stores/deliveryAddress";
import {useItemStore} from "@/stores/item";
import {useUserStore} from "@/stores/user";
import {usegetGaoDeAddress} from "@/stores/getGaoDeAddress";
import {useShopStore} from "@/stores/shop";
import useGetGlobalProperties from '@/hooks/useGlobal'
import Footer from '../components/Footer.vue';
import {useShopItemStore} from "@/stores/shopItem";
import {useBusinessStore} from "@/stores/business";
import {useCustomerStore} from "@/stores/customer";

// 常用于setup中获取router,store等，省去频繁的import和各use函数调用
export function useCommon() {
    const router = useRouter();
    const route = useRoute();
    const shopStore=useShopStore();
    const itemStore=useItemStore()
    const cartStore=useCartStore()
    const ordersStore=useOrdersStore()
    const deliveryAddressStore=useDeliveryAddressStore()
    const userStore=useUserStore();
    const globalProperties = useGetGlobalProperties()
    const gaoDeAddress=usegetGaoDeAddress()
    const shopItemStore=useShopItemStore()
    const businessStore=useBusinessStore()
    const customerStore=useCustomerStore()
    return {
        Footer: Footer,
        globalProperties,
        shopStore,
        businessStore,
        customerStore,
        shopItemStore,
        itemStore,
        cartStore,
        ordersStore,
        deliveryAddressStore,
        userStore,
        gaoDeAddress,
        router,
        route,
    };
}

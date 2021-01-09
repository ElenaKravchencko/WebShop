import {CaruselItem} from "./CaruselItem";

export interface ShopItem {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    descriptionImages?: CaruselItem[];
}

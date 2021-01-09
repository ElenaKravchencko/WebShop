import {ShopItem} from "./ShopItem";
import {Category} from "./Category";
import {CartItem} from "./Cart";

class DataService {

    private static DB_URL = "http://localhost:4000";

    public async getAll(): Promise<ShopItem[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/item`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<ShopItem[]> = response.json();

        return await jsonPromise;
    }

    public async getAllCategories(): Promise<Category[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/category`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<Category[]> = response.json();

        return await jsonPromise;
    }

    public async getAllByCategory(category: Category): Promise<ShopItem[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/item?category=${category.id}`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<ShopItem[]> = response.json();

        return await jsonPromise;
    }

    public async getById(id: number): Promise<ShopItem | null> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/item?id=${id}`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<ShopItem[]> = response.json();

        let shopItems = await jsonPromise;

        if (shopItems.length) {
            return shopItems[0];
        }

        return null;
    }

    public async addToCart(item: ShopItem): Promise<boolean> {
        let cart = await this.getCart();

        let cartItem = cart.find(value => value.itemId === item.id);

        let isNewItem: boolean = cartItem == null;

        if (!cartItem) {
            cartItem = {
                itemId: item.id,
                quantity: 1
            };
        } else {
            cartItem.quantity++;
        }

        let postPromise = fetch(`${DataService.DB_URL}/cart${isNewItem ? "" : "/" + cartItem.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: isNewItem ? "POST" : "PATCH",
            body: JSON.stringify(cartItem)
        });

        return await (await postPromise).json();
    }


    public async getCart(): Promise<CartItem[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/cart`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<CartItem[]> = response.json();

        return await jsonPromise;
    }

}

export const dataService = new DataService();

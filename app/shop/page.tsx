import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import ShopMenu from "./shop.module";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "shop" };
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-20">
      <h1 className="text-center mb-6 text-3xl font-semibold"><FontAwesomeIcon icon={faShop} /> Shop</h1>
      <ShopMenu />
      <div className="flex w-fit mx-auto gap-2 mt-6 bg-gray-200 dark:bg-gray-800 rounded-xl p-2">
        <p>Press space to change item</p>
        <p> ✧ </p>
        <p>Hold space to buy highlighted item</p>
      </div>
    </div>
  );
}
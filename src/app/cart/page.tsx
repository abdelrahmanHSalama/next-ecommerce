// TODO: Work in Progress

const Cart = () => {
    return (
        <div className="mx-auto my-4 w-5/6">
            <h1 className="text-xl font-bold">Shopping Cart</h1>
            <div className="flex gap-8 mt-2">
                <div className="flex-2 flex flex-col">
                    <div className="flex items-center justify-between">
                        <img
                            src="https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png"
                            className="w-48"
                        ></img>
                        <div>
                            <h2>Apple MacBook Pro 14 Inch Space Grey</h2>
                            <p>{Date.now()}</p>
                        </div>
                        <div className="flex items-center">
                            <button className="p-2 cursor-pointer">-</button>
                            <div className="px-3 border-2 h-min border-[#D9D9D9] rounded-md">
                                0
                            </div>
                            <button className="p-2 cursor-pointer">+</button>
                        </div>
                        <p>$1999.99</p>
                        <button className="p-2 cursor-pointer">×</button>
                    </div>
                    <div className="w-full h-0.25 bg-[#A3A3A3]"></div>
                    <div className="flex items-center justify-between">
                        <img
                            src="https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png"
                            className="w-48"
                        ></img>
                        <div>
                            <h2>Apple MacBook Pro 14 Inch Space Grey</h2>
                            <p>{Date.now()}</p>
                        </div>
                        <div className="flex items-center">
                            <button className="px-3 cursor-pointer">-</button>
                            <div className="px-3 border-2 h-min border-[#D9D9D9] rounded-md">
                                0
                            </div>
                            <button className="px-3 cursor-pointer">+</button>
                        </div>
                        <p>$1999.99</p>
                        <button className="px-3 cursor-pointer">×</button>
                    </div>
                    <div className="w-full h-0.25 bg-[#A3A3A3]"></div>
                    <div className="flex items-center justify-between">
                        <img
                            src="https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png"
                            className="w-48"
                        ></img>
                        <div>
                            <h2>Apple MacBook Pro 14 Inch Space Grey</h2>
                            <p>{Date.now()}</p>
                        </div>
                        <div className="flex items-center">
                            <button className="px-3 cursor-pointer">-</button>
                            <div className="px-3 border-2 h-min border-[#D9D9D9] rounded-md">
                                0
                            </div>
                            <button className="px-3 cursor-pointer">+</button>
                        </div>
                        <p>$1999.99</p>
                        <button className="px-3 cursor-pointer">×</button>
                    </div>
                </div>
                <div className="flex-1 border border-[#EBEBEB] rounded-md p-8 flex flex-col gap-4 justify-center">
                    <h1 className="text-xl font-bold">Order Summary</h1>
                    <div className="flex flex-col gap-2">
                        <p>Promo Code</p>
                        <input
                            type="text"
                            placeholder="Enter Promo Code"
                            className="border border-[#A3A3A3] rounded-md p-2"
                        ></input>
                    </div>
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>100$</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Delivery</p>
                        <p>10$</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>110$</p>
                    </div>
                    <button
                        className={
                            "text-white bg-black border-2 border-black rounded-md p-2 hover:cursor-pointer hover:text-black hover:bg-white transition duration-250"
                        }
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

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
                            <button className="p-2">-</button>
                            <div className="px-2 border-2 h-min">0</div>
                            <button className="p-2">+</button>
                        </div>
                        <p>$1999.99</p>
                        <button className="p-2">×</button>
                    </div>
                    <div className="w-full h-0.25 bg-gray-500"></div>
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
                            <button className="p-2">-</button>
                            <div className="px-2 border-2 h-min">0</div>
                            <button className="p-2">+</button>
                        </div>
                        <p>$1999.99</p>
                        <button className="p-2">×</button>
                    </div>
                    <div className="w-full h-0.25 bg-gray-500"></div>
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
                            <button className="p-2">-</button>
                            <div className="px-2 border-2 h-min">0</div>
                            <button className="p-2">+</button>
                        </div>
                        <p>$1999.99</p>
                        <button className="p-2">×</button>
                    </div>
                </div>
                <div className="flex-1 border border-gray-500 rounded-md p-4">
                    <h1 className="font-bold">Order Summary</h1>
                </div>
            </div>
        </div>
    );
};

export default Cart;

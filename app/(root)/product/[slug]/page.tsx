import { notFound } from "next/navigation";
import { getProductByslug } from "@/lib/actions/product.action";
import { Badge } from "@/components/ui/badge";
import ProductPrice from "@/components/shared/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductImages from "@/components/shared/product/product-images";
import AddToCart from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/card.actions";
import ReviewList from "./review-list";
import { auth } from "@/auth";



const ProductDetailsPage = async (props: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await props.params
    const product = await getProductByslug(slug)
    if (!product) notFound();


    const session = await auth()
    const userId = session?.user.id
    const cart = await getMyCart()
    return <>
        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Images colum */}
                <div className="col-span-2">
                    {/* <Image component> */}
                    <ProductImages images={product.images} />
                </div>
                {/* details column */}
                <div className="col-span-2 p-5">
                    <div className="flex flex-col gap-6">
                        <p>{product.brand}{product.category}</p>
                        <h1 className="h3-bold">{product.name}</h1>
                        <p>{product.rating} of {product.numReviews} Reviews</p>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <ProductPrice value={Number(product.price)}
                                className="w-24 text-green-700 bg-green-100 rounded-full px-5 py-2" />
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className="font-semibold">Description</p>
                        <p>{product.description}</p>
                    </div>
                </div>
                <div>
                    <Card>
                        <CardContent className="p-4">
                            <div className="mb-2 flex justify-between">
                                <div>Price</div>
                                <div>
                                    <ProductPrice value={Number(product.price)} />
                                </div>
                            </div>
                            <div className="mb-2 flex justify-between">
                                <div>Status</div>
                                {product.stock > 0 ? (<Badge variant='outline'>
                                    In Stock
                                </Badge>) : (
                                    <Badge variant='destructive'>Out of Stock</Badge>
                                )}
                            </div>
                            {product.stock > 0 && (
                                <div className="flex justify-center">
                                    {/* <Button className="w-full">Add to Card</Button> */}
                                    <AddToCart
                                        cart={cart}
                                        item={{
                                            productId: product.id,
                                            name: product.name,
                                            slug: product.slug,
                                            price: product.price,
                                            qty: 1,
                                            image: product.images![0]
                                        }} />
                                </div>

                            )}
                        </CardContent>
                    </Card>
                    <div>
                    </div>
                </div>
            </div>
        </section >
        <section className="mt-10">
            <h2 className="h2-bold">Customer Reviews</h2>
            <ReviewList userId={userId || ''}
                productId={product.id}
                productSlug={product.slug} />
        </section>
    </>;
}

export default ProductDetailsPage;
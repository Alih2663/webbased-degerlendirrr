import styles from './HomePage.module.css';
//import bannerImage from '../../assets/phones.jpeg';
import { useEffect, useState } from 'react';

import { getProducts } from '../../services/ProductService';
import ProductInfoCard from '../../components/ProductInfoCard/ProductInfoCard';

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsHandler(1, 6);
    }, []);

    const getProductsHandler = async (pageNumber, pageSize) => {
        var response = await getProducts(pageNumber, pageSize);

        if (!response.error) {
            const calculatedProducts = response.products.map((product) => {
                return calculateProduct(product);
            });

            setProducts(calculatedProducts);
        }
    };

    const calculateProduct = (product) => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            photo: product.photo,
            commentCount: getCommentCount(product.comments),
            avgScore: getAverageScore(product.comments),
            ratedCount: product.comments?.length,
        };
    };

    const getCommentCount = (comments) => {
        return comments?.filter((comment) => comment.text !== null).length;
    };

    const getAverageScore = (comments) => {
        return (
            comments?.reduce((acc, comment) => acc + comment.score, 0) /
                comments.length || 0
        );
    };

    return (
        <div>
            <div className={styles['banner-container']}>
                <div className={styles['banner-left']}>
                    <h1>dilediğin tüm ürünler</h1>
                    <p>notlandırr</p>
                </div>
                <div className={styles['banner-right']}>
                    <img
                        //src={bannerImage}
                        alt=''
                        className={styles['banner-image']}
                    />
                </div>
            </div>

            <section>
                {products.length > 0 && <ProductInfoCard products={products} />}
            </section>
        </div>
    );
}

export default HomePage;

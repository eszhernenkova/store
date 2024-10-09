import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Products.module.css";

const Products = ({ title, style = {}, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}

      <div className={styles.list}>
        {list.map(({ id, images, title, category: { name: cat }, price }) => {
          let parsedImages = [];
          try {
            // Проверяем, что images[0] существует и не является undefined или пустым
            if (images && images.length > 0 && images[0]) {
              // Пытаемся распарсить строку JSON
              parsedImages = JSON.parse(images[0]);
            }
          } catch (error) {
            console.error('Error parsing images:', error);
            parsedImages = []; // В случае ошибки, устанавливаем пустой массив
          }

          return (
            <Link to={`/products/${id}`} key={id} className={styles.product}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${parsedImages[0] || 'default-image-url'})` }} // Подставляем `default-image-url` если `parsedImages` пуст
              />

              <div className={styles.wrapper}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.cat}>{cat}</div>
                <div className={styles.info}>
                  <div className={styles.prices}>
                    <div className={styles.price}>{price}$</div>
                    <div className={styles.oldPrice}>
                      {Math.floor(price * 0.9)}$
                    </div>
                  </div>

                  <div className={styles.purchases}>
                    {Math.floor(Math.random() * 20 + 1)} purchased
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
  
};

export default Products;



    // <section className={styles.products} style={style}>
    //   {title && <h2>{title}</h2>}

    //   <div className={styles.list}>
    //     {list.map(({ id, images, title, category: { name: cat }, price }) => (
            
    //       <Link to={`/products/${id}`} key={id} className={styles.product}>
    //         <div
    //           className={styles.image}
    //           style={{ backgroundImage: `url(${images[0]})` }}
    //         />

    //         <div className={styles.wrapper}>
    //           <h3 className={styles.title}>{title}</h3>
    //           <div className={styles.cat}>{cat}</div>
    //           <div className={styles.info}>
    //             <div className={styles.prices}>
    //               <div className={styles.price}>{price}$</div>
    //               <div className={styles.oldPrice}>
    //                 {Math.floor(price * 0.9)}$
    //               </div>
    //             </div>

    //             <div className={styles.purchases}>
    //               {Math.floor(Math.random() * 20 + 1)} purchased
    //             </div>
    //           </div>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </section> 
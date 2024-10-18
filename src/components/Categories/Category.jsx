import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import styles from "../../styles/Category.module.css"

import { useGetProductsQuery } from '../../features/api/apiSlice';

import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const Category = () => {
    const { id } = useParams();

    const { list } = useSelector(({ categories }) => categories );

    const defaultValues = {
        title: "",
        price_min: 0,
        price_max: 0,
    };

    const defaultParams = {
        categoryId: id,
        limit: 5,
        offset: 0,
        ...defaultValues,
    };

    const [isEnd, setEnd] = useState(false);
    const [cat, setCat] = useState(null);
    const [items, setItems] = useState([]);
    const [values, setValues] = useState(defaultValues);
    const [params, setParams] = useState(defaultParams);

    const { data, isLoading, isSuccess } = useGetProductsQuery( params );

    useEffect(()=> {
        if(!id) return;

        //для смены товаров при переключении категории
        setValues(defaultValues);
        setItems([]); // очищаем текущие данные для новой загрузки
        setEnd(false); // сбросить конец списка, если новый запрос
        setParams({...defaultParams, categoryId: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (!isLoading && (!data || !Array.isArray(data))) {
            console.error('Data is either null or not an array');
            return;
        }

        if (data && data.length > 0) {
            const products = Object.values(data);
            setItems((_items) => [..._items, ...products]);
        }

        // строгая проверка перед обращением к data.length
        if (Array.isArray(data) && data.length === 0) {
            setEnd(true);
        }
    }, [data, isLoading]);



    // useEffect(()=> {
    //     if(!isLoading && !data && !data.length) return;

    //     const products = Object.values(data);

    //     if(!products.length) return;

    //     setItems((_items) => [..._items, ...products]);

    // }, [data, isLoading]);

    useEffect(() => {
        if(!id || !list || !list.length) return;

        const category = list.find((item) => item.id === id * 1)

        setCat(category);
    }, [ list, id ]);



    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setItems([]); // очищаем текущие данные для новой загрузки
        setEnd(false); // сбросить конец списка, если новый запрос
        setParams({ ...defaultParams, ...values });

    };

    const handleReset = () => {
        setValues(defaultValues);
        setParams(defaultParams);
        setEnd(false);
    };

  return (
    <section className={styles.wrapper}>
        <h2 className={styles.title}>{cat?.name}</h2>

        <form className={styles.filters} onSubmit={handleSubmit}>
            <div className={styles.filter}>
                <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange}
                    placeholder='Product name'
                    value={values.title} 
                    />
            </div>
            <div className={styles.filter}>
                <input 
                    type="number" 
                    name="price_min" 
                    onChange={handleChange}
                    placeholder='0'
                    value={values.price_min} 
                    />
                    <span>Price from</span>
            </div>
            
            <div className={styles.filter}>
                <input 
                    type="number" 
                    name="price_max" 
                    onChange={handleChange}
                    placeholder='0'
                    value={values.price_max} 
                    />
                    <span>Price to</span>
            </div>
            

            <button type="submit" hidden />
        </form>


        {isLoading ? (
            <div className="preloader">Loading...</div>
        ) : !isSuccess || !items.length ? (
            <div className={styles.back}>
                <span>No results</span>
                <button onClick={handleReset}>Reset</button>
            </div>
        ) : (
            <Products 
                title = ""
                products={items}
                style={{ padding: 0 }}
                amount = {items.length}
            />
        )}

        {!isEnd && (
            <div className={styles.more}>
                <button onClick={()=> setParams({ ...params, offset: params.offset + params.limit })}>
                    See more
                </button>
            </div>
        )}

        
    </section>
  )
}

export default Category;
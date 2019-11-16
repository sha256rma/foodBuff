import React from 'react'
import { MenuStyle, Food, FoodGrid, FoodLabel } from './Menu-Style'
import {RestaurantJSON} from '../../static/RestaurantJSON';
import { intToUSD } from '../common/intToUSD';

const RestaurantFood = RestaurantJSON.reduce((category, food) => {
    
    if (!category[food.section]) {
        category[food.section] = [];
    }

    category[food.section].push(food);
    return category;

}, {});

export const Menu = ({setOpenFood}) => {

    return (
        <MenuStyle>
            {Object.entries(RestaurantFood).map(([sectionName, foods], index) => (
                
                <div key={index}>
                    <h1>{sectionName}</h1>
                    <FoodGrid key={index}>
                        {foods.map((food, index ) => (
                            <Food 
                                key={index} 
                                img={food.img} 
                                onClick={()=> {
                                    setOpenFood(food)
                                }}
                            >
                                <FoodLabel>
                                    <div>{food.name}</div>
                                    <div>{intToUSD(food.price)}</div>
                                </FoodLabel>
                            </Food>
                        ))}
                    </FoodGrid>
                </div>

            ))}
        </MenuStyle>
    )
}
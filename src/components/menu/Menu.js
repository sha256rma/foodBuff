import React from 'react'
import { MenuStyle, Food, FoodGrid, FoodLabel } from './Menu-Style'
import {Registered_User_JSON} from '../../static/Registered_User_JSON';
import {VIP_JSON} from '../../static/VIP_JSON';
import {Visitor_JSON} from '../../static/Visitor_JSON';
import { intToUSD } from '../common/intToUSD';

const VIP_Food = VIP_JSON.reduce((category, food) => {
    
    if (!category[food.section]) {
        category[food.section] = [];
    }

    category[food.section].push(food);
    return category;

}, {});

const Visitor_Food = Visitor_JSON.reduce((category, food) => {
    
    if (!category[food.section]) {
        category[food.section] = [];
    }

    category[food.section].push(food);
    return category;

}, {});

const Registered_User_Food = Registered_User_JSON.reduce((category, food) => {
    
    if (!category[food.section]) {
        category[food.section] = [];
    }

    category[food.section].push(food);
    return category;

}, {});

export const Menu = ({setPopup, loggedIn}) => {
    
    let RenderFood = Visitor_Food;

    if (loggedIn) {
        if (loggedIn.uid === "gVJ0fK1zeAb8eThxIFMmfJLBfMv1") { //A VIP
            RenderFood = VIP_Food;
        } else if (loggedIn.uid === "87FPHnwUyfYA6PyoamdkkfXEnLG3") { //A registered user
            RenderFood = Registered_User_Food;
        }
    }

    return (
        <MenuStyle>
            {Object.entries(RenderFood).map(([sectionName, foods], index) => (
                
                <div key={index}>
                    <h1>{sectionName}</h1>
                    <FoodGrid key={index}>
                        {foods.map((food, index ) => (
                            <Food 
                                key={index} 
                                img={food.img} 
                                onClick={()=> {
                                    setPopup(food)
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
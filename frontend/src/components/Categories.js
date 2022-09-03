import React from 'react'
import Trips from './Trips'
const Categories = () => {

    const dataCategories = [
        {
            id: 1,
            name: 'Nature & Views'
        },
        {
            id: 2,
            name: 'Food Tours'
        },
        {
            id: 3,
            name: 'Art & History'
        }
    ]

    return (
        <div>
            <h1>Home</h1>
            {dataCategories.map((category, id) => (
                <div className="cards" key={id}>
                <h2> {category.name} </h2>
                <Trips category_id={category.id} />
                </div>
            ))}
        </div>
    )
}

export default Categories
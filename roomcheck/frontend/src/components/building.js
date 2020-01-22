import React from 'react'

const BuildingCard = ({building}) => {
    console.log(building);
    return (
        <div class="card-body">
            <h5 class="card-title">{building.name_text} | {building.id_text}</h5>
        </div>
    );
};

const BuildingList = ({buildings}) => {
    return (
        <div>
            <center><h1>Building List</h1></center>
            {buildings.map((building) => {
                return (
                    <BuildingCard building={building} />
                )
            })}
        </div>
    )
};

export default BuildingList

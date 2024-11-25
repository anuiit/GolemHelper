import React from 'react'

function TeamStats({ className, teamData }) {
    console.log("teamName:", teamData);
    return (
        <div className={`${className}`}>
            <div className='py-10 flex flex-col space-y-2 items-center'>
                <div className='grid grid-cols-3 px-2'>
                    <div className='flex flex-col text-xs items-start space-y-2'>
                        <span>72 700</span>
                        <span>721.64</span>
                        <span>- 24 100</span>
                        <span>8.1</span>
                        <span>1 000</span>
                        <span>10</span>
                        <span>0</span>

                    </div>

                    <div className='flex flex-col text-xs items-center space-y-2 justify-center text-nowrap'>
                        <span>Gold</span>
                        <span>Gold/min</span>
                        <span>Creeps</span>
                        <span>Creeps/min</span>
                        <span>Damage</span>
                        <span>Damage/min</span>
                        <span>Wards</span>
                        <span>Towers taken</span>
                    </div>

                    <div className='flex flex-col text-xs items-end space-y-2'>
                        <span>96 800</span>
                        <span>1020.02</span>
                        <span>+ 24 100</span>
                        <span>8.1</span>
                        <span></span>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default TeamStats
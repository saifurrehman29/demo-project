import { airportRoutes, airports } from "@/utils/constants";
import { useState } from "react";

const Component = () => {
    const [startValue, setStartValue] = useState('ISB');
    const [endValue, setEndValue] = useState('LHR');
    const [totalCost, setTotalCost] = useState(null);
    const [bestRoute, setBestRoute] = useState([]);

    const calculateCost = () => {

        const possibleRoutes = [];
        const visitedAirports = [];
    
        const findPossibleRoutes = (currentRoute, currentCost) => {
            const currentAirport = currentRoute[currentRoute.length - 1];
            visitedAirports.push(currentAirport);
    
            airportRoutes.forEach(route => {
                if (route.start === currentAirport) {
                    const nextAirport = route.end;
                    if (nextAirport === endValue) {
                        possibleRoutes.push({ route: [...currentRoute, endValue], cost: currentCost + route.cost });
                    } else if (visitedAirports.indexOf(nextAirport) === -1) {
                        findPossibleRoutes([...currentRoute, nextAirport], currentCost + route.cost);
                    }
                }
            });
    
            visitedAirports.pop();
        };
    
        findPossibleRoutes([startValue], 0);
        console.log(possibleRoutes)
        

        if (possibleRoutes.length > 0) {
            let selectedRoute = {route: [], cost: 99999}
            possibleRoutes.map((route => {
                if (route.cost < selectedRoute.cost) {
                    selectedRoute = route
                }
            }))
        
            setTotalCost(selectedRoute.cost);
            setBestRoute(selectedRoute.route)
        }
        else {
            alert('No possible routes')
        }
        
    };
    
    

    return (
        <>
        <div style={{ display: 'flex', gap: '40px' }}>
            <div>
                <p>Start</p>
                <select value={startValue} onChange={(e) => setStartValue(e.target.value)}>
                    {airports.filter(val => val !== endValue).map(airport => (
                        <option key={airport}>{airport}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>End</p>
                <select value={endValue} onChange={(e) => setEndValue(e.target.value)}>
                    {airports.filter(val => val !== startValue).map(airport => (
                        <option key={airport}>{airport}</option>
                    ))}
                </select>
            </div>
            <button onClick={calculateCost}>Calculate</button>
            
        </div>
        <div>
            {totalCost > 0 && 
                <>
                    <p>Route: {bestRoute.map((airport, index) => `${index > 0 ? ' => ': ''} ${airport}`)}</p>
                    <p>Total Cost: {totalCost}</p>
                </>
            }
        </div>
        </>
    );
};

export default Component;

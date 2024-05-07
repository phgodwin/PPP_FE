import "./SavingsCalculator.css";

function SavingsCalculator() {
    return ( 
        <div>
            <h1>Savings Calculator</h1>
            <container className="container_calculator">
                <label>Savings Name:</label>
                <input type="text"/>

                <label >Savings Goal (£):</label>
                <input type="double" min={0}/>

                <label >Save by? (date):</label>
                <input type="text"  />

                <label >Frequency:</label>
                <input type="text" />

                <button className="submit">Submit</button>
            </container>

            <container >

            </container>
        </div>
       

     );
}

export default SavingsCalculator;

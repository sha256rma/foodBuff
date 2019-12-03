import React from 'react';

class Homepage extends React.Component {

    //add functions here

    handleChange = () => {

        console.log("Hello");
    };

    render() {

        return (
            
            <div>

                <h1>main page</h1>
                <button onClick={() => this.handleChange()}> Activate Lasers </button>

            </div>
        )

    }
}

export default Homepage;
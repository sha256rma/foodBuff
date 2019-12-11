import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import Rating from 'react-rating';
import styled from 'styled-components';
import Floater from "react-floater";

const Wrapper = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #ccc 30%, #fff);
  border-radius: 10px;
  position: relative;
  width: 90vw;
  height: 60vh;
  overflow: scroll;
`;

const Title = styled.h2`
  margin-bottom: 30px;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  text-align: center;
`

class Cook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: [
                {name: 'Cook1'},
                {name: 'Cook2'},
                {name: 'Cook3'},
                {name: 'Cook4'},
                {name: 'Cook5'}
            ],
            type: [
                {name: 'Chicken over Brocoli'},
                {name: 'Chicken Tikka Masala'},
                {name: 'Eggplant Parmigiana'},
                {name: 'Vegan Beyond Meat Hamburger'},
                {name: 'Pot roast'}
            ],
            quantity: [
                {name: 'x4'},
                {name: 'x3'},
                {name: 'x20'},
                {name: 'x3'},
                {name: 'x6'}
            ],
            pay: [
                {name: '$7.20'},
                {name: '$20.75'},
                {name: '$6.50'},
                {name: '$9.20'},
                {name: '$15.10'}
            ],
        };
    }

    render() {

        const Content = ({ closeFn }) => (
            <Wrapper>
                <Title>Rate Salespeople</Title>
                <Rating/>
                <p>Complaint</p><input/>
                <p>Signature</p><input/>
            </Wrapper>
        );

        const warnings = ({ closeFn }) => (
            <Wrapper>
                <Title>Warnings for food quality from customers (Note: If you have more than 3 warnings, you will be laid off)</Title>
                    <Table
                    rowHeight={50}
                    rowsCount={1}
                    width={700}
                    height={600}
                    headerHeight={50}>
                    <Column
                    header={<Cell>Customer name</Cell>}
                    cell={<Cell>Kartikeya</Cell>}
                    width={200}
                    />
                    <Column
                    header={<Cell>Complaint</Cell>}
                    cell={<Cell>The food was cold!</Cell>}
                    width={500}
                    />
                </Table>
            </Wrapper>
        );

        return (
            <div>
                <h1>Cook portal</h1>
                <Table
                    rowsCount={this.state.name.length}
                    rowHeight={50}
                    headerHeight={50}
                    width={'100%'}
                    height={730}>
                    <Column
                    header={<Cell>Name</Cell>}
                    cell={props => (
                        <Cell {...props}>
                        <input value={this.state.name[props.rowIndex].name}/>
                        </Cell>
                    )}
                    width={550}
                    />
                    <Column
                    header={<Cell>Food item</Cell>}
                    cell={props => (
                        <Cell {...props}>
                        <input value={this.state.type[props.rowIndex].name}/>
                        </Cell>
                    )}
                    width={550}
                    />
                    <Column
                    header={<Cell>Supply Quantity</Cell>}
                    cell={props => (
                        <Cell {...props}>
                        <input value={this.state.quantity[props.rowIndex].name}/>
                        </Cell>
                    )}
                    width={550}
                    />
                    <Column
                    header={<Cell>Price of food item</Cell>}
                    cell={props => (
                        <Cell {...props}>
                        <input value={this.state.pay[props.rowIndex].name}/>
                        </Cell>
                    )}
                    width={550}
                    />
                </Table>

                <Floater component={Content}>
                    <Button>Rate Salespeople</Button>
                </Floater>

                
                <Floater component={warnings}>
                    <Button>Warnings</Button>
                </Floater>

            </div>
        )

    }
}

export default Cook;
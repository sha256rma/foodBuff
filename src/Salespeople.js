import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
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

class Salespeople extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: [
                {name: 'Salesperson1'},
                {name: 'Salesperson2'},
                {name: 'Salesperson3'},
                {name: 'Salesperson4'},
            ],
            type: [
                {name: 'Raw Chicken'},
                {name: 'Beef'},
                {name: 'Onions'},
                {name: 'Tomatoes'},
            ],
            pay: [
                {name: '$25 per lb'},
                {name: '$23 per lb'},
                {name: '$5 per lb'},
                {name: '$5 per lb'},
            ],
        };
    }

    render() {

        const warnings = ({ closeFn }) => (
            <Wrapper>
                <Title>Warnings for supplies ordered by cooks ((Note: If you have more than 3 warnings, you will be laid off)</Title>
                    <Table
                    rowHeight={50}
                    rowsCount={1}
                    width={700}
                    height={600}
                    headerHeight={50}>
                    <Column
                    header={<Cell>Cook name</Cell>}
                    cell={<Cell>Cook1</Cell>}
                    width={200}
                    />
                    <Column
                    header={<Cell>Complaint</Cell>}
                    cell={<Cell>Some of the supplies were rotten!</Cell>}
                    width={500}
                    />
                </Table>
            </Wrapper>
        );

        return (
            <div>
                <h1>Salesperson portal</h1>
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
                    header={<Cell>Food supply</Cell>}
                    cell={props => (
                        <Cell {...props}>
                        <input value={this.state.type[props.rowIndex].name}/>
                        </Cell>
                    )}
                    width={550}
                    />
                    <Column
                    header={<Cell>Price</Cell>}
                    cell={props => (
                        <Cell {...props}>
                        <input value={this.state.pay[props.rowIndex].name}/>
                        </Cell>
                    )}
                    width={550}
                    />
                </Table>

                <Floater component={warnings}>
                    <Button>Warnings</Button>
                </Floater>

            </div>
        )

    }
}

export default Salespeople;
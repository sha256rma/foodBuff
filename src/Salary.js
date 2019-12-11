import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import styled from 'styled-components';
import Floater from "react-floater";


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  text-align: center;
`

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

class Salary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: [
            {name: 'Cook1'},
            {name: 'Cook2'},
            {name: 'Cook3'},
            {name: 'Cook4'},
            {name: 'Cook5'},
            {name: 'Kartikeya Sharma'},
            {name: 'John'},
            {name: 'DeliveryPerson3'},
            {name: 'Salesperson1'},
            {name: 'Salesperson2'},
            {name: 'Salesperson3'}

        ],
        type: [
            {name: 'Cook'},
            {name: 'Cook'},
            {name: 'Cook'},
            {name: 'Cook'},
            {name: 'Cook'},
            {name: 'Delivery Person'},
            {name: 'Delivery Person'},
            {name: 'Delivery Person'},
            {name: 'Salesperson'},
            {name: 'Salesperson'},
            {name: 'Salesperson'},
        ],
        pay: [
            {name: '$23 per hour'},
            {name: '$25 per hour'},
            {name: '$18 per hour'},
            {name: '$18 per hour'},
            {name: '$50 per hour'},
            {name: '$5 per hour'},
            {name: '$5 per hour'},
            {name: '$5 per hour'},
            {name: '$2.23'},
            {name: '$25.22'},
            {name: '$19'},
        ],
    };
  }

  render() {


    const Content = ({ closeFn }) => (
        <Wrapper>
            <Title>All customer complaints</Title>
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
                cell={<Cell>John delivered the food too late and it was too cold!</Cell>}
                width={500}
                />
            </Table>
        </Wrapper>
    );

    return (
        <div>
        <h1>Manager payment and complaint portal</h1>
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
          header={<Cell>Type</Cell>}
          cell={props => (
            <Cell {...props}>
              <input value={this.state.type[props.rowIndex].name}/>
            </Cell>
          )}
          width={550}
        />
        <Column
          header={<Cell>Commision/Payment</Cell>}
          cell={props => (
            <Cell {...props}>
              <input value={this.state.pay[props.rowIndex].name}/>
            </Cell>
          )}
          width={550}
        />
      </Table>

        <Floater component={Content}>
            <Button>View customer complaints</Button>
        </Floater>

      </div>
    );
  }
}

export default Salary;
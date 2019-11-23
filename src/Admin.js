import React from 'react';
import { database } from './firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Floater from "react-floater";
import styled from "styled-components";

const Button = styled.button.attrs({
  onClick: props => props.handleClick
})`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  width: 100%;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Wrapper = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #ccc 30%, #fff);
  border-radius: 10px;
  position: relative;
  width: 90vw;
  height: 60vh;
`;

const Title = styled.h2`
  margin-bottom: 30px;
`;

const Group = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  color: palevioletred;
  display: block;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Label1 = styled.label`
  color: palevioletred;
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;


const Input = styled.input.attrs({
  required: true
})`
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  display: block;
  font-size: 20px;
  line-height: 1;
  max-width: 500px;
  padding: 10px;
  width: 100%;
`;

class Admin extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            customerName: "",
            customerEmail: "",
            customerOrder: [],
            customerId: [],
            customerOrderId: "",
            customerOrderTotal: 0,
            customerOrderDate: "",
            selected: null
        };

        this.getUserData();
    }

    timeConverter = (UNIX_timestamp) => {
        
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    getUserData = () => {
        let that = this;

        database
          .ref('orders/')
          .once('value')
          .then(function(snapshot) {
            const exists = snapshot.val() !== null;

            if (exists) {
                let data = snapshot.val();

                const dataArray = Object.values(data);
                
                const orderId = Object.keys(data);

                // {dataArray.map((item) => {     
                //     if(item.orderDate) {
                //         item.orderDate = that.timeConverter(item.orderDate);
                //     }
                // })}
                
                that.setState({ 
                    data: dataArray,
                    customerId: orderId
                })
            }
        });
    }

    render() {

        let data = this.state.data;
        let Id = this.state.customerId;

        const columns = [
            {
                Header: 'Date',
                accessor: 'orderDate'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Customer Name',
                accessor: 'displayName'
            },
            {
                Header: 'Order Total',
                accessor: 'total'
            },
            {
                Header: 'Status',
                accessor: 'status'
            }
        ]

        const Content = ({ closeFn }) => (
            <Wrapper>
                <Button handleClick={closeFn}>✖</Button>
                <Title>Customer Email: {this.state.customerEmail}</Title>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        closeFn();
                    }}
                >
                    <Group>
                        <Label>Order ID</Label>
                        <Label1>{this.state.customerOrderId}</Label1>
                        {/* <Input /> */}
                    </Group>
                    <Group>
                        <Label>Customer Name</Label>
                        <Label1>{this.state.customerName}</Label1>
                    </Group>
                    <Group>
                        <Label>Customer Order</Label>
                        {this.state.customerOrder.map((item) => {     
                            return (
                                <div style={{display: 'flex', marginTop: '10px'}}>
                                    <img src={item.img} width="100" height="50" />
                                    <Label1> {item.name} </Label1>
                                    <Label1> ({item.section}) </Label1>
                                    <Label1> ${item.price} </Label1>
                                    <Label1>x{item.quantity} </Label1>
                                </div>
                            )
                        })}
                    </Group>
                    <Group>
                        <Label>Name</Label>
                        <Label1>{this.state.customerName}</Label1>
                    </Group>

                    <button type="submit">SEND</button>
                </form>
            </Wrapper>
        );

        return (
            <div>

                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={15}
                    minRows={0}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo.original) {
                            return {
                                onClick: (e) => {
                                    
                                    this.setState({
                                        selected: rowInfo.index,
                                        customerName: rowInfo.original.displayName,
                                        customerEmail: rowInfo.original.email,
                                        customerOrder: rowInfo.original.order,
                                        customerOrderId: Id[rowInfo.index],
                                        customerOrderTotal: rowInfo.original.total,
                                        customerOrderDate: rowInfo.original.orderDate
                                    }) 
                                    console.log(this.state.customerOrder);
                                },
                                style: {
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                }
                            }
                        } else {
                            return {}
                        }
                    }}
                />

                <Button>
                                <Floater component={Content}>
                    <Button primary>MODAL</Button>
                </Floater>
                 </Button>



            </div>
        )

    }
}

export default Admin;
import React from 'react';
import { database } from './firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import chroma from 'chroma-js';
import Select from 'react-select';
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
  overflow: scroll;
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

// const Input = styled.input.attrs({
//   required: true
// })`
//   border-radius: 3px;
//   border: 2px solid palevioletred;
//   color: palevioletred;
//   display: block;
//   font-size: 20px;
//   line-height: 1;
//   max-width: 500px;
//   padding: 10px;
//   width: 100%;
// `;

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
            selected: null,
            cook: [],
            deliveryStatus: "",
            customerAddress: ""
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

                console.log(data)

                const dataArray = Object.values(data);
                
                const orderId = Object.keys(data);
                
                that.setState({ 
                    data: dataArray,
                    customerId: orderId
                })
            }
        });
    }

    handleChange = cook => {

        cook.forEach((item) => {
            this.setState({
                cook: [...this.state.cook,item.value,", "]
            });
        })
    };

    updateOrder = () => {

        database.ref(`orders/${this.state.customerOrderId}`).update({
            cook: this.state.cook, 
            deliveryStatus: "Bidding In Progress"
        });

        var contactEmail = this.state.customerEmail
        var contactName = this.state.customerName
        var lowestBid = "No bids yet"
        var orderTotal = this.state.customerOrderTotal
        var deliveryPerson = "No delivery person assigned"
        var address = this.state.customerAddress


        const delivery = database.ref(`delivery/${this.state.customerOrderId}`);
                
        delivery.set({
            contactEmail,
            contactName,
            lowestBid,
            orderTotal,
            deliveryPerson,
            address
        });

        window.location.reload();
    }

    render() {

        let data = this.state.data;
        let Id = this.state.customerId;

        const columns = [
            {
                Header: 'Order Date',
                accessor: 'orderDate'
            },
            {
                Header: 'Customer Email',
                accessor: 'customerEmail'
            },
            {
                Header: 'Customer Name',
                accessor: 'customerName'
            },
            {
                Header: 'Order Total',
                accessor: 'orderTotal'
            },
            {
                Header: 'Order Status',
                accessor: 'orderStatus'
            },
            {
                Header: 'Delivery',
                accessor: 'deliveryStatus'
            },
            {
                Header: 'Cook(s)',
                accessor: 'cook'
            }
        ]
        const colourOptions = [
            { value: 'Cook 1', label: 'Cook 1', color: '#00B8D9' },
            { value: 'Cook 2', label: 'Cook 2', color: '#0052CC' },
            { value: 'Cook 3', label: 'Cook 3', color: '#5243AA' },
            { value: 'Cook 4', label: 'Cook 4', color: '#FF5630' },
            { value: 'Cook 5', label: 'Cook 5', color: '#FF8B00' }
        ];

        const colourStyles = {
            control: styles => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? null
                        : isSelected
                        ? data.color
                        : isFocused
                        ? color.alpha(0.1).css()
                        : null,
                    color: isDisabled
                        ? '#ccc'
                        : isSelected
                        ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                        : data.color,
                    cursor: isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                    },
                };
            },
            multiValue: (styles, { data }) => {
                const color = chroma(data.color);
                return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
                };
            },
            multiValueLabel: (styles, { data }) => ({
                ...styles,
                color: data.color,
            }),
            multiValueRemove: (styles, { data }) => ({
                ...styles,
                color: data.color,
                ':hover': {
                backgroundColor: data.color,
                color: 'white',
                },
            }),
        };


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
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={colourOptions}
                            styles={colourStyles}
                            onChange={this.handleChange}
                        />
                        {this.state.customerOrder.map((item) => {     
                            return (
                                <div style={{display: 'flex', marginTop: '10px'}}>
                                    <img alt="Loading" src={item.img} width="210" height="125" />
                                    <Label1> {item.name} </Label1>
                                    <Label1> ({item.section}) </Label1>
                                    <Label1> ${item.price} </Label1>
                                    <Label1>x{item.quantity} </Label1>
                                </div>
                            )
                        })}
                    </Group>
                    <Group>
                        <Label>Delivery Status</Label>
                        <Label1>{this.state.deliveryStatus}</Label1>
                    </Group>

                    <button onClick={this.updateOrder}>Start Bidding and Close</button>
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
                                        customerName: rowInfo.original.customerName,
                                        customerEmail: rowInfo.original.customerEmail,
                                        customerOrder: rowInfo.original.customerOrder,
                                        customerOrderId: Id[rowInfo.index],
                                        customerOrderTotal: rowInfo.original.orderTotal,
                                        customerOrderDate: rowInfo.original.orderDate,
                                        cook: "",
                                        deliveryStatus: rowInfo.original.deliveryStatus,
                                        customerAddress: rowInfo.original.customerAddress
                                    }) 
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
                        <Button primary>Details</Button>
                    </Floater>
                 </Button>



            </div>
        )

    }
}

export default Admin;
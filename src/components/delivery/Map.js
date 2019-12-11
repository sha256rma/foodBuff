import React from 'react';
import ReactDOM from 'react-dom';
import { database } from '../../firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Floater from "react-floater";
import styled from "styled-components";
import Rating from 'react-rating';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';



const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '45%',
    top: '5%'
  }
};

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
  position: relative;
  top: 0;
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


export class CurrentLocation extends React.Component {
  
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;

    this.state = {
      data: [],
      customerContactName: "",
      customerContactInfo: "",
      customerId: [],
      customerOrderId: "",
      customerOrderTotal: 0,
      customerOrderDate: "",
      selected: null,
      lowestBid: "",
      deliveryPerson: "",
      customerAddress: "",
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };

    this.handleBid = this.handleBid.bind(this);
    this.handlePerson = this.handlePerson.bind(this);

    
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            data: [],
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
    this.getUserData();

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  openMap = () => {

    window.location.reload();

    this.Gmaps();
      
  }

  Gmaps = () => {
    var destination = encodeURIComponent(this.state.customerAddress);
    var origin = `${this.state.currentLocation.lat},${this.state.currentLocation.lng}`;
    var baseUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
    window.open(baseUrl, '_blank');
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  getUserData = () => {
    let that = this;

    database
      .ref('delivery/')
      .once('value')
      .then(function(snapshot) {
        const exists = snapshot.val() !== null;

        if (exists) {
            let data = snapshot.val();


            const dataArray = Object.values(data);

            const orderId = Object.keys(data);
            
            that.setState({ 
                data: dataArray,
                customerId: orderId
            })
        }
    });
  }

  closeWindow = () => {

    let that = this;
    
    database
      .ref(`delivery/${this.state.customerOrderId}/lowestBid`)
      .once('value')
      .then(function(snapshot) {
        const exists = snapshot.val() !== null;

        if (exists) {
          let data = snapshot.val();

          console.log(data)
          console.log(parseInt(that.state.lowestBid))
          if (data === "No bids yet") data = 1000000000;
          if (data > parseInt(that.state.lowestBid)) {
            database.ref(`delivery/${that.state.customerOrderId}`).update({
              deliveryPerson: that.state.deliveryPerson, 
              lowestBid: that.state.lowestBid
            });
          }
        }
    });

    window.location.reload()
  }

  handleBid(event) {
    this.setState({lowestBid: event.target.value});
  }

  
  handlePerson(event) {
    this.setState({deliveryPerson: event.target.value});
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
          map: this.map,
          google: this.props.google,
          mapCenter: this.state.currentLocation
        });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);

    let data = this.state.data;
    let Id = this.state.customerId;



    const columns = [
      {
          Header: 'Order Date',
          accessor: 'orderDate'
      },
      {
          Header: 'Customer Name',
          accessor: 'contactName'
      },
      {
          Header: 'Customer Email',
          accessor: 'contactEmail'
      },
      {
          Header: 'Order Total',
          accessor: 'orderTotal'
      },
      {
          Header: 'Address',
          accessor: 'address'
      },
      {
          Header: 'Delivery',
          accessor: 'deliveryPerson'
      },
      {
          Header: 'Lowest Bid',
          accessor: 'lowestBid'
      }
    ]

            const warnings = ({ closeFn }) => (
            <Wrapper>
                <Title>Warnings for food delivery from customers (Note: If you have more than 3 warnings, you will be laid off)</Title>
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
                    cell={<Cell>The food Arrived too late!</Cell>}
                    width={500}
                    />
                </Table>
            </Wrapper>
        );

    const Content = ({ closeFn }) => (
      <Wrapper>
          <Button handleClick={closeFn}>✖</Button>
          <form
              onSubmit={e => {
                  e.preventDefault();
                  closeFn();
              }}
          >
              <Group>
                  <Title>Order ID</Title>
                  <Label1>{this.state.customerOrderId}</Label1>
              </Group>
              <Group>
                  <Title>Customer Address</Title>
                  <Label1>{this.state.customerAddress}</Label1>
              </Group>
              <Group>
                  <Title>Submit Bid (Current lowest bid: {this.state.lowestBid})</Title>
                  <Input type="text" value={this.state.lowestBid} onChange={this.handleBid} />
              </Group>
              <Group>
                  <Title>Signature</Title>
                  <Input type="text" value={this.state.deliveryPerson} onChange={this.handlePerson} />
              </Group>
              <button onClick={this.openMap}>Start delivery</button>
              <Group>
                  <Title>You will be delivering to:</Title>
                  <Label1>{this.state.customerContactName} (Email: {this.state.customerContactInfo})</Label1>
              </Group>
              <Group>
                  <Title>Order details</Title>
                  <Label1>Ordered on: Wednesday, December 11 2019</Label1>
                  <Label1>Order total: ${this.state.customerOrderTotal} </Label1>
              </Group>

              <button onClick={this.closeWindow}>Submit bid</button>
          </form>
      </Wrapper>
    );

    const rating = ({ closeFn }) => (
      <Wrapper>
          <Button handleClick={closeFn}>✖</Button>
          <form
              onSubmit={e => {
                  e.preventDefault();
                  closeFn();
              }}
          >
            <p>Rate customer</p><Rating onClick={ (value) =>  database.ref(`ratings/delivery`).push({rating: value}) }/>

          </form>
      </Wrapper>
    );

    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>

        <Floater component={warnings}>
            <Button primary>Warnings</Button>
        </Floater>

        <Floater component={rating}>
            <Button primary>Rate Customer</Button>
        </Floater>
        
        {this.renderChildren()}

        <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%' }}>
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
                                  customerContactName: rowInfo.original.contactName,
                                  customerContactInfo: rowInfo.original.contactEmail,
                                  customerOrderId: Id[rowInfo.index],
                                  customerOrderTotal: rowInfo.original.orderTotal,
                                  customerOrderDate: rowInfo.original.orderDate,
                                  lowestBid: rowInfo.original.lowestBid,
                                  customerAddress: rowInfo.original.address
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
        </div>

        <Floater component={Content}>
            <Button primary>Order Details</Button>
        </Floater>

      </div>
    );
  }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};
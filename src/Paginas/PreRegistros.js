import React,{Component} from 'react';
import {Registros,RegistrosMaestros} from './Registros';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import classnames from 'classnames';
import { InfoConsumer } from '../context';

class PreRegistros extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
      render() {
        return (
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Estudiantes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Maestros
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Table>
                <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Reg.fecha</th>
            <th>Pagos</th>

          </tr>
        </thead>
        <tbody>
              <InfoConsumer>
                    {value=>{
                        return value.daEstudiantes.map(item=>{console.log("estTes",value.daEstudiantes)
                            return <Registros key={item.ID} item={item}/>;
                            
                        })
                    }}
                </InfoConsumer> 
                </tbody>       
                </Table>
              </TabPane>

              <TabPane tabId="2">
              <Table>
                <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
              <InfoConsumer>
                    {value=>{
                        return value.daMaestros.map(item=>{
                            return <RegistrosMaestros key={item.ID} item={item}/>;
                            
                        })
                    }}
                </InfoConsumer> 
                </tbody>       
                </Table>
              </TabPane>
            </TabContent>
          </div>
        );
      }
}

export default PreRegistros;

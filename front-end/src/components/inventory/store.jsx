import React, { Component } from "react";
import { loadData } from "../../utils/loadData";
import { Button } from '@material-ui/core';
import ItemDropdown from "../dropdowns/itemDropdown";
import MemberDropdown from "../dropdowns/memberDropdown";
import EmployeeDropdown from "../dropdowns/employeeDropdown";
import { Redirect } from 'react-router-dom';

class MakeSale extends Component {
    state = {
        inventory: [],
        members: [],
        employees:[],
        item_id: "",
        member_id: "",
        employee_id: "",
        stock: [],
        referrer: null,
        date_sold: new Date(),
        stock: []
    }

    async componentDidMount() {
        await this.getInfo();
        console.log(this.state)
    }

    getInfo = async () => {
        const inventoryInfo = await loadData(`http://localhost:3333/inventory`);
        const memberInfo = await loadData(`http://localhost:3333/member`);
        const employeeInfo = await loadData(`http://localhost:3333/employee`);
        

        this.setState({
            inventory: inventoryInfo,
            members: memberInfo,
            employees: employeeInfo,
            stock: inventoryInfo
        });
    }

    makeSale = async data => {
        const response = await fetch(`http://localhost:3333/sales/addsale`, {
            method: "POST",
            headers: {
                Accept: "application/json", "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const reply = await response;
        if (reply.status === 200) {
            alert("Sale Made!");
        }
        if(reply.status !== 200) {
            alert("Sale not Made");
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const data = this.state;
        this.makeSale(data);
        this.setState({referrer: '/inventory'})
    };

    handleChange = e => {
        const { name, value } = e.target;
        console.log(e);
        this.setState({
            [name]: value
        });
    };

    render() {
        const { inventory, members, employees, referrer } = this.state;
        if (referrer) return <Redirect to={referrer} />;

        return(
            <>
                <form onSubmit={this.handleSubmit} method="POST">
                    <ItemDropdown inventory={inventory} name="item_id"
                    handleChange={this.handleChange} />

                    <MemberDropdown members={members} name="member_id" handleChange={this.handleChange} />
                    
                    <EmployeeDropdown employees={employees} name="employee_id" handleChange={this.handleChange} />
                    
                    <Button color='primary' letiant='contained' type="submit">Make sale</Button>
                </form>
            </>
        )
    }
}

export default MakeSale;
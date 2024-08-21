import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListInvoice from './ListInvoice';
import AddInvoice from './AddInvoice';
import ViewInvoice from './ViewInvoice';
import App from './invoicePdf/App';
import AddPayroll from '../AddPayroll';


class InvoiceContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'Add_Invoice') {
            return <AddPayroll />;
        }else if (current === 'In_home') {
            return <ListInvoice />
        }else if (current === 'View_Invoice') {
            return <> <App /></>
        }else{
            return <ListInvoice />
        }
    }
    
    render() {
        return (
            <div>
                {this.Switcher()}
            </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (InvoiceContainer);
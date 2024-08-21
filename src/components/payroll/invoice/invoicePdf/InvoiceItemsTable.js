import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'
import InvoiceTableHeader2 from './InvoiceHeader2';
import InvoiceTableRow2 from './InvoiceTableRow2';
import InvoiceTableHeader3 from './InvoiceTableHeader3';
import InvoiceTableRow3 from './InvoiceTableRow3';

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#0467d2',
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View>
      <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice} />
        <InvoiceTableHeader2 />
        <InvoiceTableRow2 items={invoice} />
        <InvoiceTableHeader3 items={invoice} />
        <InvoiceTableRow3 items={invoice} />
        {/* <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} /> */}
        <InvoiceTableFooter items={invoice} />
      </View>
    </View>
    
  );
  
  export default InvoiceItemsTable
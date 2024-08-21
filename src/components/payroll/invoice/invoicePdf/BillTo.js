import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const BillTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>{typeof(invoice) === 'object' ? invoice.student : ''}</Text>
        <Text>{typeof(invoice) === 'object' ? invoice.studentAddress : ''}</Text>
        <Text>{typeof(invoice) === 'object' ? invoice.studentPhone : ''}</Text>
        <Text>{typeof(invoice) === 'object' ? invoice.studentEmail : ''}</Text>
        <Text style={styles.billTo}>Date: 01-20-2021</Text>
    </View>
  );
  
  export default BillTo
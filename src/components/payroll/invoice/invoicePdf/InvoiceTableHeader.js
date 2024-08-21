import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#0467d2'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#0467d2',
        backgroundColor: '#0467d2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'left',
        fontStyle: 'bold',
        flexGrow: 1,
        paddingLeft:8
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        color:'#ffffff',
        paddingTop:4
    },
    qty: {
        width: '40%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        color:'#ffffff',
        paddingTop:4
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '15%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Allowance</Text>
        <Text style={styles.qty}>Amount</Text>
        
    </View>
  );
  
  export default InvoiceTableHeader
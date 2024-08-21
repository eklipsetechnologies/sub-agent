import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#0467d2'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#0467d2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
        paddingLeft:10
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: '#ffffff',
        borderRightWidth: 0,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'center',
        paddingLeft: 9,
        marginLeft:10,
        borderLeftWidth: 1,
        borderColor:'#0467d2'
    },
  });


const InvoiceTableFooter = ({items}) => {
    // const total = items.map(item => item.qty * item.rate)
    //     .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
    return(    
        <View>
          <View style={styles.row}>
            <Text style={styles.description}>Total Items</Text>
            <Text style={styles.total}>#{items.total != '' ? items.total1 :''}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.description}>Total Payroll Element</Text>
            <Text style={styles.total}>#{items.total != '' ? items.total2 :''}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.description}>Amount Paid out</Text>
            <Text style={styles.total}>#{items.total != '' ? items.applyNum :''}</Text>
          </View>
        </View>
        
    )
};
  
  export default InvoiceTableFooter
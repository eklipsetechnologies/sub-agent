import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#0467d2'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#0467d2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '40%',
        borderRightColor: borderColor,
        borderRightWidth: 0,
        textAlign: 'left',
        paddingLeft: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingLeft: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

let array = [1,2,3,4,5,6]
const InvoiceTableRow3 = ({items}) => {
    const rows =  
    <View>
        {items.element && items.element.length > 0?
        <View>
            {items.element.map((el,i)=>
                <View key={i} style={styles.row} >
                <Text style={styles.description}>{el.name}</Text>
                <Text style={styles.description}>{el.operation}</Text>
                <Text style={styles.qty}>{el.percent}</Text>
            </View>
                )}
       
       
            </View>

            
        :
        <View></View>
        }
        
    </View>
        
    
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow3
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
const InvoiceTableRow = ({items}) => {
    const rows =  
    <View>
        {typeof(items.details) === 'object' ?
        <View>
        {items.details.st_0 && items.details.st_0 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.details.st_0}</Text>
                    <Text style={styles.qty}>{items.details.st2_0}</Text>
                </View>
            :
            <View></View>
        }
        {items.details.st_1 && items.details.st_1 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.details.st_1}</Text>
                    <Text style={styles.qty}>{items.details.st2_1}</Text>
                </View>
            :
            <View></View>
        }
        {items.details.st_2 && items.details.st_2 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.details.st_2}</Text>
                    <Text style={styles.qty}>{items.details.st2_2}</Text>
                </View>
            :
            <View></View>
        }
        {items.details.st_3 && items.details.st_3 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.details.st_3}</Text>
                    <Text style={styles.qty}>{items.details.st2_3}</Text>
                </View>
            :
            <View></View>
        }
        {items.details.st_4 && items.details.st_4 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.details.st_4}</Text>
                    <Text style={styles.qty}>{items.details.st2_4}</Text>
                </View>
            :
            <View></View>
        }
        {items.details.st_5 && items.details.st_5 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.details.st_5}</Text>
                    <Text style={styles.qty}>{items.details.st2_5}</Text>
                </View>
            :
            <View></View>
        }
        {items.details.st_6 && items.details.st_6 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.details.st_6}</Text>
                    <Text style={styles.qty}>{items.details.st2_6}</Text>
                </View>
            :
            <View></View>
        }
            </View>

            
        :
        <View></View>
        }
        
    </View>
        
    
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow
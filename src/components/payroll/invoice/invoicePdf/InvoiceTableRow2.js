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
const InvoiceTableRow2 = ({items}) => {
    const rows =  
    <View>
        {typeof(items.value2) === 'object' ?
        <View>
        {items.value2.st_0 && items.value2.st_0 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.value2.st_0}</Text>
                    <Text style={styles.qty}>{items.value2.st2_0}</Text>
                </View>
            :
            <View></View>
        }
        {items.value2.st_1 && items.value2.st_1 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.value2.st_1}</Text>
                    <Text style={styles.qty}>{items.value2.st2_1}</Text>
                </View>
            :
            <View></View>
        }
        {items.value2.st_2 && items.value2.st_2 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.value2.st_2}</Text>
                    <Text style={styles.qty}>{items.value2.st2_2}</Text>
                </View>
            :
            <View></View>
        }
        {items.value2.st_3 && items.value2.st_3 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.value2.st_3}</Text>
                    <Text style={styles.qty}>{items.value2.st2_3}</Text>
                </View>
            :
            <View></View>
        }
        {items.value2.st_4 && items.value2.st_4 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.value2.st_4}</Text>
                    <Text style={styles.qty}>{items.value2.st2_4}</Text>
                </View>
            :
            <View></View>
        }
        {items.value2.st_5 && items.value2.st_5 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.value2.st_5}</Text>
                    <Text style={styles.qty}>{items.value2.st2_5}</Text>
                </View>
            :
            <View></View>
        }
        {items.value2.st_6 && items.value2.st_6 !=="" ?
             <View style={styles.row} >
                    <Text style={styles.description}>{items.value2.st_6}</Text>
                    <Text style={styles.qty}>{items.value2.st2_6}</Text>
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
  
  export default InvoiceTableRow2
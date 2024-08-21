import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import logo from '../../../../assets/img/LOGOW.png'
import { Home } from '../../../../global/Home';


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 100,
        height: 45,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf:'center'
    }
  });
  
  const Invoice = ({invoice}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                <Image
                style={styles.logo}
                cache={false}
                // source={logo}
                src={logo}
                // source={typeof(invoice) === 'object' && typeof(invoice.school)==='object' ? `https://hrisapi.myprojectdev.org/imageapi.php?name=${invoice.school.logo1}` : 'https://hrisapi.myprojectdev.org/imageapi.php?name=sample.jpeg'}
                    />
                    
                    <InvoiceTitle title='Payment Receipt'/>
                    {/* <InvoiceNo invoice={invoice}/> */}
                    <BillTo invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                    {/* <InvoiceThankYouMsg /> */}
                </Page>
            </Document>
        );
  
  export default Invoice
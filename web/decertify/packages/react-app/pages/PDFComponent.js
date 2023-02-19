import React from 'react'
import { Document, Page, Image, View, StyleSheet, Text } from '@react-pdf/renderer'

export default function PDFComponent({dataURL}) {

    return (
        // <div>
            <Document>     
                    <Page  size={'B8'}>
                        <View >
                        <Image allowDangerousPaths src={dataURL} />

                        </View>

                    </Page>
            

            </Document>
        // </div>
    )
}

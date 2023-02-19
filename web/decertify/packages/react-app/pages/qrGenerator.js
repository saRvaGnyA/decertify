import React from 'react'
import QRCode from 'qrcode.react'
export default function qrGenerator({ valuestring, documentId }) {
    return (
        // <div>
            <QRCode
                id={documentId}
                value={valuestring}
                size={128}>

            </QRCode>

        // </div>
    )
}

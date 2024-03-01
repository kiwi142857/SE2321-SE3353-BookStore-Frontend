import { QRCode } from "antd";
import { useState } from "react";
import React from "react";

export default function JAccountQR(props) {
    const [qrValue, setQrValue] = useState(props.url);
    const [qrVisible, setQrVisible] = useState(false);

    const handleQrClick = () => {
        setQrVisible(true);
    };

    return (
        <div>
            <QRCode value={qrValue} visible={qrVisible} />
            <p> Scan the QRcode by Wechat or MySJTU</p>
        </div>
    );
}
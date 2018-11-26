import React from 'react';

import './NearTerm.css';
import {Detail} from '../../api/api';


let img1 = require("../../static/images/QRCode.jpg");

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        Detail1: {}
    };
    componentWillMount() {
        let id = this.props.location.state.ID;
        Detail(id).then((response) => {
            let data = response.DataResult;
            this.setState({
                Detail1: JSON.parse(JSON.stringify(data))
            })
        }).catch((error) => {
            console.log(error);
        })
    }


    render() {
        let Detail1 = this.state.Detail1;
        if (JSON.stringify(Detail1) === "{}") {
            return ""
        }
        return (<div className="nearTerm">
                {/*标题*/}
                <div className="nearTermLogo">
                    <div className="nearTermTitle">
                        <h4 className="nearTermTitleH4">
                            {this.props.local === "en" ?
                                <div dangerouslySetInnerHTML={{__html: Detail1.TitleEN}}></div> :
                                <div dangerouslySetInnerHTML={{__html: Detail1.TitleCN}}></div>
                            }</h4>
                        <p className="timeLineP">
                            <span>发布时间：{Detail1.LastModificationTime.split("T")[0]}</span>
                        </p>
                    </div>
                    <div className="line1"></div>
                    <ul className="newList1-ul">
                        <li className="newList1-li">
                            {this.props.local === "en" ?
                                <div dangerouslySetInnerHTML={{__html: Detail1.ContentEN}}></div> :
                                <div dangerouslySetInnerHTML={{__html: Detail1.ContentCN}}></div>}
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}
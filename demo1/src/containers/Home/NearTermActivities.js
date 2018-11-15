import React from 'react';
import axios from 'axios' ;
import './NearTermActivities.css';
let img1=require("../../static/images/QRCode.jpg")

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div className="nearTerm">
                {/*标题*/}
                <div className="nearTermLogo">
                    <div className="nearTermTitle">
                        <h4 className="nearTermTitleH4">活动标题活动标题活动标题活动标题</h4>
                        <p className="timeLineP">
                            <span>报名截止：2018.4.16 |</span>
                            <span>已报名：24 / 30  |</span>
                            <span>参观日期：2018.5.1  |</span>
                            <span>地点：联想总部东区创新展示中心1层</span>
                        </p>
                    </div>
                    <ul className="newList-ul">
                        <li className="newList-li">
                            <h4>活动内容</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
                                laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. </p>
                        </li>
                        <li className="newList-li">
                            <h4>活动安排</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
                                laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. </p>
                        </li>

                    </ul>
                    <div className="box">
                        <span className="line"> </span>
                        <span className="text">活动规范</span>
                        <span className="line"> </span>
                    </div>
                    <p className="ActivityStream">Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                        expetendis in mei. Mei an pericula euripidis, hinc partem ei est.Alienum phaedrum torquatos nec
                        eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem
                        ei est.</p>
                    <div className="QRCode">
                        <img src={img1} alt=""/>
                        <p>
                            扫描二维码，关注XXX公众号，快来报名参观吧~
                            欢迎━(*｀∀´*)ノ亻!
                        </p>


                    </div>
                </div>

            </div>
        )
    }
}
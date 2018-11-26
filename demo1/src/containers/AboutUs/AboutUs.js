import React from 'react';
import './AboutUs.css';
import { Tabs, Collapse} from 'antd';
import {StickyContainer, Sticky,} from 'react-sticky';
import {FormattedMessage} from 'react-intl';
import actions from "../../store/actions"
import {connect} from "react-redux";
import {GetTypeData, GetFAQList, GetFAQListByType} from "../../api/api";


const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
let img1 = require("../../static/images/photo-01.png");

const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({style}) => (
            <DefaultTabBar {...props} style={{...style, zIndex: 1, background: '#fff'}}/>
        )}
    </Sticky>
);

class AboutUs extends React.Component {
    state = {
        theme: 'light',
        current: '1',
        List: [],
        TypeData: [],
        ListByType: [],
        Value: ""

    };
    typeChange = (Value) => {
        if (Value == 0) {
            Value = "153"
        } else if (Value == 1) {
            Value = "154"
        } else if (Value == 2) {
            Value = "155"
        } else {
            Value = "156"
        }
        /*获取FAQ的类型数据*/
        GetFAQListByType(Value).then((response) => {
            let data = response.DataResult;
            console.log(data);
            this.setState({
                ListByType: data
            });
        })
    };

    componentWillMount() {
        GetFAQList().then((response) => {
            let data = response.DataResult;
            console.log(data);
            this.setState({
                List: data
            });
        }).catch((error) => {
            console.log(error);
        });
        /*获取FAQ类型*/
        GetTypeData().then((response) => {
            let data = response.DataResult;
            console.log(data);
            this.setState({
                TypeData: data
            });
        }).catch((error) => {
            console.log(error);
        });
        let Value = 154;
        GetFAQListByType(Value).then((response) => {
            let data = response.DataResult;
            this.setState({
                ListByType: data
            });
        })


    }


    render() {
        return (<div className="hallDiv">
                {/*标题*/}
                <div className="aboutDiv aboutTitle">
                    <div className="titleH4">
                        <h4>
                            <FormattedMessage
                                id="intl-AboutUS-ABOUTSUS "
                            /></h4>
                        <p>
                            <FormattedMessage
                                id="intl-AboutUS-happened "
                            /></p>
                    </div>
                </div>
                {/*FAQ页面*/}
                <div className="aboutDiv" onClick={this.GetFAQList}>
                    <div className="aboutLeft">
                        <Tabs tabPosition="left" style={{textAlign: "left"}} className="app-user">
                            {/*公司介绍*/}
                            <TabPane tab={
                                <FormattedMessage
                                    id="intl-AboutUS-Introduction"
                                />} key="1">
                                <div style={{width: "806px", height: "229px"}}>
                                    <img src={img1} alt="" style={{width: "100%", height: "100%", marginLeft: "39px"}}/>
                                </div>
                                <div style={{
                                    textAlign: "left",
                                    fontSize: "14px",
                                    width: "794px",
                                    height: "650px",
                                    marginTop: "48px",
                                    marginLeft: "39px",
                                    marginRight: "57px"

                                }}>
                                    <p style={{
                                        textIndent: "1.5em",
                                        paddingBottom: "30px",
                                        lineHeight: "32px",
                                        color: "#666666",
                                    }}><FormattedMessage
                                        id="intl-AboutUS-Paragraph1 "
                                    /></p>

                                    <p style={{
                                        textIndent: "2em",
                                        paddingBottom: "30px",
                                        lineHeight: "32px",
                                        color: "#666666",
                                        fontFamily: "Microsoft YaHei"
                                    }}><FormattedMessage
                                        id="intl-AboutUS-Paragraph2"
                                    /></p>

                                    <p style={{
                                        textIndent: "2em",
                                        paddingBottom: "30px",
                                        lineHeight: "32px",
                                        color: "#666666"
                                    }}>
                                        <FormattedMessage
                                            id="intl-AboutUS-Paragraph3"
                                        /></p>

                                    <p style={{
                                        textIndent: "2em",
                                        paddingBottom: "30px",
                                        lineHeight: "32px",
                                        color: "#666666"
                                    }}>
                                        <FormattedMessage
                                            id="intl-AboutUS-Paragraph4"
                                        /></p>
                                </div>
                            </TabPane>
                            {/*参观时间*/}
                            <TabPane tab={
                                <FormattedMessage
                                    id="intl-AboutUS-Admissions"
                                />} key="2">
                                <div className="aboutRight aboutUs">
                                    <h4>
                                        <i className="iconfont  icon-biao"> </i>
                                        <FormattedMessage
                                            id="intl-AboutUS-operationGuide"
                                        />
                                    </h4>
                                    <dl>
                                        <dt>
                                            <FormattedMessage
                                                id="intl-AboutUS-Hours"
                                            /></dt>
                                        <dd>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS-TheTimeThat"
                                                /></p>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS-TheTimeThat1"
                                                />
                                            </p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <FormattedMessage
                                                id="intl-AboutUS-Closed"
                                            /></dt>
                                        <dd>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS-ClosedTime"
                                                />
                                            </p>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS-ClosedTime1"
                                                />
                                            </p>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <FormattedMessage
                                                id="intl-AboutUS-Museum"
                                            /></dt>
                                        <dd>
                                            <p><em>
                                                <FormattedMessage
                                                    id="intl-AboutUS-Weekdays"
                                                /> : </em>
                                                <FormattedMessage
                                                    id="intl-AboutUS-Weekdays1"
                                                />

                                            </p>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS-Weekdays2"
                                                />
                                            </p>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS-Weekdays3"
                                                /></p>
                                            <p><em>
                                                <FormattedMessage
                                                    id="intl-AboutUS-Saturdays"
                                                /> : </em>
                                                <FormattedMessage
                                                    id="intl-AboutUS-Saturdays1"
                                                /></p>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS-Saturdays2"
                                                /></p>
                                        </dd>
                                    </dl>
                                    <h4><i className="a  icon-gantanhao"> </i>
                                        <FormattedMessage
                                            id="intl-AboutUS-VisitorsGuide"
                                        /></h4>
                                    <ul>
                                        <li>
                                            <FormattedMessage
                                                id="intl-AboutUS-VisitorsGuide1"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                id="intl-AboutUS-VisitorsGuide2"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                id="intl-AboutUS-VisitorsGuide3"
                                            /></li>
                                    </ul>
                                </div>
                            </TabPane>
                            {/*存包处*/}
                            <TabPane tab={
                                <FormattedMessage
                                    id="intl-AboutUS-Facilities"
                                />} key="3">
                                <div className="aboutRight aboutUs" style={{width: "890px", overflow: "hidden"}}>
                                    <div  style={{
                                        width: "813px",
                                        height: "216px",
                                        marginBottom: "38px",
                                        borderBottom: "1px  dashed #ccc"
                                    }}>
                                        <div style={{
                                            float: "left",
                                            width: "326px",
                                            height: "183px",
                                            marginRight: "38px"
                                        }}>
                                            <img src={img1} alt="" style={{width: "100%", height: "100%"}}/>
                                        </div>
                                        <div style={{
                                            textAlign: "left",
                                            float: "right",
                                            width: "400px",
                                            height: "183px"
                                        }}>
                                            <h3 style={{marginBottom: "29px"}}>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities1"
                                                />
                                            </h3>

                                            <p style={{fontSize: "14px", wordBreak: "break-all",
                                                wordWrap: "break-word"}}>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities2"
                                                /></p>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities3"
                                                />

                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: "813px",
                                        height: "216px",
                                        marginBottom: "38px",
                                        borderBottom: "1px  dashed #ccc"
                                    }}>
                                        <div style={{
                                            textAlign: "left",
                                            float: "left",
                                            width: "400px",
                                            height: "183px"
                                        }}>
                                            <h3 style={{marginBottom: "29px"}}>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities1"
                                                /></h3>
                                            <p style={{fontSize: "14px"}}>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities2"
                                                /></p>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities3"
                                                /></p>
                                        </div>
                                        <div style={{
                                            float: "right",
                                            width: "326px",
                                            height: "183px",
                                            marginRight: "38px"
                                        }}>
                                            <img src={img1} alt="" style={{width: "100%", height: "100%"}}/>
                                        </div>

                                    </div>
                                    <div style={{width: "813px", height: "183px", marginBottom: "38px"}}>
                                        <div style={{
                                            float: "left",
                                            width: "326px",
                                            height: "183px",
                                            marginRight: "38px"
                                        }}>
                                            <img src={img1} alt="" style={{width: "100%", height: "100%"}}/>
                                        </div>

                                        <div style={{
                                            textAlign: "left",
                                            float: "right",
                                            width: "400px",
                                            height: "183px"
                                        }}>
                                            <h3 style={{marginBottom: "29px"}}>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities1"
                                                />
                                            </h3>
                                            <p style={{fontSize: "14px"}}>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities2"
                                                /></p>
                                            <p>
                                                <FormattedMessage
                                                    id="intl-AboutUS- Facilities3"
                                                /></p>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            {/*疑问介绍*/}
                            <TabPane tab={
                                <FormattedMessage
                                    id="intl-AboutUS-FAQ"
                                />} key="4">

                                <div className="aboutRight">
                                    <div className="layui-tab">
                                        <StickyContainer>
                                            <Tabs defaultActiveKey="0" renderTabBar={renderTabBar}
                                                  onChange={this.typeChange}>

                                                {this.state.TypeData.map((item, i) => {
                                                    return <TabPane
                                                        tab={this.props.local === "en" ? item.ValueNameEN : item.ValueNameCN}
                                                        key={i} style={{height: 500}}
                                                        value={item.Value}>
                                                        <Collapse bordered={false} showArrow={false}>
                                                            {this.state.ListByType.map((item,i) => {
                                                                return <Panel
                                                                    header={`Q : ${this.props.local === "en" ? item.TitleEN : item.TitleCN}`}
                                                                    key={i} style={{color: "red !important"}}>
                                                                    <span
                                                                        style={{color: "#007aff", fontWeight: "bold"}}>A : </span>
                                                                     {this.props.local === "en" ?
                                                                        <p dangerouslySetInnerHTML={{__html: item.ContentEN}}
                                                                           style={{display: "inline-block"}}>

                                                                        </p> :
                                                                        <p dangerouslySetInnerHTML={{__html: item.ContentCN}}
                                                                           style={{display: "inline-block"}}>

                                                                        </p>}

                                                                </Panel>
                                                            })}
                                                        </Collapse>

                                                    </TabPane>

                                                })}
                                            </Tabs>
                                        </StickyContainer>
                                    </div>
                                </div>
                            </TabPane>
                            {/*导航路线*/}
                            <TabPane tab={
                                <FormattedMessage
                                    id="intl-AboutUS-Directions"
                                />} key="5">
                                <div className="aboutRight">
                                    <div className="layui-tab">
                                        <div style={{marginBottom: "20px"}}>
                                            <span>
                                                <FormattedMessage
                                                    id="intl-AboutUS-site"
                                                /></span>
                                            <span>
                                                  <FormattedMessage
                                                      id="intl-AboutUS-site1"
                                                  /></span>
                                        </div>
                                        <div style={{marginBottom: "40px"}}>
                                            <span>
                                                  <FormattedMessage
                                                      id="intl-AboutUS-Phone"
                                                  /></span>
                                            <span>1378163846</span>
                                        </div>
                                        <Tabs defaultActiveKey="1"   style={{ height:"500px"  }}>
                                            <TabPane tab="Driving" key="1">
                                                <div style={{width: "700px", }}>
                                                    <img src={img1} alt="" style={{width: "100%", height: "100%"}}/>
                                                </div>
                                            </TabPane>
                                            <TabPane tab="Parking for Tour Buses" key="2">
                                                <div style={{width: "700px", }}>
                                                    <img src={img1} alt="" style={{width: "100%", height: "100%"}}/>
                                                </div>
                                            </TabPane>
                                            <TabPane tab="Public transportation" key="3">
                                                <div style={{width: "700px"}}>
                                                    <img src={img1} alt="" style={{width: "100%", height: "100%"}}/>
                                                </div>
                                            </TabPane>
                                            <TabPane tab="Lenovo entrance" key="4">
                                                <div style={{width: "700px"}}>
                                                    <img src={img1} alt="" style={{width: "100%", height: "100%"}}/>
                                                </div>
                                            </TabPane>
                                        </Tabs>,
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>

                </div>
            </div>

        )
    }
}

export default connect(state => ({...state.Language}), actions.Language)(AboutUs)

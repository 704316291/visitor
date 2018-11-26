import React from 'react';
import {Form, message, Input, Select, Button, Radio, Table, Modal} from 'antd';
import {GetOccupation} from "../../api/api"
import {FormattedMessage} from 'react-intl';
import {connect} from "react-redux";
import actions from "../../store/actions";
import {conuntry} from "./country";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        visible: false,
        disabled: true,
        data: [],
        value: 1,
        OccupationObj: {},
        date: [],
        historyDate: {},
        dataSource: [{
            key: 0,
            Nationality: "",
            OrganizationName: "",
            TitlePosition: "",
            VisitorsNum: "",
        }]
    }

    /*上一步按钮*/
    handleBack = (e) => {
        e.preventDefault();
        let info = {
            cleanVis: false,
        }
        this.props.Clean(info);
        this.props.history.push("/Activities2");

    };
    /*下一步按钮*/
    handleNext = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (values.radioA === 1 && values.radioB === 2
                && values.radioC === 3 && values.radioD === 4) {
                let info = {
                    ...values, dataSource: this.state.dataSource,OccupationObj:this.state.OccupationObj};
                if (!err) {
                    this.props.addValue3(info);
               /*     localStorage.setItem("addValue3", values,);*/
                    this.props.history.push("/Activities5");
                    window.scrollTo(300, 350);
                }
            } else {
                message.warning('you do not agree to all,please re-select !!');
            }

        });

    };

    /*获取后台数据*/
    componentWillMount() {
        /*临时存储*/
        let cleanValue = this.props.cleanValue;
        if (cleanValue.cleanVis === true) {
            this.setState({
                historyDate: {}
            })
        } else {
            const {value} = this.props;
            if (value !== "") {
                this.setState({
                    dataSource: value.dataSource,
                    OccupationObj:value.OccupationObj,
                })
            }
            let history = this.props.value;
            if (history !== undefined || history !== '') {
                this.setState({
                    historyDate: {
                        Name: history.Name,
                        MobilePhone: history.MobilePhone,
                        EMail: history.EMail,
                        Nationality: history.Nationality,
                        Occupation: history.Occupation,
                        radioA: history.radioA,
                        radioB: history.radioB,
                        radioC: history.radioC,
                        radioD: history.radioD,
                    }
                })
            }
        }


        /*后台数据*/
        GetOccupation().then((response) => {
            let data = response.DataResult;
            this.setState({
                data: data
            });

        }).catch((error) => {
            console.log(error);
        });

    }


    /*删除*/
    handleDelete = (key) => {
        if (key <= 0) {
            message.info("至少需要有一条数据");
            return
        }
        const dataSource = this.state.dataSource;
        let newDateSource = dataSource.filter((item, index) => {

                return item.key !== Number(key)

        });
        this.setState({
            dataSource: newDateSource
        })
    }
    /*增加*/
    handleAdd = () => {
        const {dataSource} = this.state;
        let key = dataSource.length + 1;
        const newData = {
            key: key,
            Nationality: "",
            OrganizationName: "",
            TitlePosition: "",
            VisitorsNum: ""
        };
        this.setState({
            dataSource: [...dataSource, newData],
        });
    };
    /*关闭模态框*/
    updateDataSource = (dataSource) => {
        this.setState({
            dataSource: dataSource
        })
    }
    /*模态框出现*/
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    /*确定模态框*/
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    /*取消模态框*/
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleBack12 = (value) => {
        let OccupationObj = this.state.OccupationObj;
        this.state.data.forEach((item) => {
            if (item.Value === value.item.props.eventKey) {
                OccupationObj.Value = item.Value;
                OccupationObj.ValueNameEN = item.ValueNameEN;
                OccupationObj.ValueNameCN = item.ValueNameCN;
            }
            this.setState({
                Occupation: OccupationObj
            })
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {historyDate} = this.state;
        const {dataSource} = this.state;
        const addInfo = (e, name, key) => {
            const {getFieldValue,} = this.props.form;
            const {dataSource} = this.state;
            dataSource.forEach((item) => {
                    if (item.key ===Number(key)) {
                        switch(name) {
                            case 'Nationality':
                                const Nationality = getFieldValue(`Nationality${key}`);
                                item.Nationality = Nationality;
                                break;
                            case'OrganizationName':
                                const NameOrganization = getFieldValue(`OrganizationName${key}`);
                                item.OrganizationName = NameOrganization;
                                break;
                            case 'TitlePosition':
                                const TitlePosition = getFieldValue(`TitlePosition${key}`);
                                item.TitlePosition = TitlePosition;
                                break;
                            case 'VisitorsNum':
                                const NoOfVisitors = getFieldValue(`VisitorsNum${key}`);
                                item.VisitorsNum = NoOfVisitors;
                                break;
                        }
                    }
                }
            );
            this.updateDataSource(dataSource)
        };

        const columns = [
            {
                title: 'Nationality',
                dataIndex: 'Nationality',
                width: '10%',
                render: (text, record) => {
                    let Nationality = record.Nationality;
                    return (
                        getFieldDecorator(`Nationality${record.key}`, {
                            initialValue: Nationality,
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input  onBlur={(e) => addInfo(e, 'Nationality', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: 'Name of Organization',
                dataIndex: 'OrganizationName',
                width: '10%',
                required: true,
                render: (text, record) => {
                    let NameOfOrganization = record.OrganizationName;
                    return (
                        getFieldDecorator(`OrganizationName${record.key}`, {
                            initialValue: NameOfOrganization,
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'OrganizationName', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: 'Title / Position',
                dataIndex: 'TitlePosition',
                width: '10%',
                render: (text, record) => {
                    let TitlePosition = record.TitlePosition;
                    return (
                        getFieldDecorator(`TitlePosition${record.key}`, {
                            initialValue: TitlePosition,
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'TitlePosition', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: 'No. of Visitors',
                dataIndex: 'VisitorsNum',
                width: '10%',
                render: (text, record) => {
                    let VisitorsNum = record.VisitorsNum;
                    return (
                        getFieldDecorator(`VisitorsNum${record.key}`, {
                            initialValue: VisitorsNum,
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'VisitorsNum', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: 'Operation',
                dataIndex: 'opertor',
                key: 'opertor',
                width: '5%',
                render: (text, record) => {
                    return (<div style={{width: "50px", height: "10px"}}>
                            <span onClick={this.handleAdd} style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginRight: "20px",
                                cursor: "pointer"
                            }}> + </span>
                        <span style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginLeft: "20px",
                            marginBottom: "20px",
                            cursor: "pointer"
                        }}
                              onClick={() => this.handleDelete(`${record.key}`)}> - </span>
                    </div>)

                }
            }
        ];
        const columns1 = [
            {
                title: '国籍',
                dataIndex: 'Nationality',
                width: '10%',
                render: (text, record) => {
                    let Nationality = record.Nationality;
                    return (
                        getFieldDecorator(`Nationality${record.key}`, {
                            initialValue: Nationality,
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'Nationality', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: '来宾单位',
                dataIndex: 'OrganizationName',
                width: '10%',
                required: true,
                render: (text, record) => {
                    let NameOfOrganization = record.OrganizationName;
                    return (
                        getFieldDecorator(`OrganizationName${record.key}`, {
                            initialValue: NameOfOrganization,
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'OrganizationName', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: '职位',
                dataIndex: 'TitlePosition',
                width: '10%',
                render: (text, record) => {
                    let TitlePosition = record.TitlePosition;
                    return (
                        getFieldDecorator(`TitlePosition${record.key}`, {
                            initialValue: TitlePosition,
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'TitlePosition', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: '人数',
                dataIndex: 'VisitorsNum',
                width: '10%',
                render: (text, record) => {
                    let VisitorsNum = record.VisitorsNum;
                    return (
                        getFieldDecorator(`VisitorsNum${record.key}`, {
                            initialValue: VisitorsNum,
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'VisitorsNum', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: 'Operation',
                dataIndex: 'opertor',
                key: 'opertor',
                width: '5%',
                render: (text, record) => {
                    return (<div style={{width: "50px", height: "10px"}}>
                            <span onClick={this.handleAdd} style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginRight: "20px",
                                cursor: "pointer"
                            }}> + </span>
                        <span style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginLeft: "20px",
                            marginBottom: "20px",
                            cursor: "pointer"
                        }}
                              onClick={() => this.handleDelete(`${record.key}`)}> - </span>
                    </div>)

                }
            }
        ];

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const formItemLayoutA = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const radioStyle = {
            height: '30px',
            lineHeight: '30px',
        };


        return (<Form onSubmit={this.handleSubmit}>
                {/*名字*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities3-name"
                    />}
                    help=""
                >
                    {getFieldDecorator('Name', {
                        initialValue: historyDate && historyDate.Name,
                        rules: [{required: true, message: 'Please input your name!', whitespace: true}],
                    })(
                        <Input style={{width: "300px"}}/>
                    )}
                </FormItem>
                {/*手机*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities3-phone"
                    />}
                    help=""
                >
                    {getFieldDecorator('MobilePhone', {
                        initialValue: historyDate && historyDate.MobilePhone,
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(
                        <Input style={{width: '300px'}}/>
                    )}
                </FormItem>
                {/*邮箱*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities3-E-mail"
                    />}
                    help=""
                >
                    {getFieldDecorator('EMail', {
                        initialValue: historyDate && historyDate.EMail,
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input style={{width: '300px'}}/>
                    )}
                </FormItem>
                {/*国籍*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities3-Nationality"
                    />}
                    help=""
                >
                    {getFieldDecorator('Nationality', {
                        initialValue: historyDate && historyDate.Nationality,
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                        >
                            {conuntry.data.map((item) => {
                                return <Option  key={item.Id}  value={item.title}>
                                    {item.title}
                                </Option>
                            })}
                        </Select>,
                    )}
                </FormItem>
                {/*职业*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities3-Occupation"
                    />}
                    help=""
                >
                    {getFieldDecorator('Occupation', {
                        initialValue: historyDate.Occupation && historyDate.Occupation,
                        rules: [{
                            required: true, message: 'Please confirm your Occupation!',
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                        >
                            {this.state.data.map((item, i) => {
                                return <Option key={i} value={item.Value} onClick={this.handleBack12}>
                                    {this.props.local === "en" ? item.ValueNameEN : item.ValueNameCN}
                                </Option>
                            })}
                        </Select>
                    )}
                </FormItem>
                <h4 className="applyTitle">Visitors' Information</h4>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={this.props.local === "en" ? columns : columns1}
                    style={{width: 1000}}
                />
                <div className="applyTitle-border"></div>

                {/*单选框*/}
                <div className="applyForm-radio">
                    <dl>
                        <dt>
                            <em>*</em><span>I agree to the Terms and Conditions of the Lenovo service.
                            <a
                                style={{position: "relative", zIndex: 999, marginLeft: "10px"}}
                                onClick={this.showModal}>
                             Terms and Conditions
                            </a> </span>
                            <Modal
                                title="Basic Modal"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>


                            <FormItem
                                {...formItemLayoutA}
                                help=""
                            >
                                {getFieldDecorator('radioA', {
                                    initialValue: historyDate && historyDate.radioA,
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={1}>
                                            <FormattedMessage
                                                id="intl-Activities3-I agree"
                                            /></Radio>
                                        <Radio style={radioStyle} value={5}>
                                            <FormattedMessage
                                                id="intl-Activities3-I disagree"
                                            /></Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </dt>
                        <dt>
                            <em>*</em>I agree to the collection and use of personal information
                            <FormItem
                                {...formItemLayoutA}
                                help=""
                            >
                                {getFieldDecorator('radioB', {
                                    initialValue: historyDate && historyDate.radioB,
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={2}>
                                            <FormattedMessage
                                                id="intl-Activities3-I agree"
                                            /></Radio>
                                        <Radio style={radioStyle} value={6}>
                                            <FormattedMessage
                                                id="intl-Activities3-I disagree"
                                            /></Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </dt>
                        <dt>
                            <em>*</em>I agree to the collection and use of required personal information

                            <FormItem
                                {...formItemLayoutA}
                                help=""
                            >
                                {getFieldDecorator('radioC', {
                                    initialValue: historyDate && historyDate.radioC,
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={3}>
                                            <FormattedMessage
                                                id="intl-Activities3-I agree"
                                            /></Radio>
                                        <Radio style={radioStyle} value={7}>
                                            <FormattedMessage
                                                id="intl-Activities3-I disagree"
                                            /></Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>


                        </dt>
                        <dt>
                            <em>*</em>I agree to the collection and use of optional personal information
                            <a
                                style={{position: "relative", zIndex: 999, marginLeft: "10px"}}
                                onClick={this.showModal}>
                                Privacy Policy
                            </a>

                            <FormItem
                                {...formItemLayoutA}
                                help=""
                            >
                                {getFieldDecorator('radioD', {
                                    initialValue: historyDate && historyDate.radioD,
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={4}>
                                            <FormattedMessage
                                                id="intl-Activities3-I agree"
                                            /></Radio>
                                        <Radio style={radioStyle} value={8}>
                                            <FormattedMessage
                                                id="intl-Activities3-I disagree"
                                            /></Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </dt>
                    </dl>
                </div>
                {/*上一步，下一步*/}
                <FormItem style={{textAlign: "center"}}>
                    <Button htmlType="submit"
                            style={{textAlign: "center", marginRight: "30px"}} onClick={this.handleBack}>
                        <FormattedMessage
                            id="intl-Activities-Previous"
                        />
                    </Button>
                    <Button type="primary" htmlType="submit"
                            style={{textAlign: "center"}} disabled={this.state.flag} onClick={this.handleNext}>
                        <FormattedMessage
                            id="intl-Activities-Next"
                        />
                    </Button>
                </FormItem>
            </Form>


        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class Activities3 extends React.Component {
    render() {
        return (<div className="insideDiv">
            <div className="center">
                {/*步骤条*/}
                <ul className="timeLine">
                    <li className="active">
                        <i>1</i>
                        <p><FormattedMessage
                            id="intl-Activities-NumberOfVisitors"
                        /></p>
                    </li>
                    <li className="active">
                        <i>2</i>
                        <p><FormattedMessage
                            id="intl-Activities-NumberOfVisitors2"
                        /></p>
                    </li>
                    <li className="active">
                        <i>3</i>
                        <p><FormattedMessage
                            id="intl-Activities-Datails"
                        /></p>
                    </li>
                    <li>
                        <i>4</i>
                        <p><FormattedMessage
                            id="intl-Activities-Confirmation"
                        /></p>
                    </li>
                </ul>
                {/*文字*/}
                <dl className="applyDl">
                    <dt><FormattedMessage
                        id="intl-Activities3-details"
                    /></dt>
                </dl>
                <h4 className="applyTitle"><FormattedMessage
                    id="intl-Activities3-Information"
                /></h4>
                <WrappedRegistrationForm {...this.props}/>
            </div>
        </div>)
    }
}

connect(state => ({...state}), actions)(RegistrationForm);
export default connect(state => ({...state.Activities3, ...state.Language, ...state.Home}), {...actions.Activities3, ...actions.Language, ...actions.Home})(Activities3)



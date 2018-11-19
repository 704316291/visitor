import React from 'react';
import {Form, message, Input, Select, Button, Radio, Table} from 'antd';
import {GetOccupation} from "../../api/api"
import {FormattedMessage} from 'react-intl';
import {connect} from "react-redux";
import actions from "../../store/actions";

const Option = Select.Option;
const RadioGroup = Radio.Group;


const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        disabled: true,
        data: [],
        value: 1,
        date: [],
        historyDate: {},
        dataSource: [{
            key: 0,
            Nationality: "",
            NameOfOrganization: "",
            TitlePosition: "",
            NoOfVisitors: ""
        }]
    }
    /*上一步按钮*/
    handleBack = (e) => {
        e.preventDefault();
        this.props.history.push("/Activities2");

    };
    /*下一步按钮*/
    handleNext = (e) => {
        const {dataSource} = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (values.radioA === 1 && values.radioB === 2
                && values.radioC === 3 && values.radioD === 4) {
                let info = {
                    ...values, dataSource: this.state.dataSource
                }
                console.log(info);
                if (!err) {
                    this.props.addValue3(info);
                    localStorage.setItem("addValue3", values);
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
        const {value} = this.props;
        if (value !== "") {
            this.setState({
                dataSource: value.dataSource
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
        const dataSource = this.state.dataSource;
        let newDateSource = dataSource.filter((item) => {

            return item.key !== Number(key)

        });

        this.setState({
            dataSource: newDateSource
        })

    };
    /*增加*/
    handleAdd = () => {
        const {dataSource} = this.state;
        let key = dataSource.length + 1;
        const newData = {
            key: key,
            Nationality: "",
            NameOfOrganization: "",
            TitlePosition: "",
            NoOfVisitors: ""
        };
        this.setState({
            dataSource: [...dataSource, newData],
        });
    }

    updateDataSource = (dataSource) => {
        this.setState({
            dataSource: dataSource
        })
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {historyDate} = this.state;
        const {dataSource} = this.state;
        const addInfo = (e, name, key) => {
        const {getFieldValue,} = this.props.form;
        const {dataSource} = this.state;

        dataSource.forEach((item) => {
                    if (item.key === Number(key)) {
                        switch (name) {
                            case 'Nationality':
                                const Nationality = getFieldValue(`Nationality${key}`);
                                item.Nationality = Nationality;
                                break;
                            case'NameOfOrganization':
                                const NameOfOrganization = getFieldValue(`NameOfOrganization${key}`);
                                item.NameOfOrganization = NameOfOrganization;
                                break;
                            case 'TitlePosition':
                                const TitlePosition = getFieldValue(`TitlePosition${key}`);
                                item.TitlePosition = TitlePosition;
                                break;
                            case 'NoOfVisitors':
                                const NoOfVisitors = getFieldValue(`NoOfVisitors${key}`);
                                item.NoOfVisitors = NoOfVisitors;
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
                width: '13%',
                required:true,
                render: (text, record) => {
                    let Nationality = record.Nationality;
                    return (
                        getFieldDecorator(`Nationality${record.key}`, {
                            initialValue: Nationality,
                        })(
                            <input onBlur={(e) => addInfo(e, 'Nationality', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: 'Name of Organization',
                dataIndex: 'NameOfOrganization',
                width: '13%',
                required:true,
                render: (text, record) => {
                    let NameOfOrganization = record.NameOfOrganization;
                    return (
                        getFieldDecorator(`NameOfOrganization${record.key}`, {
                            initialValue: NameOfOrganization,
                        }, {
                            rules: [{required: true, message: 'Please input your text!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'NameOfOrganization', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: 'Title / Position',
                dataIndex: 'TitlePosition',
                width: '13%',
                render: (text, record) => {
                    let TitlePosition = record.TitlePosition;
                    return (
                        getFieldDecorator(`TitlePosition${record.key}`, {
                            initialValue: TitlePosition,
                        }, {
                            rules: [{required: true, message: 'Please input your name!', whitespace: true}],
                        })(
                            <input onBlur={(e) => addInfo(e, 'TitlePosition', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: 'No. of Visitors',
                dataIndex: 'NoOfVisitors',
                width: '13%',
                render: (text, record) => {
                    let NoOfVisitors = record.NoOfVisitors;
                    return (
                        getFieldDecorator(`NoOfVisitors${record.key}`, {
                            initialValue: NoOfVisitors,
                        })(
                            <input onBlur={(e) => addInfo(e, 'NoOfVisitors', `${record.key}`)}/>
                        )
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'opertor',
                key: 'opertor',
                width: '8%',
                render: (text, record) => {
                    return (<div style={{width:"50px", height:"10px"}}>
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
                                marginBottom:"20px",
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
                    />}>
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
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value= {this.props.local === "en" ?"China":"中国"}><FormattedMessage
                                id="intl-Activities3-China"
                            /></Option>
                            <Option value={ this.props.local === "en" ?"The British":"英国"}><FormattedMessage
                                id="intl-Activities3-TheBritish"
                            /></Option>
                            <Option value={ this.props.local === "en" ?"Japan":"日本"}><FormattedMessage
                                id="intl-Activities3-Japan"
                            /></Option>
                            <Option value={ this.props.local === "en" ?"The United States":"美国"}><FormattedMessage
                                id="intl-Activities3-TheUnitedStates"
                            /></Option>
                        </Select>,
                    )}
                </FormItem>
                {/*职业*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities3-Occupation"
                    />}
                >
                    {getFieldDecorator('Occupation', {
                        initialValue: historyDate && historyDate.Occupation,
                        rules: [{
                            required: true, message: 'Please confirm your Occupation!',
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option,) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

                        >
                            {this.state.data.map((item, i) => {
                                return <Option key={i}
                                               value={item.Value}>{this.props.local === "en" ? item.ValueNameEN : item.ValueNameCN}</Option>
                            })}
                        </Select>
                    )}
                </FormItem>
                <h4 className="applyTitle">Visitors' Information</h4>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    style={{width: 1000}}
                />
                <p className="applyP">
                    * The total number of visitors including yourself match the number of visitors you selected in
                    the previous step
                </p>
                <div className="applyTitle-border"></div>

                {/*单选框*/}
                <div className="applyForm-radio">
                    <dl>
                        <dt>
                            <em>*</em><span>I agree to the Terms and Conditions of the S/I/M service.</span>
                            <a href="">Terms and Conditions</a>
                            <FormItem
                                {...formItemLayoutA}
                            >
                                {getFieldDecorator('radioA', {
                                    initialValue: historyDate && historyDate.radioA,
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={1}>I agree</Radio>
                                        <Radio style={radioStyle} value={5}>I don't agree</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </dt>
                        <dt>
                            <em>*</em>I agree to the Terms and Conditions of the S/I/M service.
                            <a href="">Terms and Conditions</a>

                            <FormItem
                                {...formItemLayoutA}
                            >
                                {getFieldDecorator('radioB', {
                                    initialValue: historyDate && historyDate.radioB,
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={2}>I agree</Radio>
                                        <Radio style={radioStyle} value={6}>I don't agree</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </dt>
                        <dt>
                            <em>*</em>I agree to the Terms and Conditions of the S/I/M service.
                            <a href="">Terms and Conditions</a>
                            <FormItem
                                {...formItemLayoutA}
                            >
                                {getFieldDecorator('radioC', {
                                    initialValue: historyDate && historyDate.radioC,
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={3}>I agree</Radio>
                                        <Radio style={radioStyle} value={7}>I don't agree</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>


                        </dt>
                        <dt>
                            <em>*</em>I agree to the Terms and Conditions of the S/I/M service.
                            <a href="">Terms and Conditions</a>

                            <FormItem
                                {...formItemLayoutA}
                            >
                                {getFieldDecorator('radioD', {
                                    initialValue: historyDate && historyDate.radioD,
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={4}>I agree</Radio>
                                        <Radio style={radioStyle} value={8}>I don't agree</Radio>
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
                        上一步
                    </Button>
                    <Button type="primary" htmlType="submit"
                            style={{textAlign: "center"}} disabled={this.state.flag} onClick={this.handleNext}>
                        下一步
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
                        <p>Number of visitors</p>
                    </li>
                    <li className="active">
                        <i>2</i>
                        <p>Number of visitors</p>
                    </li>
                    <li className="active">
                        <i>3</i>
                        <p>Datails</p>
                    </li>
                    <li>
                        <i>4</i>
                        <p>Confirmation</p>
                    </li>
                </ul>
                {/*文字*/}
                <dl className="applyDl">
                    <dt>Please select the number of visitors by age group.</dt>
                    <dd>*Individual reservation can be made for a group of maximum 9 people</dd>
                </dl>

                <h4 className="applyTitle">Customer Information</h4>
                <WrappedRegistrationForm {...this.props}/>

            </div>
        </div>)
    }
}

connect(state => ({...state}), actions)(RegistrationForm);
export default connect(state => ({...state.Activities3, ...state.Language}), {...actions.Activities3, ...actions.Language})(Activities3)


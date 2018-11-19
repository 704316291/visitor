import React from 'react';
import './Activities.css';
import {DatePicker} from 'antd';
import {Form, Input, Select, Button} from 'antd';
import {FormattedMessage} from 'react-intl';
import {GetVisitPurpose} from "../../api/api"
import {GetVisitTime} from "../../api/api"
import {GetLMSMainIndustry} from "../../api/api"
import {connect} from "react-redux"
import actions from "../../store/actions"
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
class RegistrationForm extends React.Component {
    state = {
        data: [],
        DataResult: [],
        time: "",
        Industry: [],
        historyDate: {},
    };

    /*下一步按钮*/
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              values.VisitDate = values.VisitDate.format("YYYY-MM-DD");
                this.props.addValue1(values);
                window.scrollTo(300, 450);
                this.props.history.push("/Activities2")
            }
        });
    };
    /*获取数据*/
    componentWillMount() {
        /*临时存储数据*/
        let history = this.props.value;
        if (history !== undefined || history !== '') {
            this.setState({
                historyDate: {
                    VisitUnit: history.VisitUnit,
                    VisitDate: history.VisitDate,
                    VisitTime: history.VisitTime,
                    note: history.note,
                    Industry: history.Industry,
                    language: history.language,
                    VisitPurpose: history.VisitPurpose,
                }
            })

        }

        /*来访目的*/
        GetVisitPurpose().then((response) => {
            let data = response.DataResult;
            this.setState({
                data: data
            });
        }).catch((error) => {
            console.log(error);
        });
        /*来访时间*/
        GetVisitTime({
            applyDate: this.state.time
        }).then((response) => {
            let data = response.DataResult;
            this.setState({
                DataResult: data
            });
        }).catch((error) => {
            console.log(error);
        });
        /*职业*/
        GetLMSMainIndustry().then((response) => {
            let data = response.DataResult;
            this.setState({
                Industry: data
            });

        }).catch((error) => {
            console.log(error);

        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {historyDate} = this.state;
        const dateFormat = 'YYYY-MM-DD';
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
        return (
            <Form onSubmit={this.handleSubmit} style={{margin: 0}}>
                {/*日期*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-Dateofvisit"
                    />}>
                    {getFieldDecorator('VisitDate', {
                        initialValue: historyDate.VisitDate === undefined ? null : moment(historyDate.VisitDate, dateFormat),
                        rules: [{
                            required: true, message: 'Please input your Date of visit!',
                        }]
                    })(
                        <DatePicker style={{width: "300px"}}/>
                    )}
                </FormItem>
                {/*时间*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-VisitingTime"
                    />}>
                    {getFieldDecorator('VisitTime', {
                          initialValue: historyDate.VisitTime === undefined ? null : historyDate.VisitTime.split("-")[0] + ":00" + "-" + historyDate.VisitTime.split("-")[1],
                        rules: [{
                            required: true, message: 'Please input your Visiting time!',
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.DataResult.map((item, i) => {
                                return <Option key={i}
                                               value={item.Value}>{this.props.local === "en" ? item.TextEN : item.TextCN}</Option>
                            })}
                        </Select>,
                    )}
                </FormItem>
                {/*单位*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-VisitTheUnit"
                    />}
                >
                    {getFieldDecorator('VisitUnit', {
                        initialValue: historyDate && historyDate.VisitUnit,
                        rules: [{
                            required: true, message: 'Please confirm your password!',

                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input style={{width: "300px"}}/>
                    )}
                </FormItem>
                {/*来访行业*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-Subordinate"
                    />}
                >
                    {getFieldDecorator('Industry', {
                        initialValue: historyDate && historyDate.Industry,
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.Industry.map((item, i) => {
                                return <Option key={i}
                                               value={item.Value}>{this.props.local === "en" ? item.ValueNameEN : item.ValueNameCN}</Option>
                            })}
                        </Select>,
                    )}
                </FormItem>
                {/*来访目的*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-VisitingPurpose"
                    />}
                >
                    {getFieldDecorator('VisitPurpose', {
                        initialValue: historyDate.VisitPurpose && historyDate.VisitPurpose,
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.data.map((item, i) => {
                                return <Option key={i}
                                               value={item.Value}>{this.props.local === "en" ? item.ValueNameEN : item.ValueNameCN}</Option>
                            })}
                        </Select>,
                    )}
                </FormItem>
                {/*来访语言*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-language"
                    />}
                >
                    {getFieldDecorator('language', {
                        initialValue: historyDate && historyDate.language,
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }],
                    })(<Select
                            showSearch
                            style={{width: 300}}
                        >
                            <Option value={ this.props.local === "en" ?"Chinese":"中文"}>
                                <FormattedMessage
                                    id="intl-Activities-language1"
                                />
                            </Option>
                            <Option value={ this.props.local === "en" ?"Korean":"韩语"}>
                                <FormattedMessage
                                    id="intl-Activities-language2"
                                />
                            </Option>
                            <Option value={ this.props.local === "en" ?"Japanese":"日文"}>
                                <FormattedMessage
                                    id="intl-Activities-language3"
                                /></Option>
                            <Option value={ this.props.local === "en" ?"English":"英语"}>
                                <FormattedMessage
                                    id="intl-Activities-language4"
                                /></Option>
                            <Option value={ this.props.local === "en" ?"French":"法语"}>
                                <FormattedMessage
                                    id="intl-Activities-language5"
                                /></Option>
                        </Select>,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-Note"
                    />}>
                    {getFieldDecorator('note', {
                        initialValue: historyDate && historyDate.note,
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }],
                    })(
                        <textarea rows="4" cols="50" placeholder="请输入内容"
                                  style={{width: "535px", height: "110px", border: "1px solid #ccc"}}/>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{span: 12, offset: 5}}
                    style={{textAlign: "right", marginRight: "155px"}}
                >
                    <Button type="primary" htmlType="submit">
                        下一步
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class Activities extends React.Component {
    render() {
        return (<div className="insideDiv">
            <div className="center">
                <ul className="timeLine">
                    <li className="active">
                        <i>1</i>
                        <p>
                            <FormattedMessage
                                id="intl-Activities-NumberOfVisitors"
                            />
                        </p>
                    </li>
                    <li>
                        <i>2</i>
                        <p>
                            <FormattedMessage
                                id="intl-Activities-NumberOfVisitors2"
                            /></p>
                    </li>
                    <li>
                        <i>3</i>
                        <p>
                            <FormattedMessage
                                id="intl-Activities-Datails"
                            /></p>
                    </li>
                    <li>
                        <i>4</i>
                        <p>
                            <FormattedMessage
                                id="intl-Activities-Confirmation"
                            /></p>
                    </li>
                </ul>
                <dl className="applyDl">
                    <dt>
                        <FormattedMessage
                            id="intl-Activities-group"
                        /></dt>
                    <dd>
                        <FormattedMessage
                            id="intl-Activities-Individual"
                        /></dd>
                </dl>
                <h4 className="applyTitle">
                    <FormattedMessage
                        id="intl-Activities-CustomerInformation"
                    /></h4>
                <WrappedRegistrationForm {...this.props}/>
            </div>
        </div>)
    }
}

export default connect(state => ({...state.Activities, ...state.Language}), {...actions.Activities, ...actions.Language})(Activities)



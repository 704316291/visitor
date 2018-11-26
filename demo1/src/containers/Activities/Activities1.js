import React from 'react';
import './Activities.css';
import {Form, Input, Select, Button} from 'antd';
import {FormattedMessage} from 'react-intl';
import {GetVisitPurpose} from "../../api/api"
import {GetVisitTime} from "../../api/api"
import {GetLMSMainIndustry} from "../../api/api"
import {connect} from "react-redux"
import actions from "../../store/actions"

const FormItem = Form.Item;
const Option = Select.Option;
class RegistrationForm extends React.Component {
    state = {
        data: [],
        DataResult: [],
        time: "",
        Industry: [],
        historyDate: {},
        VisitPurposeObj:{},
    };

    /*下一步按钮*/
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let info={
                    ...values,VisitPurposeObj:this.state.VisitPurposeObj
                }
                this.props.addValue1(info);
                window.scrollTo(300, 450);
                this.props.history.push("/Activities2")
            }
        });
    };
    /*获取数据*/
    handleBack11 = (value) => {
        let VisitPurposeObj = this.state.VisitPurposeObj;
        this.state.data.forEach((item) => {
            console.log(item.Value);
            if (item.Value === value.item.props.eventKey) {
                VisitPurposeObj.Value = item.Value;
                VisitPurposeObj.ValueNameEN = item.ValueNameEN;
                VisitPurposeObj.ValueNameCN = item.ValueNameCN;
            }
      this.setState({
                VisitPurpose: VisitPurposeObj
            })
        })
    };
    componentWillMount() {
        /*临时存储数据*/
        console.log(this.props.value);
        let history = this.props.value;
        let cleanValue =this.props.cleanValue;
        if( cleanValue.cleanVis === true){
            this.setState({
                historyDate:{}
            })
        }else {
            const {value} = this.props;
            if (value !== "") {
                this.setState({
                    VisitPurposeObj:value.VisitPurposeObj
                })
            }
            if (history !== undefined) {
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
            applyDate:this.props.location.name||this.state.time
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
        const dateFormat = this.props.location.name;
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
                    />}
                    help="">
                    {getFieldDecorator('VisitDate', {
                        initialValue:dateFormat||historyDate.VisitDate ,
                        rules: [{
                            required: true,
                        }],
                    })(
                        <Input style={{width: "300px"}}  />
                    )}

                </FormItem>
                {/*时间*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-VisitingTime"
                    />}
                    help="">
                    {getFieldDecorator('VisitTime', {
                          initialValue: historyDate.VisitTime === undefined ? null :historyDate.VisitTime,
                        rules: [{
                            required: true,
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
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
                    help=""
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
                    help=""
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
                    help=""
                >
                    {getFieldDecorator('VisitPurpose', {
                        initialValue: historyDate.VisitPurpose && historyDate.VisitPurpose,
                        rules: [{
                            required: true,
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                        >
                            {this.state.data.map((item, i) => {
                                return <Option key={i} value={item.Value} onClick={this.handleBack11}>
                                    {this.props.local === "en" ? item.ValueNameEN : item.ValueNameCN}
                                    </Option>
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
                    help=""
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
                            <Option value={ this.props.local === "en" ?"English":"英语"}>
                                <FormattedMessage
                                    id="intl-Activities-language4"
                                /></Option>
                        </Select>,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-Note"
                    />}
                    help=""
                >
                    {getFieldDecorator('note', {
                        initialValue: historyDate && historyDate.note,
                        rules: [{
                            required: false,
                        }],
                    })(
                        <textarea rows="4" cols="50"
                                  style={{width: "535px", height: "110px", border: "1px solid #ccc",textIndent:"12px", letterSpacing:"2px"}}/>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{span: 12, offset: 5}}
                    style={{textAlign: "right", marginRight: "155px"}}
                >
                    <Button type="primary" htmlType="submit">
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

class Activities1 extends React.Component {
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

export default connect(state => ({...state.Activities1, ...state.Language,...state.Home}), {...actions.Activities1, ...actions.Language,...actions.Home})(Activities1)



import React from 'react';
import {Form, Input, Button, message} from 'antd';
import {FormattedMessage} from 'react-intl';
import actions from "../../store/actions"
import {connect} from 'react-redux';

const FormItem = Form.Item;
class RegistrationForm extends React.Component {
    state = {
        totalPeople: 0,
        historyDate: {},
    };
    /*上一步*/
    handleBack = (e) => {
        e.preventDefault();
        this.props.history.push("/Activities");
    };
    /*四个input框*/
    totalPeo = () => {
        const {form} = this.props;
        let values = form.getFieldsValue();
        let totalA, totalB, totalC, totalD;
        if (values.UnderTwelve === undefined) {
            totalA = 0
        } else {
            totalA = Number(values.UnderTwelve)
        }
        if (values.ThirteenToEighteen === undefined) {
            totalB = 0
        } else {
            totalB = Number(values.ThirteenToEighteen)
        }
        if (values["CollegeStudents"] === undefined) {
            totalC = 0
        } else {
            totalC = Number(values["CollegeStudents"])
        }
        if (values["Adults"] === undefined) {
            totalD = 0
        } else {
            totalD = Number(values["Adults"])
        }
        let totalPeople = (totalA + totalB + totalC + totalD);
        this.setState({
            totalPeople: totalPeople
        });
        return totalPeople
    };

    /*下一步*/
    handleSubmit = (e) => {
        e.preventDefault();
        const {form} = this.props;
        let values = form.getFieldsValue();
        let totalPeople = (Number(values["UnderTwelve"]) + Number(values["ThirteenToEighteen"]) + Number(values["CollegeStudents"]) + Number(values["Adults"]));
        if (totalPeople > 30) {
            message.warning('人数总和不能超过三十，请重新输入！');
        } else {
            this.props.form.validateFieldsAndScroll((err, values) => {
                let info={
                    ...values,totalPeople:this.state.totalPeople
                }
                if (!err) {
                    this.props.addValue2(info);
                    localStorage.setItem("addValue2", values);
                    window.scrollTo(300, 350);
                    this.props.history.push("/Activities3");
                    console.log('Received values of form: ', values);
                }
            });
        }
    };


    componentWillMount() {
        /*临时存储*/
        const {value}=this.props;
        if(value.totalPeople !== undefined){
            this.setState({
                totalPeople:value.totalPeople
            })
        }
        let history = this.props.value;
        if (history !== undefined || history !== '') {
            this.setState({
                historyDate: {
                    UnderTwelve: history.UnderTwelve,
                    ThirteenToEighteen: history.ThirteenToEighteen,
                    CollegeStudents: history.CollegeStudents,
                    Adults: history.Adults,
                    Industry: history.Industry,
                    language: history.language,
                    VisitPurpose: history.VisitPurpose,
                }
            })

        }
    }

    render() {
        /*临时储存*/
        const {historyDate} = this.state;
        const {getFieldDecorator} = this.props.form;
        /*样式*/
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
        return <Form onSubmit={this.handleSubmit}>
            {/*12岁以下*/}
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage
                    id="intl-Activities2-Under"
                />}
                help={<FormattedMessage
                    id="intl-Activities2-Elementary"
                />}
            >
                {getFieldDecorator("UnderTwelve", {
                    initialValue: historyDate && historyDate.UnderTwelve,
                    rules: [{
                        required: true , message: 'Please input your number!',
                    }],
                })(
                    <Input style={{width: "300px"}} onBlur={this.totalPeo} type="number" min="0"
                           placeholder="Please input the number"
                         />
                )}
            </FormItem>
            {/*13岁到18*/}
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage
                    id="intl-Activities2-Eighteen"
                />}

            >
                {getFieldDecorator('ThirteenToEighteen', {
                    initialValue: historyDate && historyDate.ThirteenToEighteen,
                    rules: [{patten: /^\+?[1|2]\d*$/, message: 'Please input your number!', required: true,},
                        {validator: "this.validateToNextPassword"}
                    ],
                })(
                    <Input placeholder="Please input the number" min="0" onBlur={this.totalPeo} style={{width: "300px"}}
                           type="number"
                          />
                )}
            </FormItem>
            {/*大学生*/}
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage
                    id="intl-Activities2-Students"
                />}>
                {getFieldDecorator('CollegeStudents', {
                    initialValue: historyDate && historyDate.CollegeStudents,
                    rules: [{
                        required: true, message: 'Please input your number!'
                    }, {
                        whitespace: true,
                    }, {
                        validator: this.compareToFirstPassword,
                    }],
                })(
                    <Input placeholder="Please input the number" min="0" onBlur={this.totalPeo} style={{width: "300px"}}
                           type="number"
                         />
                )}
            </FormItem>
            {/*成年人*/}
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage
                    id="intl-Activities2-Adults"
                />}
            >
                {getFieldDecorator('Adults', {
                    initialValue: historyDate && historyDate.Adults,
                    rules: [{
                        required: true, message: 'Please input your number!'
                    }, {
                        validator: this.compareToFirstPassword,
                    }],
                })(
                    <Input placeholder="Please input the number" onBlur={this.totalPeo} style={{width: "300px"}} min="0"
                           type="number"
                        />
                )}
            </FormItem>
            <div>
                <p style={{fontSize: "14px", paddingLeft: "240px", marginBottom: "10px"}}>
                    Aotal number of visitors <span style={{color: "red", padding: "0 10px"}}>
                    {this.state.totalPeople}</span> People.</p>
            </div>
            <FormItem style={{textAlign: "center"}}>
                <Button
                    style={{textAlign: "left", marginRight: "30px"}} onClick={this.handleBack}>
                    上一步
                </Button>
                <Button type="primary" htmlType="submit"
                        style={{textAlign: "right"}}>
                    下一步
                </Button>
            </FormItem>
        </Form>
    }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
class Activities2 extends React.Component {
    render() {
        return (<div className="insideDiv">
                <div className="center">
                    <ul className="timeLine">
                        <li className="active">
                            <i>1</i>
                            <p>Number of visitors</p>
                        </li>
                        <li className="active">
                            <i>2</i>
                            <p>Number of visitors</p>
                        </li>
                        <li>
                            <i>3</i>
                            <p>Datails</p>
                        </li>
                        <li>
                            <i>4</i>
                            <p>Confirmation</p>
                        </li>
                    </ul>
                    <dl className="applyDl">
                        <dt>Please select the number of visitors by age group.</dt>
                        <dd>*Individual reservation can be made for a group of maximum 9 people</dd>
                    </dl>
                    <h4 className="applyTitle">Customer Information</h4>
                    <WrappedRegistrationForm {...this.props}/>
                </div>
            </div>
        )
    }
}
export default connect(state => ({...state.Activities2, ...state.Language}), {...actions.Activities2, ...actions.Language})(Activities2)


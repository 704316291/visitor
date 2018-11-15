import React from 'react';
/*import './Activities.css';*/
import actions from "../../store/actions";
import {connect} from "react-redux";
import {Sumbit} from "../../api/api.js"
import {Form} from "antd/lib/index";
import {Button, message, Table} from 'antd';
import {FormattedMessage} from 'react-intl';
import {GetLMSMainIndustry, GetOccupation, GetVisitPurpose, GetVisitTime} from "../../api/api";

const FormItem = Form.Item;


class Activities5 extends React.Component {
    state = {
        disabled: true,
        SumBit: {},
        dataSource: [],
        DataResult: [],
        Industry: [],
        data: []
    };

    componentWillMount() {
        let values1 = this.props.Activities.value;

    }

    /*上一步按钮*/
    handleBack = (e) => {
        e.preventDefault();
        this.props.history.push("/Activities3")
    };
    /*下一步按钮*/
    handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            RequestDate: "2018-10-23T05:59:11.873Z",
            VisitDate: "2018-10-23T05:59:11.873Z",
            VisitTime: this.props.Activities.value.VisitTime,
            VisitUnit: this.props.Activities.value.VisitUnit,
            Industry: this.props.Activities.value.Industry,
            Language: this.props.Activities.value.Language,
            Note: this.props.Activities.value.Note,
            UnderTwelve: this.props.Activities2.value.UnderTwelve,
            ThirteenToEighteen: this.props.Activities2.value.ThirteenToEighteen,
            CollegeStudents: this.props.Activities2.value.CollegeStudents,
            Adults: this.props.Activities2.value.Adults,
            Name: this.props.Activities3.value.values.Name,
            MobilePhone: this.props.Activities3.value.values.MobilePhone,
            EMail: this.props.Activities3.value.values.EMail,
            Nationality: this.props.Activities3.value.values.Nationality,
            Occupation: this.props.Activities3.value.values.Occupation,
            /*    Creator: ""string"",*/
            /* CreationTime: ""2018-10-23T05:59:11.873Z"",
             LastModifier"": ""string"",
             LastModificationTime: ""2018-10-23T05:59:11.873Z"",
             GroupApplyOrderItemCollection: [
             {
                 ID: ""string"",
                 OrderID: ""string"",
                 Nationality: ""string"",
                 OrganizationName"": ""string"",
                 TitlePosition: ""string"",
                 VisitorsNum: 0*/
        };
        Sumbit(obj).then((response) => {
            let data = response.DataResult;
            if (data) {
                message.warning('提交成功');
            } else {
                message.warning('提交失败');
            }
        });

    };


    render() {
        console.log(this.props.local);
        const formItemLayout = {
            labelCol: {
                xs: {span: 14},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        console.log(this.state.SumBit);

        const totality = this.props.Activities2.e;
        console.log(totality);
     /*   let values1 = this.props.Activities.value;

        let values2 = this.props.Activities2.value;

        let values3 = this.props.Activities3.value.values;*/

     /*   let ary1 = Object.keys(values1);
        let ary2 = Object.keys(values2);
        let ary3 = Object.keys(values3);*/
        const columns = [
            {
                title: 'Nationality',
                dataIndex: 'Nationality',
                width: '13%',
            }, {
                title: 'Name of Organization',
                dataIndex: 'NameOfOrganization',
                width: '13%',
            }, {
                title: 'Title / Position',
                dataIndex: 'TitlePosition',
                width: '13%',
            }, {
                title: '*No. of Visitors',
                dataIndex: 'NoOfVisitors',
                width: '13%',
            },
        ];
        /*步骤条*/
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
                        <li className="active">
                            <i>3</i>
                            <p>Datails</p>
                        </li>
                        <li className="active">
                            <i>4</i>
                            <p>Confirmation</p>
                        </li>
                    </ul>
                    <dl className="applyDl">
                        <dt>Please select the number of visitors by age group.</dt>
                        <dd>*Individual reservation can be made for a group of maximum 9 people</dd>
                    </dl>
                    {/*第一部分*/}
                    <h4 className="applyTitle">Customer Information</h4>
                    <Form style={{margin: 0}}>
                        {/*名字*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities3-name"
                            />}>
                            {this.props.Activities3.value.Name}
                        </FormItem>
                        {/*手机*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities3-phone"
                            />}
                        >
                            {this.props.Activities3.value.MobilePhone}
                        </FormItem>
                        {/*邮箱*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities3-E-mail"
                            />}
                        >

                            {this.props.Activities3.value.EMail}
                        </FormItem>
                        {/*国籍*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities3-Nationality"
                            />}
                        >
                            {this.props.Activities3.value.Nationality}

                        </FormItem>
                        {/*职业*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities3-Occupation"
                            />}
                        >
                            {this.props.Activities3.value.Occupation}
                        </FormItem>
                        {/*第二部分*/}
                        <h4 className="applyTitle"> Visiting Group Information </h4>
                        {/*日期*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-Dateofvisit"
                            />}
                        >
                            {this.props.Activities.value.VisitDate}
                        </FormItem>
                        {/*来访语言*/}
                        <FormItem
                            {...formItemLayout}
                            label=" Visiting language"
                        >
                            {this.props.Activities.value.language}
                        </FormItem>
                        {/*人员总数*/}
                        <FormItem
                            {...formItemLayout}
                            label="Number of Visitors"
                        >
                            {this.props.Activities2.value.totalPeople}People
                            <p> ( Under 12 years : {this.props.Activities2.value.UnderTwelve}People\ 13 to 18
                                years: {this.props.Activities2.value.ThirteenToEighteen}People\ CollegeStudents
                                : {this.props.Activities2.value.CollegeStudents}People\
                                Adults:{this.props.Activities2.value.Adults}People)</p>
                        </FormItem>
                        {/*注意事项*/}
                        <FormItem
                            {...formItemLayout}
                            label="Note：(Special requests)">
                            {this.props.Activities.value.note}
                        </FormItem>
                        {/*单位*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-VisitTheUnit"
                            />}
                        >
                            {this.props.Activities.value.VisitUnit}
                        </FormItem>
                        {/*来访行业*/}
                        <FormItem
                            {...formItemLayout}
                            label="Subordinate to the industry"
                        >
                            {this.props.Activities.value.Industry}
                        </FormItem>
                        {/*来访目的*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-VisitingPurpose"
                            />}
                        >
                            {this.props.Activities.value.VisitPurpose}
                        </FormItem>


                    </Form>


                    <h4 className="applyTitle">Visitor‘s Information</h4>
                    <Table
                        bordered
                        dataSource={this.props.Activities3.value.dataSource}
                        columns={columns}
                        style={{width: 1000}}
                    />
                    {/*红色字体*/}
                    <div className="applyForm-radio" style={{marginBottom: "40px"}}>
                        <ul className="applyVisitor-ul">
                            <li>
                                * Your Reservation will to confirmed via email and by text message
                            </li>
                            <li>
                                * I agree to the collection and use of personal information.
                            </li>
                            <li>
                                * I agree to the Terms and Conditions of the S/I/M service.
                            </li>
                            <li>
                                * I agree to the collection and use of optional personal information.
                            </li>
                            <li>
                                * I agree to the collection and use of optional personal information.
                            </li>
                        </ul>
                    </div>
                    {/*上一步，下一步*/}
                    <p className="applyButton">
                        <Button className="layui-btn layui-btn-primary" onClick={this.handleBack}>上一步</Button>
                        <Button className="layui-btn layui-btn-normal" type="primary"
                                onClick={this.handleSubmit}>提交</Button>
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(state => ({...state}), actions)(Form.create()(Activities5))

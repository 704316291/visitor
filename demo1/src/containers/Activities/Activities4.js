import React from 'react';
import { Button, message,Table} from 'antd';
import actions from "../../store/actions";
import {connect} from "react-redux";
import {Sumbit} from "../../api/api.js"
/*const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;*/


class Activities4 extends React.Component {
    state = {
        disabled: true,
        SumBit: {},
        dataSource:[]
    };

    /*上一步按钮*/
    handleBack = (e) => {
        e.preventDefault();
        this.props.history.push("/Activities3")
    };
    /*下一步按钮*/
    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.props);
        let obj = {
            ID: "string",
            Requestor: "",
            RequestDate: "2018-10-23T05:59:11.873Z",
            VisitDate: "2018-10-23T05:59:11.873Z",
            VisitTime: this.props.Activities.value["Visiting time"],
            VisitUnit: this.props.Activities.value["VisitTheUnit"],
            Industry: this.props.Activities.value["Subordinate to the industry"],
            VisitPurpose: this.props.Activities.value["Visiting purpose"],
            Language: this.props.Activities.value["Visiting language"],
            Note: this.props.Activities.value["Note"],
            UnderTwelve: this.props.Activities2.value["Under 12 years"],
            ThirteenToEighteen: this.props.Activities2.value["13 to 18 years"],
            CollegeStudents: this.props.Activities2.value["CollegeStudents"],
            Adults: this.props.Activities2.value["Adults"],
            Name: this.props.Activities3.value.values["name"],
            MobilePhone: this.props.Activities3.value.values["Mobilephone"],
            EMail: this.props.Activities3.value.values["email"],
            Nationality: this.props.Activities3.value.values["Nationality"],
            Occupation: this.props.Activities3.value.values["Occupation"],
            TitlePosition: this.props.Activities3.value.values["Adults"],
            Status: this.props.Activities3.value.values["Adults"],
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
        console.log(this.state.SumBit);
        /*第二个页面总数*/
        const totality = this.props.Activities2.e;
        console.log(totality);
        /*第一个页面*/
        let values1 = this.props.Activities.value;
        /*第二个页面*/
        let values2 = this.props.Activities2.value;
        /*第三个页面*/
        let values3 = this.props.Activities3.value.values;

        let ary1 = Object.keys(values1);
        let ary2 = Object.keys(values2);
        let ary3 = Object.keys(values3);
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
                    <ul className="applyResults">
                        {ary3.map((item, index) => {
                            if(Number(index)<=4){
                                return <li key={index}>
                                    <p style={{width: "1000px", margin: "10px auto"}}>
                                        <span className="textLeft"> {item} ：</span>
                                        <span className="textRight">{values3[item]}</span>
                                    </p>
                                </li>
                            }
                        })}
                    </ul>
                    {/*第二部分*/}
                    <h4 className="applyTitle"> Visiting Group Information </h4>
                    <ul className="applyResults">
                        {ary1.map((item, index) => {
                            return <li key={index}>
                                <p style={{width: "1000px", margin: "10px auto"}}>
                                    <span className="textLeft">{item} :  </span>
                                    <span className="textRight">{values1[item]}</span>
                                </p>
                            </li>

                        })}
                    </ul>
                    <ul className="applyResults">
                        <li>
                            <p style={{width: "1000px", margin: "10px auto"}}>
                                <span className="textLeft">Number of Visitors：</span>
                                <span className="textRight">{parseFloat(totality)}People</span>
                                {ary2.map((item, index) => {
                                    return <span className="Classify" style={{color: "red"}} key={index}>
                                {item} : {values2[item]} People/</span>

                                })}
                            </p>
                        </li>
                    </ul>

                    <h4 className="applyTitle">Visitor‘s Information</h4>
                    {/*第三部分*/}
                    {/*<table className=" layui-table applyTable">*/}
                        {/*<thead>*/}
                        {/*<tr style={{backgroundColor: "#f2f2f2"}}>*/}
                            {/*<th>Nationality</th>*/}
                            {/*<th>Name of Organization</th>*/}
                            {/*<th>Title / Position</th>*/}
                            {/*<th>No. of Visitors</th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}
                        {/*<tbody>*/}
                        {/*<tr>*/}
                            {/*<td>China</td>*/}
                            {/*<td>Lenovo</td>*/}
                            {/*<td>test</td>*/}
                            {/*<td>15</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                            {/*<td>China</td>*/}
                            {/*<td>Lenovo</td>*/}
                            {/*<td>test</td>*/}
                            {/*<td>15</td>*/}
                        {/*</tr>*/}
                        {/*</tbody>*/}
                    {/*</table>*/}
                    <Table
                        bordered
                        dataSource={this.props.Activities3.value.dataSource}
                        columns={columns}
                        style={{width:1000}}
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

export default connect(state => ({...state}), actions)(Activities4)

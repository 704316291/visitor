import React from 'react';
import './Activities.css';
import actions from "../../store/actions";
import {connect} from "react-redux";
import {Sumbit} from "../../api/api.js"
import {Form} from "antd/lib/index";
import {Button, message, Table} from 'antd';
import {FormattedMessage} from 'react-intl';

const FormItem = Form.Item;

class Activities5 extends React.Component {
    state = {
        dataSource: [],
        DataResult: [],
        Industry: [],
        data: []
    };
    /*上一步按钮*/
    handleBack = (e) => {
        e.preventDefault();
        let info={
            cleanVis:false,
        }
        this.props.Clean(info);
        this.props.history.push("/Activities3")
    };
    /*下一步按钮*/

    handleSubmit = (e) => {
        // this.props.Activities3.value.dataSource.forEach((item,index)=>{
        //             delete item.key
        // })
        e.preventDefault();
        const obj = {
            "Requestor":"",//申请人
            "RequestDate": this.props.Activities1.value.VisitDate,
            "VisitDate": this.props.Activities1.value.VisitDate,
            "VisitTime": this.props.Activities1.value.VisitTime,
            "VisitUnit": this.props.Activities1.value.VisitUnit,
            "Industry": this.props.Activities1.value.Industry,
           "Language" : this.props.Activities1.value.language,
           "VisitPurpose" : this.props.Activities1.value.VisitPurposeObj.Value,
            "Note": this.props.Activities1.value.note,
            "UnderTwelve": Number(this.props.Activities2.value.UnderTwelve),
            "ThirteenToEighteen": Number(this.props.Activities2.value.ThirteenToEighteen),
            "CollegeStudents":Number( this.props.Activities2.value.CollegeStudents),
            "Adults": Number(this.props.Activities2.value.Adults),
            "Name": this.props.Activities3.value.Name,
            "MobilePhone": this.props.Activities3.value.MobilePhone,
            "EMail": this.props.Activities3.value.EMail,
            "Nationality": this.props.Activities3.value.Nationality,
            "Occupation": this.props.Activities3.value.OccupationObj.Value,
            "GroupApplyOrderItemCollection": this.props.Activities3.value.dataSource
        };
        Sumbit(obj).then((response) => {
            let data=JSON.parse( response.DataResult);
            {this.props.local === "en" ? message.warning(data.msgEN,2) : message.warning(data.msgCN,2)}
        }).then(()=>{
            setTimeout(()=>{
                window.scrollTo(300, 0);
                this.props.history.push("/Home");
            },2000)

        })
    }


    render() {
      let VisitTime11= this.props.Activities1.value.VisitTime;
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
        const columns1 = [
            {
                title: '国籍',
                dataIndex: 'Nationality',
                width: '13%',
            }, {
                title: '来宾单位',
                dataIndex: 'OrganizationName',
                width: '13%',
            }, {
                title: '职位',
                dataIndex: 'TitlePosition',
                width: '13%',
            }, {
                title: '*人数',
                dataIndex: 'VisitorsNum',
                width: '13%',
            },
        ];
        const columns = [
            {
                title: 'Nationality',
                dataIndex: 'Nationality',
                width: '13%',
            }, {
                title: 'Name of Organization',
                dataIndex: 'OrganizationName',
                width: '13%',
            }, {
                title: 'Title / Position',
                dataIndex: 'TitlePosition',
                width: '13%',
            }, {
                title: '*No. of Visitors',
                dataIndex: 'VisitorsNum',
                width: '13%',
            },
        ];
        /*步骤条*/
        return (<div className="insideDiv">
                <div className="center">
                    <ul className="timeLine">
                        <li className="active">
                            <i>1</i>
                            <p> <FormattedMessage
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
                        <li className="active">
                            <i>4</i>
                            <p><FormattedMessage
                                id="intl-Activities-Confirmation"
                            /></p>
                        </li>
                    </ul>
                    <dl className="applyDl">
                        <dt><FormattedMessage
                            id="intl-Activities5-Information"
                        /></dt>
                    </dl>
                    {/*第一部分*/}
                    <h4 className="applyTitle"><FormattedMessage
                        id="intl-Activities5-Contact"
                    /></h4>
                    <Form>
                        {/*名字*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities3-name"
                            />}
                        >
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
                            {this.props.local ==="en"?this.props.Activities3.value.OccupationObj.ValueNameEN:this.props.Activities3.value.OccupationObj.ValueNameCN}
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
                            {this.props.Activities1.value.VisitDate}
                        </FormItem>
                        {/*时间*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-VisitingTime"
                            />}
                        >
                            {VisitTime11===undefined?null:(VisitTime11.split("-")[0]<10?"0"+VisitTime11.split("-")[0]:VisitTime11.split("-")[0])+":00"+"-"+(VisitTime11.split("-")[1]<10?"0"+VisitTime11.split("-")[1]:VisitTime11.split("-")[1])+":00"}
                        </FormItem>
                        {/*来访语言*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-language"
                            />}
                        >
                            {this.props.Activities1.value.language}
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
                        {/*单位*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-VisitTheUnit"
                            />}
                        >
                            {this.props.Activities1.value.VisitUnit}
                        </FormItem>
                        {/*来访行业*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-Subordinate"
                            />}
                        >
                            {this.props.Activities1.value.Industry}
                        </FormItem>
                        {/*来访目的*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-VisitingPurpose"
                            />}
                        > {this.props.local ==="en"?this.props.Activities1.value.VisitPurposeObj.ValueNameEN:this.props.Activities1.value.VisitPurposeObj.ValueNameCN}
                        </FormItem>
                        {/*注意事项*/}
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage
                                id="intl-Activities-Note"
                            />}>
                            {this.props.Activities1.value.note}
                        </FormItem>
                    </Form>
                    <h4 className="applyTitle">Visitor's Information</h4>
                    <Table
                        bordered
                        dataSource={this.props.Activities3.value.dataSource}
                        columns=  {this.props.local === "en" ? columns : columns1}
                        style={{width: 1000}}
                    />
                    {/*红色字体*/}
                    <div className="applyForm-radio" style={{marginBottom: "40px"}}>
                        <ul className="applyVisitor-ul">
                            <li>
                                * I agree to the Terms and Conditions of the Lenovo service.
                            </li>
                            <li>
                                *I agree to the collection and use of personal information.
                            </li>
                            <li>
                                *I agree to the collection and use of required personal information
                            </li>
                            <li>
                                *I agree to the collection and use of optional personal information
                            </li>
                        </ul>
                    </div>
                    {/*上一步，下一步*/}
                    <p className="applyButton">
                        <Button className="layui-btn layui-btn-primary" onClick={this.handleBack}>
                            <FormattedMessage
                                id="intl-Activities-Previous"
                            />
                        </Button>
                        <Button className="layui-btn layui-btn-normal" type="primary"
                                onClick={this.handleSubmit}>
                            <FormattedMessage
                                id="intl-Activities-Submit"
                            />
                        </Button>
                    </p>
                </div>
            </div>
        )
    }
}



export default connect(state => ({...state, ...state.Language,...state.Home}), {...actions, ...actions.Language,...actions.Home})(Form.create()(Activities5))




import React from 'react';
import './Home.css';
import 'antd/dist/antd.css';
import './NearTermActivities';
import './NearTermActivities';
import {Carousel, Icon} from 'antd';
import {FormattedMessage} from 'react-intl';
import {connect} from "react-redux"
import actions from "../../store/actions"
import {CalendarBusy, GetHomeBanner, GetExternalWebpage,} from "../../api/api";


class Home extends React.Component {
    state = {
        darBusy: [],
        GetHomeBanner: [],
        GetExternalWebpage: [],
        year: "",
        month: "",
        day: "",
        aryDate: [],
        chinese: true,
        NewList: [],
        timeInterval: {startDate: "2018-10-20", endDate: "2018-12-20"},//模拟区间时间
        fullTime: []//模拟申请已满的数据
    };


    //获取当天的日期  日历
    //year  年  month 月
    getTime(year, month) {
        // let  year=new Date().getFullYear(),
        //  month=month+1;
        //根据当前的年  月  算出日历
        let ary = this.getCalendar(year, month);
        ary = this.getWeek(year, month, ary);
        return ary
    }

//year 年份  month月份
    //算出特定年份  月份的日历排列
    getCalendar(year, month) {
        let ary = [];
        let BigMonth = [1, 3, 5, 7, 8, 10, 12];
        //先判断是否为闰年
        //闰年 2月
        if (year % 4 === 0) {
            if (month === 2) {
                for (let i = 1; i < 30; i++) {
                    ary.push({year, month, day: i})
                }
                return ary
            }
        } else {
            //平年2月
            if (month === 2) {
                for (let i = 1; i < 29; i++) {
                    ary.push({year, month, day: i})
                }
                return ary
            }
        }

        //判断大月小月
        if (BigMonth.includes(month)) {
            //大月
            for (let i = 1; i < 32; i++) {
                ary.push({year, month, day: i})
            }
        } else {
            //小月
            for (let i = 1; i < 31; i++) {
                ary.push({year, month, day: i})
            }

            // return  this.getWeek(year,month,ary);
        }
        // console.log(ary.toString());
        return ary
    }

    //根据1号 确定是周几
    getWeek(year, month, ary) {
        let week = new Date(`${year}-${month}-1`).getDay();//获取当月1号 是周几
        let lastDay = this.getLastDay(year, month);//获取上个月的最后一天
        if (week === 0) {
            for (let i = 0; i < 7; i++) {
                ary.unshift(lastDay);
                lastDay = {...lastDay, day: lastDay.day - 1}
            }


            if (ary.length > 35) {
                ary.length = 35
            } else {
                let length = 35 - ary.length;
                for (let i = 1; i < length + 1; i++) {
                    month = month + 1
                    if (month === 13) {
                        year = year + 1
                        month = 1
                    }
                    ary.push({year, month, day: i})
                }
            }
            return ary
        }
        for (let i = 0; i < week; i++) {
            ary.unshift(lastDay);
            lastDay = {...lastDay, day: lastDay.day - 1}
        }
        //补齐后面的日期
        if (ary.length > 35) {
            ary.length = 35
        } else {
            let length = 35 - ary.length;
            for (let i = 1; i < length + 1; i++) {
                month = month + 1
                if (month === 13) {
                    year = year + 1
                    month = 1
                }
                ary.push({year, month, day: i})
            }
        }

        return ary
    }


    //上一个月的最后一天
    //year 年份  month月份
    getLastDay(year, month) {
        month = month - 1;
        let day = null;
        //如果是一月的话
        if (month === 0) {
            year = year - 1;
            month = 12;
        }
        //根据 年份  月份 拿到这个月的最后一天
        if (year % 4 === 0) {
            if (month === 2) {
                day = 29;
                return {year, month, day}
            }
        } else {
            if (month === 2) {
                day = 28;
                return {year, month, day}
            }
        }
        //不是特定的2月时
        let BigMonth = [1, 3, 5, 7, 8, 10, 12];
        if (BigMonth.includes(month)) {
            //大月
            day = 31;
            return {year, month, day}
        } else {
            day = 30;
            return {year, month, day}
        }
    }

    /*减少月份*/
    nextMonth = () => {
        let year = this.state.year,
            month = this.state.month;
        month = month + 1;
        if (month === 13) {
            year = year + 1;
            month = 1
        }
        this.setState({
            year,
            month
        })
    }
    /*增加月份*/
    prevMonth = () => {
        let year = this.state.year,
            month = this.state.month;
        month = month - 1;
        if (month === 0) {
            year = year - 1;
            month = 12
        }
        console.log(year, month);
        this.setState({
            year,
            month
        })
    }

    /*点击当前时间，进行跳转到团队申请页面*/
    getDay = () => {
        window.scrollTo(300, 150);
        this.props.history.push("/Activities");

    };


    //判断是否需要加类名
    isClassName = (year, month, day) => {
        let name = null;
        name = this.isVaildTime(year, month, day);//判断是否在此区间
        //  name=this.isWeeked(year, month, day)//判断是否为周末
        return name
    }

    //判断是否是周末
    isWeeked = (year, month, day) => {
        let week = new Date(`${year}/${month}/${day}`).getDay();
        if (week === 0 || week === 6) {
            return "darkgUnSelected"
        }
        return this.isBeforeToday(year, month, day)
    }

    //判断是否在区间范围内
    isVaildTime = (year, month, day) => {
        let time = new Date(`${year}/${month}/${day}`)
        let start = new Date(this.state.timeInterval.startDate)
        let end = new Date(this.state.timeInterval.endDate)
        if (time - start > 0 && time - end < 0) {
            return this.isWeeked(year, month, day)
        }
        return "darkgUnSelected"
    }


    //当天之前全部不可选
    isBeforeToday = (year, month, day) => {
        let curTime = new Date(`${year}/${month}/${day}`);
        if (curTime - new Date() > 0) {
            return this.isUnSelected(year, month, day)
        }
        return "darkgUnSelected"
    }

    //当天的后三天不能点击  排出 六  日
    isUnSelected = (year, month, day) => {
        let today = new Date().toLocaleDateString();// 当天的日期
        let start = new Date(today).valueOf();//当天的时间戳
        let oneDay = 86400000;//一天的时间戳
        let week = new Date(start).getDay();//当天的周几
        let end = null;
        if (week === 0 || week === 1 || week === 2) {
            //加2天
            end = start + 2 * oneDay
        } else if (week === 6) {
            //加3天
            end = start + 3 * oneDay
        } else {
            //加4天
            end = start + 4 * oneDay
        }

        //获取传进来时间的时间戳
        let curDay = new Date(`${year}/${month}/${day}`).valueOf();
        if (curDay - start >= 0 && curDay - end <= 0) {
            return "darkgUnSelected"
        }
        return this.isSelectFull(year, month, day)

    }

    //根据得到的后台数据 来确定哪些是申请已满

    isSelectFull = (year, month, day) => {
        let curTime = `${year}-${month}-${day}`;

        if (this.state.fullTime.includes(curTime)) {
            return "darkgFull"
        }
        return "darkgSelected"
    }
    /*点击图片，进入详情页*/
    handleBack = (ID) => {
        this.props.history.push("/NearTerm", {
            ID,
        });
    };


    componentWillMount() {
        // 初始化时  获取当天的日期
        let year = new Date().getFullYear(),
            month = new Date().getMonth() + 1,
            day = new Date().getDate(),
            ary = this.getTime(year, month);
        console.log(day);
        this.setState({
            year,
            month,
            day,
            aryDate: ary

        });
        /*轮播图*/
        GetHomeBanner().then((response) => {
            let data = response.DataResult;
            this.setState({
                GetHomeBanner: data
            });
        }).catch((error) => {
            console.log(error);
        });
        /*新闻图*/
        GetExternalWebpage().then((response) => {
            let data = response.DataResult;
            this.setState({
                GetExternalWebpage: data
            })
        }).catch((error) => {
            console.log(error);
        });

        //默认获取区间时间,申请已满//
        CalendarBusy(`${year}-${month}-${day}`).then((response) => {
            let data = response.DataResult;
            this.setState({
                timeInterval: {startDate: `${year}-${month}-${day}`, endDate: data.ApplyMaxDate},
                fullTime: data.NotApplyDateList
            })
        }).catch((error) => {
            console.log(error);
        });


    }

    handleBack1 = (ID) => {
        this.props.history.push("/NearTerm", {ID,});
    };

    handleBack = (e) => {
        e.preventDefault();
        this.props.history.push("/NearTermActivities");

    };


    render() {
        const aryDate = this.getTime(this.state.year, this.state.month);
        const styleDay = this.state.day;
        return (<div>
            {/*轮播图片*/}
            <div>
                <Carousel autoplay>
                    {
                        this.state.GetHomeBanner.map((item) => {
                            return <div key={item.ID}><img src={'http://10.122.27.51' + item.ImagePath} alt=""/></div>
                        })}
                </Carousel>
            </div>
            <div className="indexDiv">
                <div className="center">
                    {/*左图*/}
                    <div className="indexUs">
                        <h4>
                            <FormattedMessage
                                id="intl-Home-AboutUs"
                            /></h4>
                        <p>
                            <FormattedMessage
                                id="intl-Home-Character"
                            /></p>
                        <a className="btn btn-hollow">
                            <FormattedMessage
                                id="intl-Home-JOINLENOVO"
                            /></a>
                    </div>
                    {/*日历*/}
                    <div className="indexDade">
                        <div className="zAccountInner zAccount2 clearfix">
                            <div className="zAccountPlanL span5 no-margin-left">
                                <div className="WdateDiv" style={{width: "548px"}}>
                                    <div className="dpTitle">
                                        <div className="datetimeP">
                                            <Icon type="left"
                                                  onClick={this.prevMonth}
                                                  style={{
                                                      fontSize: "18px",
                                                      color: "#000",
                                                      paddingRight: "90px"
                                                  }}/>
                                            <p className="Today">{this.state.day}</p>
                                            <div className="next-month-btn-day">
                                                <p className="Month">
                                                    <span>{this.state.month}月{this.state.year}年</span>

                                                </p>
                                                <p className="ChinaBeijing">China - Beijing</p>
                                            </div>

                                            <Icon type="right"
                                                  onClick={this.nextMonth}
                                                  style={{
                                                      fontSize: "18px",
                                                      color: "#000",
                                                      paddingLeft: "90px"
                                                  }}/>
                                        </div>



                                    </div>
                                    <ul className="dBTitle">
                                        <li>
                                            <FormattedMessage
                                                id="intl-Home-Sun"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                id="intl-Home-Mon"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                id="intl-Home-Tue"
                                            /></li>
                                        <li>
                                            <FormattedMessage
                                                id="intl-Home-Wed"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                id="intl-Home-Thu"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                id="intl-Home-Fir"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                id="intl-Home-Sat"
                                            /></li>
                                    </ul>
                                    <div className="dpBody">
                                        <ul>
                                            {aryDate.map((item, index) => {
                                                return (
                                                    <li key={index}
                                                        className={this.isClassName(item.year, item.month, item.day)}
                                                        onClick={this.isClassName(item.year, item.month, item.day) === "darkgSelected" ? () => {
                                                            this.getDay(item)
                                                        } : null}>
                                                        <span style={{width:"20px",height:"20px", borderRadius:"50%"}}>{item.day}</span>
                                                    </li>)
                                            })}
                                        </ul>


                                        <div className="dpRound">
                                            <div className="Overdue">
                                                <span className="yellowBox"> </span>
                                                <FormattedMessage
                                                    id="intl-Home-Mayapply"
                                                />
                                            </div>
                                            <div className="Expire">
                                                <span className="blueBox"> </span>
                                                <FormattedMessage
                                                    id="intl-Home-Application"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*图片*/}
            <div className="indexPhoto">
                <dl>
                    {this.state.GetExternalWebpage.map((item, index,) => {
                        if (index === 0) {
                            return <dt key={item.ID}>
                                <a onClick={() => {
                                    this.handleBack1(item.ID)
                                }}>
                                    <img src={item.ImagePath}/>
                                    <span className="indexPhoto-title">{
                                        this.props.local === "en" ? item.TitleEN : item.TitleCN}</span>
                                </a>
                            </dt>
                        }else {
                            return <dd key={item.ID}>
                                <a onClick={() => {
                                    this.handleBack1(item.ID)
                                }}>
                                    <img src={'http://10.122.27.51' +item.ImagePath}/>
                                    <span
                                        className="indexPhoto-title">{this.props.local === "en" ? item.TitleEN : item.TitleCN}</span>
                                </a>

                            </dd>
                        }

                    })}
                </dl>
            </div>

            {/*ACITIVITES*/}
            <div className="indexDiv">
                <div className="center">
                    <div className="titleH4">
                        <h4>
                            <FormattedMessage
                                id="intl-Home-ACITIVITES"
                            /></h4>
                        <p>
                            <FormattedMessage
                                id="intl-Home-Ipsum"
                            /></p>
                    </div>
                    <ul className="indexAcitivites">
                        <li>
                            <h4><FormattedMessage
                                id="intl-Home-development"
                            /></h4>
                            <p>
                                <span>2018.4.16</span>
                                <span>上限：50 people</span>
                            </p>
                            <p>
                                <FormattedMessage
                                    id="intl-Home-Alienum"
                                /></p>
                        </li>
                        <li>
                            <h4>
                                <FormattedMessage
                                    id="intl-Home-CREATING"
                                />
                            </h4>
                            <p>
                                <span>2018.4.16</span>
                                <span>上限：50 people</span>
                            </p>
                            <p>
                                <FormattedMessage
                                    id="intl-Home-Alienum"
                                /></p>
                        </li>
                        <li>
                            <h4>
                                <FormattedMessage
                                    id="intl-Home-REVOLUTION"
                                />

                            </h4>
                            <p>
                                <span>2018.4.16</span>
                                <span>上限：50 people</span>
                            </p>
                            <p>
                                <FormattedMessage
                                    id="intl-Home-Alienum"
                                />
                            </p>
                        </li>
                    </ul>
                    <p className="indexAcitivites-more">
                        <a className="btn btn-hollow-gray" onClick={this.handleBack}>
                            <FormattedMessage
                                id="intl-Home-MORE"
                            /></a>
                    </p>
                </div>
            </div>
        </div>)
    }
}

export default connect(state => ({...state.Language}), actions.Language)(Home)

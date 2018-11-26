import React, {Component} from "react"
import Nav from "./Nav"
import Menu from "./Menu"
import "../static/css/index.css"
import InnovationCenter from "../containers/InnovationCenter/InnovationCenter";
import Register from "../containers/Register/Register";
import Home from "../containers/Home/Home";
import AboutUs from "../containers/AboutUs/AboutUs";
import Activities from "../containers/Activities/Activities";
import Activities1 from "../containers/Activities/Activities1";
import Activities2 from "../containers/Activities/Activities2";
import Activities3 from "../containers/Activities/Activities3";
import Activities5 from "../containers/Activities/Activities5";
import NearTermActivities from "../containers/Home/NearTermActivities";
import NearTerm from "../containers/News/NearTerm";
import Login from "../containers/Login/Login";
import News from "../containers/News/News";
import {Switch, Route, Redirect} from "react-router-dom"


import {IntlProvider, addLocaleData} from 'react-intl';
import zhCN from '../langConfig/zh-CN.js';  //导入 i18n 配置文件,需要手动创建并填入语言转换信息
import enUS from '../langConfig/en-US.js';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import {connect} from "react-redux"
import actions from "../store/actions"

import {withRouter} from 'react-router-dom' ;

addLocaleData([...en, ...zh]);



 class App extends Component {
     chooseLocale=()=> {
         switch(this.props.local) {
             case 'en':
                 return enUS;
             case 'zh':
                 return zhCN;
             default:
                 return enUS;
     }
     };

    render() {
        return <IntlProvider locale={this.props.local} messages={this.chooseLocale()}>
            <div>
                <div className="Header">
                    <Nav/>
                </div>
                <div className="Content">
                    <Switch>
                        <Route path='/Home' exact component={Home}/>
                        <Route path='/InnovationCenter' exact component={InnovationCenter}/>
                        <Route path='/Activities' component={Activities} />
                        <Route path='/Activities1' component={Activities1}/>
                        <Route path='/Activities2' component={Activities2}/>
                        <Route path='/Activities3' component={Activities3}/>
                        <Route path='/Activities5' component={Activities5}/>
                        <Route path='/NearTermActivities' component={NearTermActivities}/>
                        <Route path='/NearTerm' component={NearTerm}/>
                        <Route path='/News' exact component={News}/>
                        <Route path='/AboutUs' exact component={AboutUs}/>
                        <Route path='/Login' exact component={Login}/>
                        <Route path='/Register' exact component={Register}/>
                        <Redirect to='/Home'/>

                    </Switch>
                </div>
                <div className="Footer">
                    <Menu/>
                </div>
            </div>
        </IntlProvider>
    }
}

export default withRouter(connect(state => ({...state.Language}), actions.Language)(App))

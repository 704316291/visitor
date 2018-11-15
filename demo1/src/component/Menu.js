import React from "react";
import "./Menu.css"
import {FormattedMessage} from 'react-intl';
import actions from "../store/actions"
import {connect} from "react-redux";
 class Menu extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <div className="footer">
            <ul className="center">
                <li><i className="img-1"> </i></li>
                <li><i className="iconfont  icon-youjian"/>
                    <FormattedMessage
                        id="intl-Menu-Email"
                    />
                  ：hanwk1@lenovo.com</li>
                <li><i className="iconfont  icon-dianhua"/>
                    <FormattedMessage
                        id="intl-Menu-Phone"
                    />
                    ：010-62983755</li>
                <li><i className="iconfont  icon-biao"/>
                    <FormattedMessage
                        id="intl-Menu-Hours"
                    />
                    ：8:30 am - 6 pm</li>
            </ul>
        </div>
    }
}
export default connect(state => ({...state.Language}), actions.Language)(Menu)


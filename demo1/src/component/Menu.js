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
            <div className="footerBox">
              <i className="img-1"></i>
                <ul className="center">
                    <li><i className="iconfont  icon-youjian"/>
                        <FormattedMessage
                            id="intl-Menu-Email"
                        />
                        ：cbc@lenovo.com</li>
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

        </div>
    }
}
export default connect(state => ({...state.Language}), actions.Language)(Menu)


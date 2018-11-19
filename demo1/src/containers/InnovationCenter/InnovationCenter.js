import React from 'react';
import './InnovationCenter.css';
import {Carousel} from 'antd';
import {GetExhibitionBanner} from "../../api/api";
import {FormattedMessage} from 'react-intl';
import {connect} from "react-redux"
import actions from "../../store/actions"



let img2 = require("../../static/images/photo-01.png");

 class InnovationCenter extends React.Component {
    state = {
        GetExhibitionBanner: [],
    }

    componentWillMount() {
        /*展厅接口*/
        GetExhibitionBanner().then((response) => {
            let data = response.DataResult;
            this.setState({
                GetExhibitionBanner: data
            });
        });
    }

    render() {
        return (<div>
            {/*轮播图片*/}
            <div>
                <Carousel autoplay>
                    {this.state.GetExhibitionBanner.map((item) => {
                        return <div key={item.ID}><img src={'http://10.122.27.51' +item.ImagePath} alt=""/></div>
                    })}
                </Carousel>
            </div>
            <div className="indexDiv">
                <div className="center">
                    <div className="titleH4">
                        <h4>
                            <FormattedMessage
                                id="intl-InnovationCenter-InnovationCenter"
                            /></h4>
                        <p>
                            <FormattedMessage
                                id="intl-InnovationCenter-Ipsum"
                            /></p>
                    </div>
                </div>
                {/*下面的图片*/}
                <div className="hall-photo">
                    <div className="layui-carousel" id="test1">
                        <div className="hall-photo">
                            <div className="hall-first">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                            <div className="hall-second">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能联想</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能出行</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu, vis detraxit
                                            periculis ex, nihil expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="hall-photo">
                            <div className="hall-first">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                            <div className="hall-second">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能联想</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能出行</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu, vis detraxit
                                            periculis ex, nihil expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="hall-photo">
                            <div className="hall-first">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                            <div className="hall-second">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能联想</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能出行</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu, vis detraxit
                                            periculis ex, nihil expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="hall-photo">
                            <div className="hall-first">
                                <dl className="hall-dl">
                                    <dt><img src="../../static/images/photo-01.png"/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                            <div className="hall-second">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能联想</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能出行</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu, vis detraxit
                                            periculis ex, nihil expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="hall-photo">
                            <div className="hall-first">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                            <div className="hall-second">
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能联想</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能出行</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. Alienum phaedrum torquatos nec eu, vis detraxit
                                            periculis ex, nihil expetendis in mei. </p>
                                    </dd>
                                </dl>
                                <dl className="hall-dl">
                                    <dt><img src={img2}/></dt>
                                    <dd>
                                        <h4>智能家居</h4>
                                        <p>Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                                            expetendis in mei. </p>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
};
export default connect(state => ({...state.Language}), actions.Language)(InnovationCenter)
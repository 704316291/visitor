import React from 'react';
import './News.css';
import {Pagination} from 'antd';
import "./NearTerm";
import './NearTerm.css';
import {GetNewList} from "../../api/api";

export default class News extends React.Component {
    state = {
        NewList: [],
        current: null,
        NumberOfPages: {},

    };


    handleBack = (ID) => {
        this.props.history.push("/NearTerm", {ID,});
    };

    onChange = (page) => {
        const params = {
            "PublishType": 0,
            "Status": 1,
            "PageIndex": page,
            "PageSize": 10,
        };

        GetNewList(params).then((response) => {
            this.setState({
                NumberOfPages:  response.DataResult,
                NewList:  response.DataResult.DataList,
                current: page,
            });
        })
        window.scrollTo(300, 350);
    };

    componentWillMount() {
        const params = {
            "PublishType": 0,
            "Status": 1,
            "PageIndex": 1,
            "PageSize": 10,
        };
        GetNewList(params).then((response) => {
            this.setState({
                NumberOfPages:  response.DataResult,
                NewList:  response.DataResult.DataList,
            });
        })

    }


    render() {
      let NumberOfPages = this.state.NumberOfPages;
        let NumberOfPages1 = eval(NumberOfPages);
        return (<div className="insideDiv">
                <div className="center">
                    <div className="titleH4">
                        <h4>NEWS</h4>
                        <p>What is happened？</p>
                    </div>
                    {/*图文介绍*/}
                    <div className="newList-dl">
                        {this.state.NewList.map((item) => {
                            return <dl key={item.ID}>
                                <dt>
                                    <img src={'http://10.122.27.51' +item.ImagePath}/>
                                </dt>
                                <dd>
                                    <h4>{item.TitleCN}</h4>
                                    <p>{item.DescCN} </p>
                                    <a className="btn btn-hollow" onClick={() => {
                                        this.handleBack(item.ID)
                                    }}>查看详情</a>
                                </dd>
                            </dl>
                        })}
                    </div>
                    {/*分页*/}
                    <div className="paging">
                        <Pagination
                            current={NumberOfPages1.CurrentPageIndex}
                            onChange={this.onChange}
                            PageSize={NumberOfPages1.PageSize}
                            total={NumberOfPages1.TotalItemCount}
                        />
                    </div>

                </div>
            </div>
        )
    }
}
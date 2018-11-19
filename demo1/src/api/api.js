import axios from "./index";
/*首页轮播图*/
export const GetHomeBanner = () => axios.get("api/BannerApi/GetHomeBanner");
/*首页新闻图*/
export const GetExternalWebpage = () => axios.get("api/NoticeApi/GetExternalWebpage");
/*展厅轮播图*/
export const GetExhibitionBanner = () => axios.get("api/BannerApi/GetHomeBanner");
/*来访目的*/
export const GetVisitPurpose = () => axios.get("api/BaseValueApi/GetVisitPurpose");
/*来访时间*/
export const GetVisitTime = (params) => axios.get("api/BaseValueApi/GetVisitTime", {
    params: params
});
/*职业*/
export const GetOccupation = () => axios.get("api/BaseValueApi/GetOccupation");
/*获取所属职业*/
export const GetLMSMainIndustry = () => axios.get("api/BaseValueApi/GetLMSMainIndustry");

/*FAQ*/
export const GetFAQList = (params) => {
    return axios.post('api/FAQApi/GetFAQList', {
        criteria: params
    })
}
/*FAQ的数据类型*/
export const GetTypeData = () => axios.get("api/FAQApi/GetTypeData");

/*FAQ的数据类型获取的数据*/
export const GetFAQListByType= (params) => axios.get("api/FAQApi/GetFAQListByType", {
    params: {
        type: params
    }
});


/*News新闻列表*/
export const GetNewList = (params) => {
    return axios.post("api/NoticeApi/GetNewList", params);


}

/*New新闻列表里的详情*/
export const Detail = (params) => {
    return axios.get(`api/NoticeApi/Detail/${params}`)
};
/*日历：参数是YYYY-MM-DD*/
export const CalendarBusy = (params) => axios.get("api/VisitCalendarApi/CalendarBusy", {
    params: {
        startDate: params,
        endDate: params,
    }
});
/*第四步提交*/
export const Sumbit = (params) => axios.post("api/GroupApplyApi/Sumbit", {
    params: params
});





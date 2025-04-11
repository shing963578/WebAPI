"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const js_base64_1 = require("js-base64");
const axios_1 = __importDefault(require("axios"));
const http_common_1 = require("../common/http-common");
const { TextArea } = antd_1.Input;
const NewArticle = () => {
    const handleFormSumbit = (values) => {
        const title = values.title;
        const allText = values.context;
        const authorID = 1;
        console.log(values, title, allText);
        const username = "alice";
        const password = "alice";
        const access_token = js_base64_1.Base64.encode(`${username}:${password}`); //alice:alice => YWxpY2U6YWxpY2U=
        const url = http_common_1.api.uri + 'articles';
        axios_1.default.post(url, {
            "title": title,
            "allText": allText,
            "authorID": 1
        }, {
            headers: {
                'Authorization': `Basic ${access_token}` //Basic YWxpY2U6YWxpY2U=
            }
        })
            .then((res) => {
            if (res.status === 201) {
                console.log("Successfully Created Article!");
            }
            else {
                console.log("Failed Create Article!");
            }
        });
    };
    const contentRules = [{ required: true, message: 'Please input data' }];
    return (<antd_1.Form name="article" onFinish={(values) => handleFormSumbit(values)}>
            <antd_1.Form.Item name="title" label="Title" rules={contentRules}>
                <antd_1.Input />
            </antd_1.Form.Item>
            <antd_1.Form.Item name="context" label="Context" rules={contentRules}>
                <TextArea rows={4}/>
            </antd_1.Form.Item>
            <antd_1.Form.Item name="submitBtn">
                <antd_1.Button type="primary" htmlType="submit">Submit</antd_1.Button>
            </antd_1.Form.Item>
        </antd_1.Form>);
};
exports.default = NewArticle;
